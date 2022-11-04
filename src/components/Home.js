import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Home = () => {
  return (
    <div className="background h-screen text-center  w-100 flex flex-col justify-center">
      <h1 className="font-semibold text-white bg-black bg-opacity-40 text-5xl md:text-7xl lg:text-9xl">
        VIDSIC
      </h1>
      <p>Baar Baar Dekho - Hazaar Baar Dekho </p>

      <div className=" font-extrabold uppercase  mt-5 flex  flex-col w-1/5 space-y-3 mx-auto">
        <Link
          to="/music"
          className="border-2 p-2 border-white border-double  rounded-md bg-black text-white"
        >
          music
        </Link>
        <Link
          to="/video"
          className="border-2 p-2 border-white rounded-md  bg-black border-double  text-white"
        >
          video
        </Link>
      </div>
    </div>
  );
};

export default Home;
