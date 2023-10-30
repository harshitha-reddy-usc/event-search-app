// server/index.js

const express = require("express");
const path = require('path');
var geohash = require('ngeohash');
var SpotifyWebApi = require('spotify-web-api-node');

const PORT = process.env.PORT || 3001;

const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
const API_KEY = "dummy";
var clientId = 'dummy',
    clientSecret = 'dummy';
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});
// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
    function(data) {
      tokenDetails = data.body;
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
)

function setSpotifyToken(){
  spotifyApi.clientCredentialsGrant().then(
      function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
      },
      function(err) {
        console.log('Something went wrong when retrieving an access token', err);
      }
  );
}
setSpotifyToken();
//tokenRefreshInterval = setInterval(setSpotifyToken, 1000 * 60 * 60);

async function getLocationGoogle(address) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=dummy";
  var res = [];
  await axios
      .get(url)
      .then(function (response) {
        location = response.data.results[0].geometry.location;
        var lat = location['lat'];
        res.push(lat);
        var lng = location['lng'];
        res.push(lng);
      });
  return res;
}

app.get("/keywordAutocomplete", (req, res) => {
  var url = "https://app.ticketmaster.com/discovery/v2/suggest?apikey=" + API_KEY + "&keyword=" + req.query.keyword;
  var suggestions = [];
  axios
      .get(url)
      .then(function(response) {
        response.data['_embedded']['attractions'].forEach((e) => {
          suggestions.push(e.name);
        });
        res.send({payload: suggestions});
      })
      .catch(function (error) {
          res.send({ payload: [] });
      });
});


app.get("/searchEvents", async (req, res) => {
  var segmentMap = {Default: "", Music: "KZFzniwnSyZfZ7v7nJ", Sports: "KZFzniwnSyZfZ7v7nE", Arts: "KZFzniwnSyZfZ7v7na",
                    Film: "KZFzniwnSyZfZ7v7nn", Miscellaneous: "KZFzniwnSyZfZ7v7n1"};
  var keyword = req.query.keyword;
  var distance = req.query.distance;
  var category = req.query.category;
  var autoDetect = req.query.autoDetect;
  if (autoDetect === "false") {
    var location = req.query.location;
    var [lat, lng] = await getLocationGoogle(location);
  } else {
    var latlng = req.query.latlng;
    var [lat, lng] = latlng.split(",");
  }
  var geoEncoding = geohash.encode(lat, lng, 6);
  var segmentId = segmentMap[category];
  var params = {
    apikey: API_KEY,
    keyword: keyword,
    radius: distance,
    unit: 'miles',
    segmentId: segmentId,
    geoPoint: geoEncoding
  };
  var eventsUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + API_KEY +"&keyword="+
      keyword+"&segmentId="+segmentId+"&radius="+distance+"&unit=miles&geoPoint="+geoEncoding;
  var event_details = [];
  axios
      .get(eventsUrl)
      .then(function (response) {
        var responseJson = response.data;
        if (responseJson['page']['totalElements'] > 0) {
          responseJson['_embedded']['events'].forEach((e) => {
            var event_dates = e['dates']['start'];
            var event_date = 'localDate' in event_dates ? event_dates['localDate'] : "";
            var event_time = 'localTime' in event_dates ? event_dates['localTime'] : "";
            event_details.push({
              event_id: e['id'],
              event_name: e['name'],
              event_date: event_date,
              event_time: event_time,
              event_icon: e['images'][0]['url'],
              event_segment: e['classifications'][0]['segment']['name'],
              event_venue: e['_embedded']['venues'][0]['name'],
              event_lat: lat,
              event_lng: lng
            })
          });
        }
        res.send({ payload: event_details });
      })
      .catch(function (error) {
        res.send({ error: error.message });
      });
});

