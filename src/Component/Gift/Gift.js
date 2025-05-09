import React from "react";
import WishesVideo from "../../assets/Happy_Birthday_Status.mp4";
import './Gift.css';
import { Link } from "react-router-dom";

const Gift = () => {
  return (
    <div className="gift-container">
      <h1>🎁 This is for YOU  ! 🎥</h1>

      <div className="video-container" data-aos="fade-up">
        <video width="100%" autoPlay unmuted playsInline controls>
          <source src={WishesVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section className="gift-section">
        <button className="gift-button" >
         <Link to="/Carousel"> Click here ... 🎁</Link>
        </button>
      </section>
    </div>
  );
};

export default Gift;

