"use client";

import Mapbox, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  center?: number[] | null;
}

const Map = ({ center }: MapProps) => {
  const coordinates = center || [33.977666, -117.909685];
  return (
    <Mapbox
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      //Initial 값만 들어가 있는데 나중에 longitude, latitude가 변경해도
      //지도위 위치가 고정되어 있는문제가 있어서 usememo를 쓰고 있는것 같음.
      initialViewState={{
        longitude: coordinates[1],
        latitude: coordinates[0],
        zoom: center ? 4 : 2,
      }}
      style={{ height: "35vh", borderRadius: "0.5rem" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      scrollZoom={false}
    >
      <Marker longitude={coordinates[1]} latitude={coordinates[0]} />
    </Mapbox>
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