app.get("/getEventInfo", async (req, res) => {
  var eventID = req.query.eventID;
  var eventUrl = "https://app.ticketmaster.com/discovery/v2/events/" + eventID + ".json?apikey=" + API_KEY;
  axios
      .get(eventUrl)
      .then(function (response) {
        var event_info_res = response.data;
        var event_info = {};
        event_info.name = event_info_res.name;
        var event_date_res = event_info_res['dates']['start'];
        var event_date = 'localDate' in event_date_res ? event_date_res['localDate'] : "";
        var event_time = 'localTime' in event_date_res ? event_date_res['localTime'] : "";
        event_info.date = event_date +event_time;
        var details = event_info_res['_embedded'];
        event_info.artists = []
        if ('attractions' in details) {
          event_info.team = [];
          details['attractions'].forEach((a) => {
            event_info.team.push(
                {'name': a['name'], 'url': 'url' in a ? a['url'] : ''}
            )
            if ('segment' in a['classifications'][0]){
              var segmentName = a['classifications'][0]['segment']['name'];
              if (segmentName === "Music"){
                event_info.artists.push(a["name"]);
              }
            }
          });
        }
        event_info.venue = details['venues'][0]['name'];
        event_info.genre = [];
        if ('classifications' in event_info_res){
          var types = ['genre', 'subGenre', 'segment', 'type', 'subType'];
          var clas = event_info_res['classifications'][0];
          types.forEach((t) => {
            if (t in clas && clas[t]['name'] !== "Other" &&  clas[t]['name'] !== "Undefined") {
              event_info.genre.push(clas[t]['name']);
            }
          });
        }
        event_info.status = event_info_res['dates']['status']['code'];
        event_info.buy = event_info_res['url'];
        event_info.seatmap  = '';
        if ('seatmap' in event_info_res){
          event_info.seatmap = event_info_res['seatmap']['staticUrl'];
        }
        if ('priceRanges' in event_info_res){
          event_info.price = {range: [], currency: ''};
          var p = event_info_res['priceRanges'][0];
          if ('min' in p) {
            event_info.price.range.push(p['min']);
          }
          if ('max' in p) {
            event_info.price.range.push(p['max']);
          }
          if ('currency' in p) {
            event_info.price.currency = p['currency'];
          }
        }
        res.send({ payload: event_info });
      })
      .catch(function (error) {
        res.send({ error: error.message });
      });
});

app.get("/getVenueInfo", async (req, res) => {
  var venue = req.query.venue;
  var venueUrl = "https://app.ticketmaster.com/discovery/v2/venues?apikey=" + API_KEY + "&keyword=" + venue;
  axios
      .get(venueUrl)
      .then(function (response) {
        var venue_info_res = response.data;
        var venue_info = {};
        var venue_res = venue_info_res['_embedded']['venues'][0];
        venue_info.name = venue_res['name'];
        var address = 'address' in venue_res?  venue_res['address']['line1']: "";
        var city = 'city' in venue_res? venue_res['city']['name']: "";
        var state = 'state' in venue_res? venue_res['state']['stateCode']: "";
        venue_info.address = address + ", " + city + ", " + state;
        if ('boxOfficeInfo' in venue_res){
          if( 'phoneNumberDetail' in venue_res['boxOfficeInfo']){
            venue_info.phoneNumberDetail = venue_res['boxOfficeInfo']['phoneNumberDetail'];
          }
          if( 'openHoursDetail' in venue_res['boxOfficeInfo']){
            venue_info.openHoursDetail = venue_res['boxOfficeInfo']['openHoursDetail'];
          }
        }
        if ('generalInfo' in venue_res){
          if( 'generalRule' in venue_res['generalInfo']){
            venue_info.generalRule = venue_res['generalInfo']['generalRule'];
          }
          if( 'childRule' in venue_res['generalInfo']){
            venue_info.childRule = venue_res['generalInfo']['childRule'];
          }
        }

        venue_info.lat = 0.0;
        venue_info.lng = 0.0;
        if ('location' in venue_res) {
          if ('longitude' in venue_res['location']){
            venue_info.lng = Number(venue_res['location']['longitude']);
          }

          if ('longitude' in venue_res['location']){
            venue_info.lat = Number(venue_res['location']['latitude']);
          }          
        }

        res.send({ payload: venue_info });
      })
      .catch(function (error) {
        res.send({ error: error.message });
      });
});

function artisAlbumCovers(id) {
  var images = [];
  spotifyApi.getArtistAlbums(id, { limit: 3, offset: 0 }, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      var albums = data.body.items;
      albums.forEach((a) => {
        images.push(a['images']);
      });
    }
  });
  return images;
}

app.get("/getArtistsInfo",async(req,res)=>{
  var artist = req.query.artists;
  var artists = artist.split(";");
  var responses = [];
  setSpotifyToken();

  for(let i=0;i<artists.length;i++){
    data = await spotifyApi.searchArtists(artists[i]);
    var responseJson = data.body;


    // for(let i=0;i<responseJson['artists']['items'].length;i++){
    var artist_details_res = responseJson['artists']['items'][0];

    var artist_details = {};

    artist_details.name = artist_details_res['name'];
    artist_details.followers = artist_details_res['followers']['total'];
    artist_details.popularity = artist_details_res['popularity'];
    artist_details.spotifyLink = artist_details_res['external_urls']['spotify'];
    if(artist_details_res['images'].length>0)
      artist_details.image = artist_details_res['images'][0]['url'];

    let albumCovers=[];
    data = await spotifyApi.getArtistAlbums(artist_details_res['id'],{ limit: 3, offset: 0 });

    var albumsImage = data.body.items[0]['images'];
    for(let i=0;i<albumsImage.length;i++){
      albumCovers.push(albumsImage[i]['url']);
    }
    artist_details.albumCovers = albumCovers;
    responses.push(artist_details);
    // }
  }
  res.send({ payload:responses});
});


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
