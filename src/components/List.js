import React, { useState } from "react";

const List = ({ value, fun, play }) => {
  const [touch, settouch] = useState(false);
  const send = (el) => {
    fun(el.trackName, el.previewUrl, el.artworkUrl100);
    settouch(!touch);
    console.log(touch);
  };
  return (
    <div onClick={() => send(value)} className="flex items-center p-2">
      <div className="p-1 border-2 rounded-full border-cyan-300 ">
        <img
          src={value.artworkUrl100}
          className=" rounded-full w-28 h-28 "
          alt="placeholder"
          onClick={() => send(value)}
        />
      </div>
      {value.trackName}
      <audio onClick={() => send(value)}>
        <source src={value.previewUrl} type="audio/mpeg"></source>
      </audio>
    </div>
  );
};

export default List;
