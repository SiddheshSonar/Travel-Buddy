"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback } from "react";
import { useRef } from 'react';
import ReactMapGL, { Marker, MapRef } from 'react-map-gl';
import { BiCurrentLocation, BiLocationPlus } from "react-icons/bi"
import "./cust.css"
import { toast } from 'react-toastify';
import APIRequests from '@/api';
import ChatDrawer from './drawer';

const MyMap = () => {
  const mapRef = useRef();

  const [location, setLocation] = React.useState({});

  const fly = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  const getCurrentLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLocation(position.coords);
            const lat = isNaN(position.coords.latitude) ? 19.12315995904184 : position.coords.latitude;
            const long = isNaN(position.coords.longitude) ? 72.83611545347907 : position.coords.longitude;
            fly({ longitude: long, latitude: lat });
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
    APIRequests.getHome().then((res) => {
      if (res.status == 200) {
        const { latitude, longitude } = res.data.location;
        if (latitude && longitude) {
          setHomeLocation(res.data.location);
        }
      }

    }).catch((err) => {
      console.log("error fetching home", err)
    })
    getCurrentLocation();
  }, []);


  const [viewport, setViewport] = React.useState({
    latitude: 19.12315995904184,
    longitude: 72.83611545347907,
    zoom: 13
  });

  const [isEditingHomeLocation, setIsEditingHomeLocation] = React.useState(false);
  const [homeLocation, setHomeLocation] = React.useState(null);


  return (
    <div style={{
      width: "100%",
      height: "100vh",
    }}>
      <ChatDrawer />
      <ReactMapGL
        ref={mapRef}
        // {...viewport}
        initialViewState={viewport}
        interactive={true}

        mapStyle="mapbox://styles/gnsmtest/cllxwulk000kv01peb9yk15a9"
        onMove={evt => setViewport(evt.viewState)}

        mapboxAccessToken={"pk.eyJ1IjoiZ25zbXRlc3QiLCJhIjoiY2xseHc5d3plMmt0eDNlcGU4NmN2eXk4aCJ9.qjuYscqJ5dSJMS3XJYmmxQ"}
      >
        <div style={{ position: 'absolute', left: 10, top: 10 }} className='flex flex-col'>
          <div
            className='rounded-full w-12 h-12 flex items-center justify-center mb-2'
            style={{ backgroundColor: '#00000099' }}
            onClick={getCurrentLocation}
          >
            <BiCurrentLocation
              title='Current Location'
              size={30}
              color="lightblue"
            />
          </div>
          <div
            className={`rounded-full w-12 h-12 flex items-center justify-center ${isEditingHomeLocation ? 'bg-red-600' : 'bg-gray-500'}`}
            style={{ backgroundColor: '#00000099' }}
            onClick={async () => {
              if (!isEditingHomeLocation) {
                setIsEditingHomeLocation(true);
                if (!homeLocation) setHomeLocation(location);
              } else {
                setIsEditingHomeLocation(false);
                APIRequests.setHome({
                  location: {
                    latitude: homeLocation.latitude,
                    longitude: homeLocation.longitude,
                  }
                }).then((res) => {
                  if (res.status == 200) toast.success("Home location set successfully", toastConfig);
                  else if (res.status == 400) toast.error("User not found", toastConfig);
                  else toast.error("Error setting home location", toastConfig);
                }).catch((err) => {
                  toast.error("Error setting home location", toastConfig);
                }
                )
              }
            }}
          >
            <BiLocationPlus
              title='Set Home Location'
              size={30}
              color={isEditingHomeLocation ? 'lightblue' : 'white'}
            />
          </div>
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
        {homeLocation && (
          <Marker
            latitude={homeLocation.latitude}
            longitude={homeLocation.longitude}
            draggable={isEditingHomeLocation}
            onDragEnd={(event) => {
              setHomeLocation({
                latitude: event.lngLat.lat,
                longitude: event.lngLat.lng,
              });
            }}
          >
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
