import React from "react";
import "leaflet/dist/leaflet.css";
import GolestanLogo from "../../Logo/GolestanLogo";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
const Leafletmap = () => {
  const center = [52.5697, 13.4019];

  const icon = L.divIcon({
    html: renderToStaticMarkup(
      <GolestanLogo
        width={40}
        height={40}
        colorOne={"#186f77"}
        colorTwo={"#ECEAD3"}
      />,
    ),
    className: "",
  });

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[350px] w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={icon}>
        <Popup>
          <p>Location: Pankow, Berlin</p>
          <p>Email: naghmeh@gmail.com</p>
          <p>Phone: +4900000000</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Leafletmap;
