import React,{useState} from "react";
import "../../css/Artist.css";
import { Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Image } from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';
import spotify  from "../../images/spotify.png";
export default function Artist(props) {
  console.log(props);
  const formattedNumber = props.artist.followers.toLocaleString();

  return (
      <div className="container-fluid">
        <Row>
          <div className="col-sm" >
            <Col>
              <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ width: "120px !important", height: "120px !important", overflow: "hidden" }}>
                <Image src={props.artist.image} className="w-100 h-100" />
              </div>
              <div class="fieldsName">{props.artist.name}</div>
            </Col>
          </div>

          <div className="col-sm" >
            {/* <Col xs={7}> */}
            {/* <Row> */}
            <Col>
              <div className="fieldsName">Popularity</div>
              <div className="fieldsValue" style={{ width: 50, height: 50 }}>
                <CircularProgressbar
                    value={props.artist.popularity}
                    strokeWidth={5}
                    pathColor="#ff0000" // set the path color to red
                    textColor="#ffffff" // set the text color to white
                    styles={{
                      text: {
                        fontSize: '16px',
                      },
                    }}
                    text={`${props.artist.popularity}`}
                />
              </div>
            </Col>
          </div>

          <div className="col-sm" >

            <Col>
              <div className="fieldsName">Followers</div>
              <div className="fieldsValue">{formattedNumber}</div>
            </Col>
          </div>

          <div className="col-sm" >

            <Col>
              <div className="fieldsName">Spotify Link</div>
              <div>
                <a target="_blank" href={props.artist.spotifyLink}>
                  <Image src={spotify} height={30}className="d-block mx-auto my-2"></Image>
                </a>
              </div>
            </Col>
          </div>
          {/* </Row> */}
          {/* </Col> */}
        </Row>
        <Row>
          <div className="fieldsName">Albums Featuring {props.artist.name}</div>
          {props.artist.albumCovers.map((item) => (
              <div className="col-sm">
                <img src={item}  className="d-block w-100 img-fluid"/>
              </div>
          ))}
        </Row>
      </div>
  )
}