"use client";

import Mapbox from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  center?: number[];
}

const Map = ({ center }: MapProps) => {
  return (
    <Mapbox
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: center ? center[1] : -117.909685,
        latitude: center ? center[0] : 33.977666,
        zoom: center ? 6 : 2,
      }}
      style={{ height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      scrollZoom={false}
    />
    // <MapContainer
    //   center={(center as L.LatLngExpression) || [33.977666, -117.909685]}
    //   zoom={center ? 4 : 2}
    //   scrollWheelZoom={false}
    //   className="h-[35vh] rounded-lg"
    // >
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
    //         OpenStreetMap</a> contributors'
    //   />
    //   {center && <Marker position={center as L.LatLngExpression} />}
    // </MapContainer>
  );
};

export default Map;
