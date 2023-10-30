import React,{useState} from "react";
import { Row, Col } from 'react-bootstrap';
import "../../css/EventsInfo.css";
import facebook from "../../images/facebook.svg";
import fb from "../../images/fb.png";
import twitter from "../../images/twitter.png";

export default function EventInfo(props) {
  const color_codes = {onsale: {text: 'On Sale', color: 'green'},
    offsale: {text: 'Off Sale', color: 'red'},
    cancelled: {text: 'Cancelled', color: 'black'},
    postponed: {text: 'Postponed', color: 'orange'},
    rescheduled: {text: 'Rescheduled', color: 'orange'}
  };
  const ticketStatusColor = color_codes[props.eventInfo.status].color;
  const ticketStatusText = color_codes[props.eventInfo.status].text;

  // const shareOnTwitter = (props, e) => {
  //   console.log("sharing on twitter.");
  // };

  // const shareOnFacebook = (props, e) => {
  //   console.log("sharing on Facebook.");
  // };

  const shareTweet = "https://twitter.com/intent/tweet?text=Check "+ encodeURIComponent(props.eventInfo.name) + " on Ticketmaster.\n" + encodeURIComponent(props.eventInfo.buy);
  const FbPost = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(props.eventInfo.buy);

  return(
      <div className="container-fluid">
        <Row>
          <div className="col-sm">
            {props.eventInfo.date ? <div>
              <div className="fieldsName">Date</div>
              <div className="fieldsValue">{props.eventInfo.date}</div>
            </div> : null}
            {props.eventInfo.team ? <div>
              <div className="fieldsName">Artist/Team</div>
              <div className="fieldsValue">
                {props.eventInfo.team.map((link, index) => (
                    <span key={link.url}>
                       <a style={{textDecoration: "none", color: "white"}} target="_blank" href={link.url}>{link.name}</a>
                      {index !== props.eventInfo.team.length - 1 && " | "}
                   </span>
                ))}</div>
            </div> : null}
            {props.eventInfo.venue ? <div>
              <div className="fieldsName">Venue</div>
              <div className="fieldsValue">{props.eventInfo.venue}</div>
            </div> : null}
            {props.eventInfo.genre ? <div>
              <div className="fieldsName">Genres</div>
              <div className="fieldsValue">{props.eventInfo.genre.join(" | ")}</div>
            </div> : null}
            {props.eventInfo.price ? <div>
              <div className="fieldsName">Price Ranges</div>
              <div className="fieldsValue">{props.eventInfo.price.range.join(" - ")} {props.eventInfo.currency}</div>
            </div> : null}
            {props.eventInfo.status ? <div>
              <div className="fieldsName">Ticket Status</div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{color: "white", backgroundColor: ticketStatusColor, display: "inline-block", padding: 8, borderRadius: 10}} className="fieldsValue">{ticketStatusText}</div>
              </div>
            </div> : null}
            {props.eventInfo.buy ? <div>
              <div className="fieldsName">Buy Tickets At:</div>
              <div className="fieldsValue">
                <a href={props.eventInfo.buy} target="_blank">Ticketmaster</a>
              </div>
            </div> : null}
          </div>
          <div className="col-sm" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {props.eventInfo.seatmap ? <div><img style={{maxWidth: "80%", maxHeight: "80%"}} src={props.eventInfo.seatmap} /></div> : null}
          </div>
        </Row>


        <div className="position-relative" style={{margin:"auto",width:"fit-content"}}>
          <span style={{verticalAlign:"bottom",paddingRight:5}}> Share on:   </span>

          <a href={shareTweet} target="_blank">
            <img src={twitter} width={40} />
          </a>
          <a href={FbPost} target="_blank">
            <img src={fb} width={40}/>

          </a>
        </div>



        {/* <div id="shareOn" >Share on:
          <div class="row" onClick={(e) => shareOnTwitter(props, e)} >Twitter</div>
          <div class="row" onClick={(e) => shareOnFacebook(props, e)} >Facebook</div>
        </div> */}
      </div>
  );
}