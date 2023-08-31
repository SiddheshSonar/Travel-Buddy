"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import React from "react";
import { useRef } from 'react';
import ReactMapGL, { Marker, MapRef } from 'react-map-gl';
import { BiCurrentLocation } from "react-icons/bi"
import "./cust.css"

import { toast } from 'react-toastify';
import { scaleFadeConfig } from '@chakra-ui/react';

const MyMap = () => {
  const mapRef = useRef();

  const [location, setLocation] = React.useState({});
  // const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation(position.coords);
          const lat = isNaN(position.coords.latitude) ? 38.958630 : position.coords.latitude;
          const long = isNaN(position.coords.longitude) ? -77.357002 : position.coords.longitude;
          setViewport({
            latitude: lat,
            longitude: long,
            zoom: 11
          });
        },
        function (error) {
          // setError(error.message);
          toast.error(error.message);
        },
        {enableHighAccuracy: true, maximumAge: 10000}
      );
    } else {
      // setError("Geolocation is not supported by this browser.");
    }
  }, []);


  const [viewport, setViewport] = React.useState({
    latitude: 38.958630,
    longitude: -77.357002,
    zoom: 8
  });


  // if (error) {
  //   // Render an error message or handle it as appropriate for your application
  //   return <div>Error: {error}</div>;
  // }
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
              setLocation(position.coords);
              mapRef.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude], duration: 2000 });
            },
            {enableHighAccuracy: true, maximumAge: 10000});
          }}
        >
          <BiCurrentLocation
            title='Current Location'
            size={30}
            color="lightblue"
          />
        </div>
        {(location.latitude && location.longitude) &&
          (<Marker
            latitude={location.latitude}
            longitude={location.longitude}
            draggable={true}
            scale={0.5}
          >
            <CustomMarker />
          </Marker>
          )}
      </ReactMapGL>
    </div>
  );
};


export default MyMap;

const CustomMarker = ({ imgSrc }) => {
  // default placeholder image URL (change to your placeholder image URL)
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDCFo7NYw__eCBw5E0xthvAeC-265P0xz4kJm-D0r6qYiDM90DWH4I5QUEC6JodOut2g&usqp=CAU';

  const markerStyle = {
    backgroundImage: `url(${imgSrc || defaultImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div 
    className="relative"
    >
      <div className="w-12 h-12 rounded-full border-2 border-white" style={markerStyle}></div>
      <div className="pin-after w-0 h-0 mt-1 border-l-3 border-transparent border-r-3 border-transparent border-b-4 border-gray-600 inline-block"></div>
    </div>
  )
}
