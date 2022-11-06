import React, { useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
// import Playlist from "./Playlist";
import { MdDelete } from "react-icons/md";
const About = () => {
  const [song, setsong] = useState(JSON.parse(localStorage.getItem("favlist")));
  const [isplaying, setisplaying] = useState(false);
  const [link, setLink] = useState("");
  const data = JSON.parse(localStorage.getItem("favlist"));
  const del = (e) => {
    const updatedItems = data.filter((ele, id) => {
      return ele.url !== e;
    });
    localStorage.setItem("favlist", JSON.stringify(updatedItems));
    const a = document.getElementById("myaudio");
    a.pause();
    setsong(updatedItems);
  };
  const seturl = (e) => {
    const a = document.getElementById("myaudio");
    !isplaying ? a.pause() : a.play();
    setisplaying(!isplaying);
    setLink(e);
  };
  return (
    <div className=" pl-4 flex flex-col  h-screen space-y-2 mb-28">
      <span className="text-center">Favourite</span>
      {data.map((value, id) => (
        <div
          key={id}
          className="flex items-center space-x-8  hover:bg-gray-200 justify-between "
          onClick={() => seturl(value.url)}
        >
          <div className="flex space-x-4 items-center">
            <img src={value.artwrk} />
            <span>{value.trck}</span>
          </div>
          <div className="bg-red-800 rounded-full text-white hover:scale-125 absolute right-5 p-2">
            <MdDelete
              size={15}
              onClick={() => {
                del(value.url);
              }}
            />
          </div>
        </div>
      ))}

      <div className="h-[100px] md:h-[70px] bg-white  w-full  fixed  bottom-0  md:bottom-0  flex  space-x-16 justify-center items-center">
        <audio id="myaudio" src={link} autoPlay controls />
      </div>
    </div>
  );
};

export default About;
