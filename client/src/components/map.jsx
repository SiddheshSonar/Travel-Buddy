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

  const getCurrentLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLocation(position.coords);
            const lat = isNaN(position.coords.latitude) ? 19.12315995904184 : position.coords.latitude;
            const long = isNaN(position.coords.longitude) ? 72.83611545347907 : position.coords.longitude;
            mapRef.current?.flyTo({
              center: [long, lat],
              duration: 2000
            });
          },
          function (error) {
            toast.error(error.message, toastConfig);
          },
          { enableHighAccuracy: true, maximumAge: 10000 }
        );
      } else if (permissionStatus.state === 'denied') {
        toast.error("Geolocation permission was denied.", toastConfig);
      }
    });
  }

  const toastConfig = {
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);


  const [viewport, setViewport] = React.useState({
    latitude: 19.12315995904184,
    longitude: 72.83611545347907,
    zoom: 13
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
          onClick={getCurrentLocation}

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
      <div className="w-8 h-8 rounded-full border-2 border-white" style={markerStyle}></div>
      <div className="pin-after w-0 h-0 mt-1 border-l-3 border-transparent border-r-3 border-transparent border-b-4 border-gray-600 inline-block"></div>
    </div>
  )
}
