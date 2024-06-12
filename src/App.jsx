"use client";
import React, { useState, useEffect } from "react";
import "./App.css";

function MainFunction() {
  return <Container />;
}

const Container = () => {
  const containerWidth = 1000;
  const containerHeight = 500;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ballsTransition, setBallsTransition] = useState("0");
  const [numberOfBalls, setNumberOfBalls] = useState(3);
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [sizeOfBalls, setSizeOfBalls] = useState(100);
  setInterval(() => {
    setSeconds(seconds);
  }, 1000);
  console.log(sizeOfBalls);

  return (
    <div className="main">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        counter={count}
        setCount={setCount}
        seconds={seconds}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Menu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setBallsTransition={setBallsTransition}
          setNumberOfBalls={setNumberOfBalls}
          setSizeOfBalls={setSizeOfBalls}
        />
        <div className="container">
          {Array.from({ length: numberOfBalls }, (_, index) => (
            <Target
              key={index}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
              transition={ballsTransition}
              handleClick={() => {
                setCount(count + 1);
              }}
              sizeOfBalls={sizeOfBalls}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = ({ isMenuOpen, setIsMenuOpen, counter, setCount, seconds }) => (
  <div
    style={{
      fontSize: "30px",
      fontStyle: "bold",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <button
      className="menuButton"
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      Menu
    </button>
    <span style={{ position: "absolute" }}>AIM THE CIRCLES</span>
    <h1 style={{ position: "absolute", top: "30px", transition: "0s" }}>
      {counter}
    </h1>
    <button
      style={{
        position: "absolute",
        top: "100px",
        border: "1px solid",
        padding: "5px",
        borderRadius: "5px",
      }}
      onClick={() => {
        setCount(0);
      }}
    >
      Reset
    </button>
  </div>
);

const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
  setBallsTransition,
  setNumberOfBalls,
  setSizeOfBalls,
}) => (
  <div
    className="menubox"
    style={{
      width: isMenuOpen ? "20%" : "0",
      transition: "0.5s",
      marginRight: "auto",
    }}
  >
    <div
      style={{
        display: isMenuOpen ? "block" : "none",
        backgroundColor: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          backgroundColor: "inherit",
        }}
      >
        <button
          className="closeMenu"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          close
        </button>
      </div>
      <div style={{ backgroundColor: "inherit" }}>
        <label
          style={{
            backgroundColor: "inherit",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Change ball transition speed:
        </label>
        <div className="ballMotionButton">
          {["0s", "0.1s", "0.25s", "0.5s", "1s", "5s"].map((time) => (
            <BallMotionChange
              key={time}
              onClick={() => setBallsTransition(time)}
            >
              {time}
            </BallMotionChange>
          ))}
        </div>

        <label
          style={{
            backgroundColor: "inherit",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Change Number of balls
        </label>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
          }}
        >
          <input
            style={{ marginTop: "15px" }}
            type="number"
            onChange={(e) => setNumberOfBalls(e.target.value)}
            placeholder="3"
          ></input>
        </span>
        <label
          style={{
            backgroundColor: "inherit",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          Change ball size
        </label>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
          }}
        >
          <input
            style={{ marginTop: "15px" }}
            type="number"
            onChange={(e) => setSizeOfBalls(e.target.value)}
            placeholder="100px"
          ></input>
        </span>
      </div>
    </div>
  </div>
);

const BallMotionChange = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const Target = ({
  containerWidth,
  containerHeight,
  transition,
  handleClick,
  sizeOfBalls,
}) => {
  const [position, setPosition] = useState(
    getRandomPosition(containerWidth, containerHeight)
  );

  return (
    <button
      className="circles"
      style={{
        marginLeft: position.x,
        marginTop: position.y,
        transition,
        width: sizeOfBalls + "px",
        height: sizeOfBalls + "px",
      }}
      onMouseDown={() => {
        setPosition(getRandomPosition(containerWidth, containerHeight));
        handleClick();
      }}
    ></button>
  );
};

function getRandomPosition(containerWidth, containerHeight) {
  const x = Math.floor(Math.random() * (containerWidth - 75));
  const y = Math.floor(Math.random() * (containerHeight - 75));
  return { x, y };
}

export default MainFunction;
