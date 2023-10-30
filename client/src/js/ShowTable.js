import React, { Component, useState, useEffect } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';
import EventsCard from './EventsCard';

import "../css/ShowTable.css";

export default function ShowTable(props) {
  const ref = React.useRef();
  const [showTable, setShowTable] = useState(true);
  const [eventID, setEventID] = useState("");
  const [eventDetails, setEventDetails] = useState({});
  const [eventInfo, setEventInfo] = useState({});
  const [venueInfo, setVenueInfo] = useState({});
  const [artistsDetails, setArtistsDetails]  = useState([]);
  //const [setSortedRows, sortedRows]  = useState([]);
  //const [artists, setArtists] =  useState([]);
  useEffect(() => {
    setShowTable(true)
  }, [props])

  function sortByDate(rows) {
    const sorted = [...rows].sort((a, b) => {
      if (a.event_date < b.event_date) {
        return -1;
      }
      if (a.event_date > b.event_date) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }


  function DisplayRows(rows) {
    console.log(rows);
    var sortedRows = sortByDate(rows);
    console.log(sortedRows);
    var tableRows = [];
    for (let i = 0; i < sortedRows.length; i++) {
      var r = sortedRows[i];
      let j = i;
      var row = <tr key={j} className="text-white" style={{ cursor: "pointer",color:"white"}} onClick={() => handleRowClick(sortedRows[j])}>
        <td>{r.event_date}  <br></br>  {r.event_time}</td>
        <td><img src={r.event_icon} style={{ width: 80, height: 50,  margin: 10, display: "block", marginLeft: "auto", marginRight: "auto" }}/></td>
        <td>{r.event_name}</td>
        <td>{r.event_segment}</td>
        <td>{r.event_venue}</td>
      </tr>
      tableRows.push(row);
    }
    return tableRows;
  }

  function populateVenueInfo(venueName) {
    let venue2 = encodeURIComponent(venueName);
    let url = encodeURI("http://localhost:3001/getVenueInfo?venue=" + venue2);
    var venueUrl = `http://localhost:3001/getVenueInfo?venue=${venue2}`;
    axios.get(url).then((response) => {
      setVenueInfo(response.data.payload);
    });
  }

  function populateArtistsInfo(artists) {
    if (artists.length > 0) {
      var artist = artists.join(';');
      var artistUrl = `http://localhost:3001/getArtistsInfo?artists=${encodeURIComponent(artist)}`;
      axios.get(artistUrl).then((response) => {
        setArtistsDetails([response.data.payload]);
      });
    }
  }

  // function handleRowClick(r) {
  //   var venueName = r.event_venue;
  //   populateVenueInfo(venueName);
  //   setEventID(r.event_id);
  //   var url = `http://localhost:3001/getEventInfo?eventID=${r.event_id}`;
  //   axios.get(url).then((response) => {
  //     setEventDetails(response.data.payload);
  //     // response.data.payload.artists.map((artist) => {
  //     //    populateArtistsInfo(artist);
  //     // });
  //     populateArtistsInfo(response.data.payload.artists);
  //     //setArtists(response.data.payload.artists);
  //     setEventInfo(r);
  //     setShowTable(false);
  //     ref.current.scrollIntoView({behavior: 'instant'});
  //   });
  // }

  function handleRowClick(r) {
    var venueName = r.event_venue;
    populateVenueInfo(venueName);
    setEventID(r.event_id);
    var url = `http://localhost:3001/getEventInfo?eventID=${encodeURIComponent(r.event_id)}`;
    axios.get(url)
        .then((response) => {
          setEventDetails(response.data.payload);
          if (response.data.payload.artists.length > 0) {
            var artist = response.data.payload.artists.join(';');
            return axios.get(`http://localhost:3001/getArtistsInfo?artists=${encodeURIComponent(artist)}`);
          } else {
            return {"data": {"payload": []}};
          }
        })
        .then(response => {
          setArtistsDetails(response.data.payload);
          setEventInfo(r);
          setShowTable(false);
          ref.current.scrollIntoView({behavior: 'instant'});
       });
  }

  // useEffect(() => {
  //   if (artists) {
  //     const populateArtistsInfo = async () => {
  //       const requests = artists.map(artist => axios.get(`http://localhost:3001/getArtistsInfo?artist=${artist}`));
  //       const results = await Promise.all(requests);
  //       const data = results.map(result => result.data.payload);
  //       setArtistsDetails(data);
  //     }
  //     populateArtistsInfo();
  //   }
  // }, [handleRowClick]);


  return (
      <div ref={ref} style={{margin:15}}>
        {(props.rows.length === 0) ? (
            <table className="table-dark text-center col-sm-10 table-responsive-md  m-auto p-auto "  style={{ background: "white", borderRadius: 10}}>
              <tr style={{ background: "white", borderRadius: 10}} ><td style={{ background: "white", borderRadius: 10}}><span id="norecord">No Records Found</span></td></tr>
            </table>
        ) : (
            <div>
              {showTable ? (
                  <div className=" text-center table-responsive-md col-sm-10 p-auto m-auto" style={{ marginTop: 30, marginBottom: 30 }}>
                    <Table bordered={false} className=" table-dark table-striped p-auto my-0" style={{ color: "white", borderRadius: 10}}>
                      <thead style={{ fontStyle: "bold"}}>
                      <tr style={{ fontStyle: "bold"}}>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Icon</th>
                        <th scope="col">Event</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Venue</th>
                      </tr>
                      </thead>
                      <tbody>
                      {DisplayRows(props.rows)}
                      </tbody>
                    </Table>
                  </div>
              ) : (
                  <div >
                    <EventsCard  eventID={eventID} eventDetails={eventDetails} eventInfo={eventInfo} venueInfo={venueInfo} artistsDetails={artistsDetails} setShowTable={setShowTable} />
                  </div>
              )}
            </div>
        )}
      </div>
  );
}