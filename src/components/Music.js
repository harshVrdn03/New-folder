import React, { useState, useEffect } from "react";
import { GiOrange } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import { AiFillForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import List from "./List";
import Playlistpopup from "./Playlistpopup";
const Music = () => {
  const getlocalitems = () => {
    const data = localStorage.getItem("favlist");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [data, setdata] = useState([]);
  const [currentName, setcurrentName] = useState("");
  const [currenturl, setcurrenturl] = useState("");
  const [currentImage, setcurrentImage] = useState("");
  const [input, setinput] = useState("bollywood");
  const [isplaying, setisplaying] = useState(false);
  const [favouriteList, setfavouritelist] = useState(getlocalitems());
  const [playlistpop, setplaylistpop] = useState(false);
  const [index, setindex] = useState();

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

  const playlistpophandler = () => {
    setplaylistpop(!playlistpop);
  };
  const feed = () => {
    const a = document.getElementById("myaudio");
    console.log(isplaying);
    !isplaying ? a.pause() : a.play();
    setisplaying(!isplaying);
  };
  const dataFetch = (name, url, img, ind) => {
    setcurrentName(name);
    setcurrenturl(url);
    setcurrentImage(img);
    setindex(ind);
    feed();
  };
  const favlst = (url, trck, artwrk) => {
    setfavouritelist([...favouriteList, { url, trck, artwrk }]);
    // console.log(favouriteList);
  };

  useEffect(() => {
    localStorage.setItem("favlist", JSON.stringify(favouriteList));
  }, [favouriteList]);

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
        <div className=" bg-gray-100 absolute top-0 w-full flex justify-center p-4  z-10 space-x-4 items-center">
          <GiOrange className="absolute z-20 left-5" size={30} />
          <span className="">Search</span>
          <input
            type="text"
            className=" outline-none bg-transparent border-b-2 border-green-300"
            placeholder="Search..."
            onChange={srch}
          />
          <Link to="/about" className="absolute right-4">
            <BsFillHeartFill size={30} />
          </Link>
        </div>
        {/* {playlistpop === true ? (
          <Playlistpopup value={currentName} />
        ) : (
          <div className="hidden">""</div>
        )} */}
        <div className="overflow-scroll h-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   pt-14">
          {data.map(
            (
              el,
              id // console.log(el.artistId);
            ) => (
              <List
                value={el}
                key={id}
                fun={dataFetch}
                play={isplaying}
                favlist={favlst}
                index={id}
                playlistpophandler={playlistpophandler}
              />
            )
          )}
        </div>
        {currentImage ? (
          <div className="h-[70px] bg-white  w-full   absolute bottom-0  flex  md:space-x-16 justify-center items-center">
            <div className="md:flex hidden  items-center  uppercase font-mono  text-xl md:text-xl">
              <div>
                <img
                  src={data[index].artworkUrl100}
                  className={`hidden md:flex rounded-full w-10 h-10 ${
                    !isplaying ? "animate-spin" : ""
                  }  `}
                  alt="placeholder"
                />
              </div>
              <div className="">{data[index].trackName}</div>
            </div>
            <div className="flex-col  md:flex-row items-center">
              <div className="flex md:hidden justify-between  w-[70%] mx-auto md:space-x-4">
                <AiFillBackward size={25} onClick={() => setindex(index - 1)} />
                <AiFillForward size={25} onClick={() => setindex(index + 1)} />
              </div>
              <audio
                id="myaudio"
                src={data[index].previewUrl}
                autoPlay
                controls
              />
              <div className="md:flex hidden justify-between  w-[70%] mx-auto md:space-x-4">
                <AiFillBackward
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setindex(index - 1)}
                />
                <AiFillForward
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setindex(index + 1)}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className=" bg-white  w-full  absolute bottom-0  flex  space-x-16 justify-center items-center"></p>
        )}
      </div>
    </>
  );
};

export default Music;
