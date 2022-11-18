import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
// import { IoMdAdd } from "react-icons/io";
const List = ({ value, fun, play, favlist, playlistpophandler, index }) => {
  // const [touch, settouch] = useState(false);
  const [istouch, setistouch] = useState(true);
  const send = (el) => {
    fun(el.trackName, el.previewUrl, el.artworkUrl100, index);
  };
  return (
    <div
      onClick={() => send(value)}
      className="flex items-center p-2  hover:bg-gray-100  transition-transform  relative"
    >
      <div className="p-1 border-2 rounded-full relative border-cyan-300 ">
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
      {value.trackName}
      <div className="absolute right-2 bottom-1/2  space-x-2 flex">
        {istouch ? (
          <BsHeart
            className=" text-gray-800  cursor-pointer"
            size={18}
            onClick={() => {
              favlist(value.previewUrl, value.trackName, value.artworkUrl100);
              setistouch(!istouch);
            }}
          />
        ) : (
          <AiFillHeart
            className=" text-gray-800  cursor-pointer"
            size={18}
            onClick={() => {
              favlist(value.previewUrl, value.trackName, value.artworkUrl100);
              setistouch(!istouch);
            }}
          />
        )}
      </div>
      <audio onClick={() => send(value)}>
        <source src={value.previewUrl} type="audio/mpeg"></source>
      </audio>
    </div>
  );
};

export default List;
