import React from "react";
import "./about.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="text-center flex flex-col h-screen justify-center space-y-5 bga">
      <p className="text-3xl md:text-5xl lg:text-9xl font-semibold ">Welcome</p>
      <p className="text-xl md:text-3xl lg:text-5xl">MausamB studio</p>
      <p className="text-lg md:text-xl lg:text-xl">Manage by Harsh Vardhan</p>
      <div className="flex flex-col w-[90px] mx-auto space-y-4">
        <Link to="/video" className="p-2 border-4 border-black rounded-xl">
          Video
        </Link>
        <Link to="/music" className="p-2 border-4 border-black rounded-xl">
          Music
        </Link>
      </div>
    </div>
  );
};

export default About;
