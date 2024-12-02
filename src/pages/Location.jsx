import { useParams } from "react-router-dom";
import Map from "../components/Map";

import { useEffect, useState } from "react";
export default function Location() {
  const {lat,lon,address}=useParams()
  const decodedAddress = decodeURIComponent(address);

  const [coords, setCorrds] = useState({
    latitude: lat,
    longitude: lon
  });

  return (
    <div >
      <Map coords={coords}  display_name={decodedAddress}/>
    </div>
  );
}
