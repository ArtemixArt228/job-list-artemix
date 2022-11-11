import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import defaultTheme from "../utils/theme";

import { ILocation } from "../models/jobs";

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

function MapGoogle({ lat, long }: ILocation) {
  const API_KEY =
    process.env.REACT_APP_API_KEY || "AIzaSyCMRnTYl6n3YO7yqHZ2wRtHAPdUdgKYvwQ";

  const center = {
    lat,
    lng: long,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map: any) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      <Marker position={center} icon={{ url: "./assets/icon-map.svg" }} />
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
}

export default React.memo(MapGoogle);
