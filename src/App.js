import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Carousel from "./Component/Carousel/Carousel";
import Welcome from "./Component/Welcome/Welcome";
import Gift from "./Component/Gift/Gift.js"; 

const App = () => {
  return (
    
    <Router>

      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/gift">Gift</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/Carousel" element={<Carousel />} />
      </Routes>
    </Router>
  );
};

export default App;

