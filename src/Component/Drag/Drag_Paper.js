import React, { useEffect } from 'react';
 import './Drag_Paper.css';

let highestZ = 1;

class PaperLogic {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      if (this.rotating) this.rotation = degrees;

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    this.paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      this.paper.style.zIndex = highestZ++;
      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Prevent right-click menu
    this.paper.addEventListener('contextmenu', (e) => e.preventDefault());
  }
}

const DragPaper = () => {
  useEffect(() => {
    const paperElements = document.querySelectorAll('.paper');
    paperElements.forEach((el) => new PaperLogic(el));
  }, []);

  return (
    <>
      <div className="drag-container">
        <div className="paper image">
        <div className="paper heart">
       
        <img src="https://iili.io/HSzXpzg.jpg" width={50} height={50} />
          </div>

        </div>
  
 
  
        <div className="paper image">
          <p> and I fallen in</p>
          <p>Love with You 😍 </p>
          <img src="https://iili.io/HSzXpzg.jpg" width={50} height={50} />
        </div>
  
        <div className="paper image">
          <p> and I fallen in</p>
          <p>Love with You 😍 </p>
          <img src="https://iili.io/HSzXbmF.jpg" width={50} height={50} />
        </div>
  
        <div className="paper image">
          <p>How can be </p>
          <p> someone so cute ❤️ </p>
        </div>
  
        <div className="paper red">
          <p className="p1"> and My Favorite</p>
          <p className="p2">Person 😍</p>
        </div>
  
        <div className="paper">
          <p className="p1">My WhatApp No. </p>
          <p className="p1">
            +91 75849689512 <span style={{ color: 'red' }}>❤️</span>
          </p>
        </div>
  
        <div className="paper">
          <p className="p1">Heyyyy!❤️ </p>
          <p className="p1">
            Call Me <span style={{ color: 'red' }}>❤️</span>
          </p>
        </div>
  
        <div className="paper">
          <p className="p1">Drag the papers to move!</p>
        </div>
      </div>

    </>
  );
  
};

export default DragPaper;
