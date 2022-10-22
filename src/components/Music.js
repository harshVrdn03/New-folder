import React, { useState, useEffect } from "react";
import { GiOrange } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import { Link } from "react-router-dom";

import List from "./List";
const Music = () => {
  const [data, setdata] = useState([]);
  const [currentName, setcurrentName] = useState("");
  const [currenturl, setcurrenturl] = useState("");
  const [currentImage, setcurrentImage] = useState("");
  const [input, setinput] = useState("bollywood");
  const [isplaying, setisplaying] = useState(false);

  useEffect(() => {
    const FETCH_URL = `https://itunes.apple.com/search?term=${input}&media=music&limit=70&country=in`;
    fetch(FETCH_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setdata(json.results);
      });
  });

  const feed = () => {
    const a = document.getElementById("myaudio");
    console.log(isplaying);
    !isplaying ? a.pause() : a.play();
    setisplaying(!isplaying);
  };
  const dataFetch = (name, url, img) => {
    setcurrentName(name);
    setcurrenturl(url);
    setcurrentImage(img);
    feed();
  };

  const srch = (e) => {
    if (e.target.value) {
      setinput(e.target.value);
    } else {
      setinput("bollywood");
    }
    console.log(e.target.value);
  };
  return (
    <>
      <div className="relative h-screen">
        <div className=" bg-gray-100 absolute top-0 w-full flex justify-center p-4 space-x-4 items-center">
          <GiOrange className="absolute z-20 left-5" size={30} />
          <span className="">Search</span>
          <input
            type="text"
            className=" outline-none bg-transparent border-b-2 border-green-300"
            placeholder="Search..."
            onChange={srch}
          />
          <Link to="/about" className="absolute right-4">
            <SiAboutdotme size={30} />
          </Link>
        </div>
        <div className="overflow-scroll h-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   pt-14">
          {data.map(
            (
              el,
              id // console.log(el.artistId);
            ) => (
              <List value={el} key={id} fun={dataFetch} play={isplaying} />
            )
          )}
        </div>
        {currentImage ? (
          <div className="h-[100px] md:h-[70px] bg-white  w-full  fixed  bottom-0  md:bottom-0  flex  space-x-16 justify-center items-center">
            <div>
              <img
                src={currentImage}
                className={` rounded-full w-24 md:w-10 h-10  ${
                  !isplaying ? "animate-spin" : ""
                }  `}
                alt="placeholder"
              />
            </div>
            <div>{currentName}</div>
            <audio id="myaudio" src={currenturl} autoPlay controls />
          </div>
        ) : (
          <p className=" bg-white  w-full  absolute bottom-0  flex  space-x-16 justify-center items-center"></p>
        )}
      </div>
    </>
  );
};

export default Music;
