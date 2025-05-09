import React, { useEffect, useRef, useState, useCallback } from "react";
import AOS from "aos";
import confetti from "canvas-confetti";
import "aos/dist/aos.css";
import "./Welcome.css";
import birthdayMusic from "../../assets/happy-birthday-254480.mp3";

import Profile from '../../assets/Profile 1.png'

import Carousel from "../../Component/Carousel/Carousel";
import { Link } from "react-router-dom";

const Heart = ({ style }) => <div className="heart" style={style}></div>;

function Welcome() {
  const audioRef = useRef(null);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [video, setVideo]=useState(false);


  useEffect(() => {
    AOS.init({ duration: 1200, once: false, mirror: true });
    return () => AOS.refresh();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts.slice(-20),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: Math.random() * 3 + 4,
        },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const runConfetti = useCallback(() => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ff6600", "#ffcc00", "#66ff66", "#66ccff"],
      shapes: ["circle", "star"],
    });
  }, []);

  const handleSurprise = useCallback(() => {
    runConfetti();
    setShowProfile(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked:", err);
        });
    }
  }, [runConfetti, isPlaying]);

 const handleVideo  =useCallback(() => {
  setVideo(true)
 },[video])

  return (<>
  

    <div className="App">
      <audio ref={audioRef} src={birthdayMusic} />

      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          style={{
            left: `${heart.left}vw`,
            animationDuration: `${heart.duration}s`,
          }}
        />
      ))}

      {!showProfile ? (
        <section className="hero">
          <h1 data-aos="fade-down">❤️</h1>
          <p data-aos="fade-up">From India to Kazakhstan 💌</p>
          <button data-aos="zoom-in" onClick={handleSurprise}>
            🎉 Surprise Gift!
          </button>
        </section>
      ) : (
        <div className="surprise-container" data-aos="fade-in">
          <section className="profile-section">
            <img
              src={Profile}
              alt="Profile"
              className="profile-img"
            />
            <p className="birthday-text animate-text">
              🎂 Happy Birthday! Wishing you all the love and happiness in the
              world! 🎉
            </p>
            <div className="message-container">
  <p data-aos="fade-up" data-aos-delay="100">Hi, My dear dos! 🎉❤️</p>
  <p data-aos="fade-up" data-aos-delay="300">
    From the moment we met, you’ve brought endless joy and love into my life. You are my sunshine, my rock, and my everything. 🌞💕
  </p>
  <p data-aos="fade-up" data-aos-delay="500">
    Even though we're miles apart in Kazakhstan, my heart is always with you. Distance means so little when someone means so much. 🌍❤️
  </p>
  <p data-aos="fade-up" data-aos-delay="700">
    I hope your day is filled with all the happiness, laughter, and love you deserve. You are the most incredible person I know, and I am so grateful to have you in my life. 🌹🎂✨
  </p>
  <p data-aos="fade-up" data-aos-delay="900">
    Can’t wait until we’re together again. Until then, sending you all my love and the biggest hug! 🤗💖
  </p>
  <p data-aos="fade-up" data-aos-delay="1100">
    Happy Birthday, my soul friend! 👑🎈
  </p>
  <p data-aos="fade-up" data-aos-delay="1300">
    With all my love, <strong>Satchik 💌</strong>
  </p>
</div>


            <img
              src="https://media1.tenor.com/m/Ka3CyVdTwXoAAAAC/clannad-nagisa-furukawa.gif"
              alt="Cake Cutting"
              className="cake-gif"
            />

<section className="gift-section">
  <button className="gift-button" >
   <Link to="/gift"> Click here ... 🎁</Link>
  </button>
</section>
          </section>

   

  
          {/* <div className="drag-paper-wrapper fade-in">
  <DragPaper />
</div> */}

{/* <Carousel /> */}
        </div>
      )} 

    </div>
    </>
  );
}

export default Welcome;

