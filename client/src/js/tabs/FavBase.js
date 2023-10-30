import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


// import Search from "../searchtab/Search";
import Search from "../Search";
import Favorites from "../Favorites";

import FavTab from "./Fav";
import SeaTab from "./Sea"; 
import { Button } from 'react-bootstrap';
import "../../css/Tabs.css";

const SeaBase = () => {
  const [activeTab, setActiveTab] = useState("tab2");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  return (
    <div className="Tabs">
      <div className="nav">
      <div className="header">
              <Button class="btn pull-right" id="search2" href="/search">Search</Button>
              <Button class="btn pull-right" id="favorites2" href="/favorites">Favorites</Button>
            </div>
      </div>
 
      <div className="outlet">
        {/* {<FavTab />} */}
        <div className="FavTab">
    <p>{<Favorites />}</p>
    </div>
      </div>
    </div>
  );
};
export default SeaBase;