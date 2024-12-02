import React from 'react'


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
      <button>See Location</button>
      </div>
    </div>
  </div>
  )
}

export default Card