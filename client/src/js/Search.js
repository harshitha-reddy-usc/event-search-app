import React, { useState } from 'react';
import { Spinner } from "react-bootstrap";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap-typeahead/css/Typeahead.css";

//local CSS imports
import "../css/search.css";

//local js imports
import ShowTable from "../js/ShowTable";



export default function Search() {

  const ref = React.createRef();
  const [keyword, setKeyword] = useState("");
  const [distance, setDistance] = useState("10");
  const [category, setCategory] = useState("Default");
  const [location, setLocation] = useState("");
  const [latlng, setLatlng] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState(false);
  const [rows, setRows] = useState([]);

  const autoDetectCheck = (e) => {
    const { checked } = e.target;
    setIsChecked(checked); 
    setLocation("");
    setLatlng("");
    if (checked) {
      const proxy_url = "https://corsproxy.io/?";
         //const url = "https://cors-anywhere.herokuapp.com/https://ipinfo.io/207.151.52.62?token=feed184c1da5bd";
         const url = proxy_url + "https://ipinfo.io/207.151.52.62?token=feed184c1da5bd";
      axios.get(url).then((response) => {
        var latLng = response.data.loc;
        setLatlng(latLng);
      });
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    var url  = `http://localhost:3001/searchEvents?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&distance=${distance}&latlng=${encodeURIComponent(latlng)}&autoDetect=${isChecked}&category=${encodeURIComponent(category)}`;
    axios.get(url ).then((response) => {
       setRows(response.data.payload);
       setResults(true);
    });
  }

  function handleClear(event) {
    event.preventDefault();
    setKeyword("");
    setDistance("10");
    setCategory("Default");
    setIsChecked(false);
    setLocation("");
    setLatlng("");
    ref.current.clear();
    setResults(false);
  }

  function handleKeyword(keyword) {
    const url = "http://localhost:3001/keywordAutocomplete?keyword=" + keyword;
    setIsLoading(true);
    axios.get(url).then((response) => {
        setOptions(response.data.payload);
        setIsLoading(false);
    });
    setKeyword(keyword);
  }

    return (
        <>
          <div className="container-fluid col col-md-7">
            {/*<div className="card form-card mx-md-4">*/}
              <div className="card-body form-card m-md-5 p-auto">
                <div id="heading">Events Search</div>
                <hr style={{  borderTop: "2px solid", color: "white" }}></hr>
              <form onSubmit={handleSubmit} onReset={handleClear}>
                <div className="form-group mb-md-3 mt-3 ">
                  <fieldset style={{border: 0}}>
                    <label className="required">Keyword</label>
                    <AsyncTypeahead id="basic-typeahead-single"  filterBy={() => true} options={options} size={"lg"} isLoading={isLoading} useCache={false}
                                    searchText={<Spinner  animation="border" variant="dark" />} promptText="" onChange={(keyword) => setKeyword(keyword[0])} name="keyword" value={keyword || ''}
                                    inputProps={{required: true, value: keyword}}
                                    onSearch={(keyword) => handleKeyword(keyword)} ref={ref}
                                    renderMenuItemChildren={(option) => (<>
                                        <div key={option} className="pb-2 pt-2">{option}</div></>
                                    )}>
                    </AsyncTypeahead>
                    <div className="row ">
                      <div className="form-group mt-4 mb-md-4 col-md-6">
                        <label>Distance</label>
                        <input className="form-control form-control-lg" placeholder="10" type="number" onChange={(e) => setDistance(e.target.value)} name="distance" value={distance || 20}>
                        </input>
                      </div>
                      <div className="form-group mt-4 mb-md-4 col-md-6">
                        <label className="required">Category</label>
                        <select className="form-control form-control-lg"  onChange={(e) => setCategory(e.target.value)} name="category" value={category || 'Default'}>
                          <option value="Default">Default</option>
                          <option value="Music">Music</option>
                          <option value="Sports">Sports</option>
                          <option value="Arts">Arts & Theatre</option>
                          <option value="Film">Film</option>
                          <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group mt-3 mb-md-3">
                      <label className="required">Location</label>
                      <input type="text" className="form-control form-control-lg" required="required" disabled={isChecked} onChange={(e) => setLocation(e.target.value)} name="location" value={location || ''}></input>
                    </div>
                    <div className="form-group mt-3 mb-md-3">

                      <label className="form-check-label" style={{padding: 5}}>
                        <input type="checkbox" checked={isChecked} onChange={autoDetectCheck}/>
                      Auto-detect your location
                      </label>
                    </div>
                  </fieldset>
                  <div className="row mt-3 mb-1 justify-content-center">
                    <input className="btn btn-danger btn-lg" style={{ width: 100, marginRight: 20}} value="Submit" type="submit"></input>
                    <input className="btn btn-primary btn-lg" style={{ width: 100 }} value="Clear" type="reset"></input>
                  </div>
                </div>
              </form>
              {/*</div>*/}
            </div>
        </div>
        {!results ? ( <div></div> ): (
            <div>
              <ShowTable
                rows={rows}
              />
            </div>)}
        </>
    );
}
