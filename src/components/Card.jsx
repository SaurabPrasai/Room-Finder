import React from 'react'
import { Link } from 'react-router-dom'


const Card = ({ownerName,contact,address,imageUrl,rent,location}) => {
  return (
    <div className="card">
    <a href="#">
      <img
      src={imageUrl}
        alt="Image description"
      />
    </a>
    <div className="content">
      <h5>{ownerName}</h5>
      <p>Contact:{contact}</p>
      <p><i className="fa-solid fa-location-dot " style={{marginRight:5}}></i>{address}</p>
      <div className="priceAndLocation">
        <p>Rent:Rs.{rent}</p>
      <Link to={`/location/${encodeURIComponent(address)}/${location.latitude}/${location.longitude}`}>See Location</Link>
      </div>
    </div>
  </div>
  )
}

export default Card