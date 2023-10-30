import React, { useState } from 'react';

import "./venues.css";
import { Button } from 'react-bootstrap';

import ReadMore from "./readMore";
import { Row } from 'react-bootstrap';
import "../../css/EventsInfo.css";
import Map from './gMap';

import Modal from 'react-bootstrap/Modal';

export default function VenueInfo(props) {
  const [state, setState] = useState(true);
  const [showMap, setShowMap] = React.useState(false);
  // const [locInfo, setLocInfo] = useState({});
  var locInfo = {lat: 37.4749, lng: -12.5194}

  const handleClick = (props, e) => {
    setShowMap(true);
  };

  const closeMap = (props, e) => {
    setShowMap(false);
  }

  const showForm = () => {
    return (
        <div>
          <form id= "add-app">

            <label>Application Name : </label>
            <input type="text"> </input>

            <label> id : </label>
            <input type="text" ></input>

            <label>Server details : </label>
            <input ></input>

            <button>Create</button>
          </form>
        </div>
    );
  }

  return(
      <div className="container-fluid">
        <Row>
          <div className="col-sm" >
            {props.venueInfo.name ? <div>
              <div className="fieldsName">Name</div>
              <div className="fieldsValue">{props.venueInfo.name}</div>
            </div> : null}

            {props.venueInfo.address ? <div>
              <div className="fieldsName">Address</div>
              <div className="fieldsValue">{props.venueInfo.address}</div>
            </div> : null}

            {props.venueInfo.phoneNumberDetail ? <div>
              <div className="fieldsName">Phone Number</div>
              <div className="fieldsValue">{props.venueInfo.phoneNumberDetail}</div>
            </div> : null}
          </div>

          <div className="col-sm" >
            {props.venueInfo.openHoursDetail ? <div>
              <div className="fieldsName">Open Hours</div>
              <div className="fieldsValue">
                <ReadMore>{props.venueInfo.openHoursDetail}</ReadMore>
              </div>
            </div> : null}

            {props.venueInfo.generalRule ? <div>
              <div className="fieldsName">General Rule</div>
              <div className="fieldsValue">
                <ReadMore>{props.venueInfo.generalRule}</ReadMore>
              </div>
            </div> : null}

            {props.venueInfo.childRule ? <div>
              <div className="fieldsName">Child Rule</div>
              <div className="fieldsValue">
                <ReadMore>{props.venueInfo.childRule}</ReadMore>
              </div>
            </div> : null}
          </div>

        </Row>
        <div class="row" style={{marginTop:10}} onClick={(e) => handleClick(props, e)}>
          <div class="col-lg-1 col-centered" style={{"cursor":"pointer"}}>Show venue on Google Map</div>
        </div>
        <div> { showMap ? (
            <Modal   dialogClassName="map-modal" show={showMap} onHide={closeMap}>
              <Modal.Header>
                <div id="heading2">Event Venue</div>
              </Modal.Header>
              <Modal.Body className="text-left">
                {/* <div className="card-body m-1 p-auto"> */}
                {/* <div className=" d-flex flex-column align-items-center"> */}
                {/* <div className="SeaTab"> */}
                <p>{<Map venueInfo={props.venueInfo} />}</p>
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
                <Button variant="dark" className="align-left" onClick={(e) => closeMap(props, e)}>Close</Button>
              </Modal.Body>
              {/* <Modal.Footer>
            <Button variant="dark" className="align-left" onClick={(e) => closeMap(props, e)}>Close</Button>
          </Modal.Footer> */}
            </Modal>
        ) : (<p></p>)}
        </div>
      </div>
  );
}
