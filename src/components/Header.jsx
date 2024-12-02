import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="headerDiv"
    >
      {" "}
      <h1 className="heading">
        Find rooms around the Mechi Multiple Campus
      </h1>{" "}
     
        <Link to="/add-room" className="addRoomBtn">Add Room</Link>
      
    </div>
  );
};

export default Header;
