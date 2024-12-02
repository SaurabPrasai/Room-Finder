import React from "react";
import { useParams } from "react-router-dom";

const Location = () => {
  const { address, lat, lon } = useParams();
  const decodedAddress = decodeURIComponent(address);

  return <div>Location</div>;
};

export default Location;
