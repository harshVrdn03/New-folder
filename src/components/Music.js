import React, { useState, useEffect } from "react";
import { GiOrange } from "react-icons/gi";
import { AiFillForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Music.css";

import List from "./List";
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
  // const [currentName, setcurrentName] = useState("");
  // const [currenturl, setcurrenturl] = useState("");
  // const [currentImage, setcurrentImage] = useState("");
  const [input, setinput] = useState("bollywood");
  const [isplaying, setisplaying] = useState(false);
  const [favouriteList, setfavouritelist] = useState(getlocalitems());
  const [playlistpop, setplaylistpop] = useState(false);
  const [index, setindex] = useState();
  const [show, setshow] = useState();
  useEffect(() => {
    const FETCH_URL = `https://itunes.apple.com/search?term=${input}&media=music&limit=40&country=in`;
    fetch(FETCH_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setdata(json.results);
      });
  }, [input]);

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
    // setcurrentName(name);
    // setcurrenturl(url);
    // setcurrentImage(img);
    setindex(ind);
    setshow(true);
    feed();
  };
  const favlst = (url, trck, artwrk) => {
    setfavouritelist([...favouriteList, { url, trck, artwrk }]);
  };

  useEffect(() => {
    localStorage.setItem("favlist", JSON.stringify(favouriteList));
  }, [favouriteList]);

  const srch = (e) => {
    if (e.target.value) {
      setshow(false);
      setinput(e.target.value);
    } else {
      setshow(false);
      setinput("bollywood");
    }
    console.log(e.target.value);
  };
  return (
    <>
      <div className="relative backgroundImage h-screen">
        <div className="  absolute top-0 w-full flex justify-center p-4 z-10 space-x-4 items-center">
          <GiOrange className="absolute z-20 left-5" size={30} />
          <span className="text-white">Search</span>
          <input
            type="text"
            className=" outline-none bg-transparent border-b-2 border-black text-white placeholder:text-white"
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
        {show ? (
          <div className="h-[70px] bg-black fixed w-full    bottom-0  flex  md:space-x-16 justify-center items-center">
            <div className="md:flex hidden  items-center  uppercase font-mono  text-xl md:text-xl p-12">
              <div>
                {/* <img
                  src={data[index].artworkUrl100}
                  className={`hidden md:flex rounded-full w-10 h-10 ${
                    !isplaying ? "animate-spin" : ""
                  }  `}
                  alt="placeholder"
                /> */}
              </div>
              <div className="text-white">{data[index].trackName}</div>
            </div>
            <div className="flex  md:flex-row items-center text-white md:w-[65%] p-12">
              <div className="flex md:hidden  space-x-4   w-[70%] mx-auto md:space-x-2 ">
                <AiFillBackward size={25} onClick={() => setindex(index - 1)} />
                <AiFillForward size={25} onClick={() => setindex(index + 1)} />
              </div>
              <audio
                id="myaudio"
                src={data[index].previewUrl}
                autoPlay
                controls
              />
              <div className="md:flex hidden   w-[70%] mx-auto md:space-x-2">
                <AiFillBackward
                  className="cursor-pointer  text-white hover:bg-slate-200 hover:text-black border-50%"
                  size={25}
                  onClick={() => {
                    if (index > 0) setindex(index - 1);
                  }}
                />
                <AiFillForward
                  className="cursor-pointer text-white hover:bg-slate-200 hover:text-black border-50%"
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
