import React,{useState} from "react";
import "../../css/ArtistInfo.css";
import Carousel from "react-bootstrap/Carousel";
import Artist from "./Artist.js";

export default function ArtistInfo(props) {
  console.log(props);
  const [index, setIndex] = useState(0);
  const handleClick = (ind, e) => {
    setIndex(ind);
  };

  return (
      <div>
        {props.artistDetails.length > 0 ? (
        <div>
          {props.artistDetails.length > 1? (
            <Carousel indicators={false} activeIndex={index} onSelect={handleClick} interval={null}>
              {props.artistDetails.map((details, i) => {
                return (
                    <Carousel.Item key={i}>
                      <Artist artist={details}/>
                    </Carousel.Item>
                );
              })}
            </Carousel> ):
            (<div>
              <Artist artist={props.artistDetails[0]}/>
            </div>)}
        </div> ) : (
        <div>
          <table className="table-dark text-center col-sm-10 table-responsive-md  m-auto p-auto" style={{ background: "white", color: "red", borderRadius: 10}}>
            <tr style={{ background: "white", borderRadius: 10}}><td style={{ background: "white", color:"red", borderRadius: 10}}><span id="noArtist">No Records Found</span></td></tr>
          </table>
        </div>)}

      </div>
  );
}