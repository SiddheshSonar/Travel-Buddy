"use client"

import React from "react";
import DeckGL from "@deck.gl/react";
import ReactMapGL, { StaticMap } from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN ="pk.eyJ1IjoiZ25zbXRlc3QiLCJhIjoiY2xpdHlxdDVhMHRicjNubzdweDEyZmYweiJ9.Ry25g8XRnQ7ZaatTwsiBRw";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const layers = [];

const Map = () => {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};


export default Map;