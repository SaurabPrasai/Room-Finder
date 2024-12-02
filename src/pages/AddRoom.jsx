import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {useNavigate} from "react-router-dom"

const AddRoom = () => {
  const [ownerName, setOwnerName] = useState("");
  const [number, setNumber] = useState("");
  const [rent, setRent] = useState(null);
  const [image, setImage] = useState("");
  const [address,setAddress] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [url, setUrl] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (image) {
      uploadImage(image);
    }
  }, [image]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setErr(null); // Clear error if successful
        },
        (err) => {
          setErr("Unable to retrieve your location.");
        }
      );
    } else {
      setErr("Geolocation is not supported by this browser.");
    }
  };

  // upload Image to cloudinary
  const uploadImage = async (image) => {
    setLoading(true);
    setUrl(null);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    data.append("folder", "room-images");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dnjzxugbz/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const json = await res.json();
      setUrl(() => json.secure_url);
      getLocation();
      setLoading(false);
    } catch (error) {
      console.log("Error while uploading: ", error);
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setErr(null);

    if (ownerName === "" || number === "" || url === null||address==="") {
      return setErr("Please fill all the fields");
    }

    if (number.length !== 10) {
      return setErr("Please enter a valid number");
    }

    if (location.latitude === null || location.longitude === null) {
        return setErr("Please enable location");
    }
    try {
        
        await addDoc(collection(db, "rooms"), {ownerName, number, rent, url,address,location});
        navigate("/");
        
    } catch (error) {
        console.log(error.message);
    }
  };

  

  return (
    <div>
      <p className="warning">
        This platform is created to help students find rooms around the college
        area. We kindly request you to upload only authentic and accurate
        information to ensure it remains helpful for everyone. Thank you for
        contributing to this community effort! 😊
      </p>
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Owner Name:</label>
            <input
              type="text"
              placeholder="Enter owner Name or house name"
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Contact:</label>
            <input
              type="text"
              placeholder="Enter contact number"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Address:</label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div>
            <label htmlFor="">Rent:</label>
            <input
              type="text"
              onChange={(e) => setRent(e.target.value)}
              placeholder="Enter rent (optional)"
            />
          </div>
          <div>
            <label htmlFor="image">Select Image:</label>
            {url && (
              <img
                src={url}
                style={{ height: 200, width: 200, borderRadius: 4 }}
              />
            )}
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button disabled={loading}>Submit</button>
        </form>
      </div>
      {err && <p className="error">{err}</p>}
      <p className="warning">
        You can upload the house details even if the room is not available at
        the moment 😊
      </p>
    </div>
  );
};

export default AddRoom;
