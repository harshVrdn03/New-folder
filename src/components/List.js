import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import "./List.css";
const List = ({ value, fun, play, favlist, playlistpophandler, index }) => {
  // const [touch, settouch] = useState(false);
  const [istouch, setistouch] = useState(true);
  const send = (el) => {
    fun(el.trackName, el.previewUrl, el.artworkUrl100, index, true);
  };
  return (
    <div
      onClick={() => send(value)}
      className="flex items-center p-2  cardImage hover:bg-purple-500 rounded-xl hover:scale-105  space-x-4 transition-transform  relative "
    >
      <div className="p-1 border rounded-full relative border-purple-900 ">
        <img
          src={value.artworkUrl100}
          className=" rounded-full w-28 h-28  "
          alt="placeholder"
          onClick={() => send(value)}
        />
        {/* <IoMdAdd
          className="absolute top-0  right-4 bg-black text-white rounded-full cursor-pointer"
          size={20}
          onClick={() => playlistpophandler(value)}
        /> */}
      </div>
      <div className="text-white font-semibold">{value.trackName}</div>
      <div className="absolute right-2 bottom-1/2  space-x-2 flex">
        {istouch ? (
          <BsHeart
            className="   cursor-pointer text-white"
            size={18}
            onClick={() => {
              favlist(value.previewUrl, value.trackName, value.artworkUrl100);
              setistouch(!istouch);
            }}
          />
        ) : (
          <AiFillHeart
            className="   cursor-pointer text-white "
            size={18}
            onClick={() => {
              favlist(value.previewUrl, value.trackName, value.artworkUrl100);
              setistouch(!istouch);
            }}
          />
        )}
      </div>
      {/* <audio className="bg-black" onClick={() => send(value)}>
        <source src={value.previewUrl} type="audio/mpeg"></source>
      </audio> */}
    </div>
  );
};

export default List;
