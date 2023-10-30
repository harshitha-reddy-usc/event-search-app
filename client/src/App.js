// client/src/App.js

import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
// import Search from "./Search";

// import FavTab from "./js/tabs/Fav";
// import SeaTab from "./js/tabs/Sea";
// import Tabs from "./js/tabs/tabs";
import FavBase from "./js/tabs/FavBase";
import SeaBase from "./js/tabs/SeaBase";
import Table from "./js/venue/venues";

import SeaTab from "./js/tabs/Sea";
import FavTab from "./js/tabs/Fav";


function App() {
  return (
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />}/>
          <Route exact path="/search" element={<SeaBase />}/>
          <Route exact path="/favorites" element={<FavBase/>}/>

        </Routes>
      </BrowserRouter>
      </div>
  )

  // return (
  //   // <div className="App">
  //   //   <Tabs />
  //   // </div>
  //   <div className="App">
  //   <Tabs />
  // </div>
  // );
}

export default App;