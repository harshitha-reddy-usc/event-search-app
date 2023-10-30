import React, { useEffect, useState } from "react";
import { BsChevronLeft } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import "../css/EventsCard.css";
import Box from "@mui/material/Box";
import { Tabs, Tab, useTheme } from '@mui/material';
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import EventInfo from "./eventdetails/EventInfo";
import VenueInfo from "./venue/venues";
import ArtistInfo from "./eventdetails/ArtistInfo";

export default function EventsCard(props) {
  const [liked, setLiked] = useState(localStorage.getItem(props.eventID) !== null);
  console.log(props);

  const heartButtonStyle = {
    backgroundColor: 'white',
    borderRadius: '50%',
    padding: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    border: 'none',
    margin: '5px'
  };

  const heartIconStyle = {
    color: 'black',
    fontSize: '20px'
  };

  const handleClick = (props, e) => {
    setLiked(!liked);
    const eventDetailsMap = {
      id: props.eventID,
      date: props.eventInfo.event_date,
      event: props.eventInfo.event_name,
      category: props.eventInfo.event_segment,
      venue: props.eventInfo.event_venue
        };
  if (liked !== true){
      localStorage.setItem(props.eventID, JSON.stringify(eventDetailsMap));
      alert("Added to Favorites!");
  } else {
      localStorage.removeItem(props.eventID);
  }
  };

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
          {value === index && (
              <Box sx={{ p: 3, minHeight:500 }}>
                <Typography>{children}</Typography>
              </Box>
          )}
        </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


  return (
      <div className="card p-0 col-12 col-md-7 events-card">
        <div>
          <div className="mx-2 mt-3">
            <span style={{ cursor: "pointer"}}  onClick={(e) => props.setShowTable(true)}
            ><BsChevronLeft /><u>Back</u></span>
          </div>
          <div>
            <h3 className="card-title text-center mb-3">{props.eventDetails.name}
            <Button variant="light" style={heartButtonStyle} onClick={(e) => handleClick(props, e)}>
              {liked ? (
                  <HeartFill style={{ ...heartIconStyle, color: 'red' }} />
              ) : (
                  <Heart style={heartIconStyle} />
              )}
            </Button>
            </h3>
          </div>
          <Box sx={{ background: "#33cccc",  textColor: "white", borderBottom: 1, borderColor: "divider", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Events" sx={{ color: theme.palette.common.white, margin: '15px',  '&.Mui-selected': { color: theme.palette.common.white, fontWeight: 'bold'} }}  {...a11yProps(0)}/>
              <Tab label="Artist/Teams" sx={{ color: theme.palette.common.white, margin: '15px',  '&.Mui-selected': { color: theme.palette.common.white, fontWeight: 'bold'} }} {...a11yProps(0)} />
              <Tab label="Venue" sx={{ color: theme.palette.common.white, margin: '15px', '&.Mui-selected': { color: theme.palette.common.white, fontWeight: 'bold'} }} {...a11yProps(0)} />
            </Tabs>
          </Box>
          <SwipeableViews disabled={true} axis={"x"} index={value} onChangeIndex={handleChange}>
            <TabPanel value={value} index={0}>
              <EventInfo eventInfo={props.eventDetails}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ArtistInfo artistDetails={props.artistsDetails}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <VenueInfo venueInfo={props.venueInfo}/>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
  );
}
