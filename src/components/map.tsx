import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import defaultTheme from "../utils/theme";

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

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapGoogle() {
  const API_KEY =
    process.env.REACT_APP_API_KEY || "AIzaSyCMRnTYl6n3YO7yqHZ2wRtHAPdUdgKYvwQ";

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
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapGoogle);
