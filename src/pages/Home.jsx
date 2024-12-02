import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let arr = [];
      const docRef = await getDocs(collection(db, "rooms"));
      docRef.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;
        arr.push(item);
      });
      return arr;
    };
    fetchData()
      .then((data) => {
        setRooms(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
 
  return (
    <>
      <Header />
      <div className="mainDiv">
        {rooms.length > 0 &&
          rooms.map((room) => {
            return (
              <Card
                key={room.id}
                ownerName={room.ownerName}
                contact={room.number}
                address={room.address}
                imageUrl={room.url}
                rent={room.rent}
                location={room.location}
              />
            );
          })}
      </div>
      <p className="warning">
        Rooms may not be available in each and every house but you can contact
        the house owner
      </p>
    </>
  );
};

export default Home;
