"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import React from "react";
import { useRef } from 'react';
import ReactMapGL, { Marker, MapRef } from 'react-map-gl';
import { BiCurrentLocation } from "react-icons/bi"
import "./cust.css"

const MyMap = () => {
  const mapRef = useRef();

  // get location 
  const [location, setLocation] = React.useState({});
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation(position.coords);
      setViewport({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 11
      });
    });


  }, []);

  const [viewport, setViewport] = React.useState({
    latitude: 38.958630,
    longitude: -77.357002,
    zoom: 8
  });
  return (
    <div style={{
      width: "100%",
      height: "100vh",
    }}>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        interactive={true}

        mapStyle="mapbox://styles/gnsmtest/cllxwulk000kv01peb9yk15a9"
        onMove={evt => setViewport(evt.viewState)}

        mapboxAccessToken={"pk.eyJ1IjoiZ25zbXRlc3QiLCJhIjoiY2xseHc5d3plMmt0eDNlcGU4NmN2eXk4aCJ9.qjuYscqJ5dSJMS3XJYmmxQ"}
      >
        <div
          className='rounded-full  w-12 h-12 flex items-center justify-center'
          style={{ position: 'absolute', left: 10, top: 10, backgroundColor: '#00000099' }}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(function (position) {
              mapRef.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude], duration: 2000 });
            });
          }}
        >
          <BiCurrentLocation
            title='Current Location'
            size={30}
            color="lightblue"
          />
        </div>



        <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        />
      </ReactMapGL>
    </div>
  );
};


export default MyMap;