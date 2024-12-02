import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import AddRoom from "./pages/AddRoom";
import Home from "./pages/Home";


const App = () => {
 
  return (
    <BrowserRouter>
     
    <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/add-room" element={<AddRoom/>}/>
   {/* <Route path={`/location/:address/:lat/:lon`} element={<Location/>}/> */}

    </Routes>
    
    </BrowserRouter>
  );
};

export default App;
