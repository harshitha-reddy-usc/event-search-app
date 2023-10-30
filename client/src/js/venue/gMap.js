import React from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

function Map(props) {
  console.log(props);
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // const center = {
  //   lat: 37.7749,
  //   lng: -12.4194
  // };

  let new_lat = Number(props.venueInfo.lat);
  let new_lng = Number(props.venueInfo.lng);
  const center = {
    lat: new_lat,
    lng: new_lng
    // lat: (props.lat).toFixed(4),
    // lng: (props.lng).toFixed(4)
  };

  return (
    <LoadScript id='gmap-script'
      googleMapsApiKey="AIzaSyBTaWgXOh-VVi_1DYikSYEeBTuXhCMJ_0E"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {/* add any markers or other components here */}
        <Marker position={center}/>
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
