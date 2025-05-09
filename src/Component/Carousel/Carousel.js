import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import Profile1 from '../../assets/Images/Profile_3.jpeg';
import Profile2 from '../../assets/Images/Profile_4.jpeg';
import Profile3 from '../../assets/Images/Profile 1.png';
import Profile4 from '../../assets/Images/Profile_2.png';
import Profile5 from '../../assets/Images/Profile_6.jpeg';
import Profile05 from '../../assets/Images/Profile_7.jpeg';
import Profile7 from '../../assets/Images/Profile_8.jpeg';
 import Profile8 from '../../assets/Images/Profile_8.jpeg'
 import Profile6 from '../../assets/Images/Profile_9.jpeg';
 import Profile10 from '../../assets/Images/Profile_10.jpeg';
import DragPaper from "../Drag/Drag_Paper";

const images = [
  { title: "Hi Dos 👋", num: "01", src: Profile2 },
  { title: "I want to tell you Something 😍", num: "02", src: Profile7 },
  { title: "Do you know about you?. 😊", num: "03", src: Profile1 },
  { title: "You are Amazing 🤩", num: "04", src: Profile3 },
  { title: "Most Beautiful Person on Earth 💯", num: "05", src: Profile4 },
  { title: "And Cutest 🎀", num: "06", src: Profile5 },
  { title: "And She's kind, caring, and full of love 😗", num: "07", src: Profile05 },
  { title: "I feel very Lucky for your Friendship 😇", num: "08", src:Profile10},
  { title: "And Once Again Thank you sos so much🥰", num: "09", src: Profile6 },
  { title: "Sathish ❤️", num: "10", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq1SN4f7P_zvS_La3J13mpwCkweLB8KjJ0Wg&s" },
  { title: "Always be Happy ❤️", num: "11", src: "https://iili.io/2C06Dsj.jpg" }
];

const Carousel = () => {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const cursorRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (images.length - 1));
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 2000); // 3 seconds interval

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Update active image index based on progress
  useEffect(() => {
    setActiveIndex(Math.floor((progress / 100) * (images.length - 1)));
  }, [progress]);

  // Mouse and wheel interactions
  useEffect(() => {
    const handleWheel = (e) => {
      setProgress((prev) => Math.max(0, Math.min(prev + e.deltaY * 0.02, 100)));
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      if (!isDown) return;
      setStartX(e.clientX);
      setProgress((prev) => Math.max(0, Math.min(prev + (e.clientX - startX) * -0.1, 100)));
    };

    const handleMouseDown = (e) => {
      setIsDown(true);
      setStartX(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [startX, isDown]);

  return (
    <div className="carousel">
      {images.map((img, index) => (
        <div
          key={index}
          className="carousel-item"
          style={{
            zIndex: images.length - Math.abs(activeIndex - index),
            transform: `translate(${(index - activeIndex) * 800}%, ${(index - activeIndex) * 200}%) rotate(${(index - activeIndex) * 120}deg)`
          }}
          onClick={() => setProgress((index / (images.length - 1)) * 100)}
        >
          <div className="carousel-box">
            <div className="title">{img.title}</div>
            <div className="num">{img.num}</div>
            <img src={img.src} alt={`Slide ${img.num}`} />
          </div>
        </div>
      ))}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor cursor2"></div>
  
    </div>
  );
};

export default Carousel;
