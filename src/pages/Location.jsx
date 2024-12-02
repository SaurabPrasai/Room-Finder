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
    <div className="App">
      <h1 style={{margin:"6rem 0",textAlign:"center"}}>{address}</h1>
      <Map coords={coords}  display_name={decodedAddress}/>
    </div>
  );
}
