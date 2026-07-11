import React from "react";
import "leaflet/dist/leaflet.css";
import GolestanLogo from "../../Logo/GolestanLogo";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
const Leafletmap = () => {
  const center = [52.565648528991005, 13.412039548127355];

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
          <p>
            <a
              href={`https://www.google.com/maps?q=${center[0]},${center[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#186f77] underline"
            >
              Kunst-Stoffe- Materialmarkt Pankow <br />
              Berliner Str. 17, 13189 Berlin
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:kontakt@kultur-atelier.de"
              className="hover:text-[#186f77] underline"
            >
              kontakt@kultur-atelier.de
            </a>
          </p>

          <p>
            Phone:{" "}
            <a
              href="tel:+4915904973362"
              className="hover:text-[#186f77] underline"
            >
              +49 15904973362
            </a>
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default Leafletmap;
