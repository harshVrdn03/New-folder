import React, { useEffect, useState } from "react";
import { GiOrange } from "react-icons/gi";
import { Link } from "react-router-dom";
import { SiAboutdotme } from "react-icons/si";
const Trending = () => {
  const [videoData, setvideoData] = useState([]);
  const [inputData, setinputData] = useState("bollywood");
  // const [metaData, setmetaData] = useState("dn");
  useEffect(() => {
    const FETCH_URL = `https://itunes.apple.com/search?term=${inputData}&entity=musicVideo&country=in&limit=15`;
    fetch(FETCH_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setvideoData(json.results);
      });
  });
  const send = (e) => {
    if (e.target.value) {
      setinputData(e.target.value);
    } else {
      setinputData("dhoom");
    }
  };

  return (
    <>
      {videoData ? (
        <div className="h-screen overflow-y-scrollroll relative">
          <div className="flex justify-center h-[7vh] z-20 space-x-4 p-2 bg-gray-100 absolute w-[100vw]">
            <GiOrange className="absolute left-4" size={30} />
            <input
              type="text"
              placeholder="Search video"
              className="border-b-2 text-black border-black bg-transparent outline-none"
              onChange={send}
            />
            <button className="bg-green-400 p-1 rounded-xl px-2">search</button>
            <Link to="/about" className="absolute right-2 hidden md:block">
              <SiAboutdotme size={30} />
            </Link>
          </div>

          <div className=" h-full pt-14 overflow-scroll  p-8">
            <span className="text-3xl   uppercase">
              <span className="lowercase text-base mr-3 ">
                search result for
              </span>
              {inputData}
            </span>
            {videoData.map((v, i) => (
              <div className="flex space-x-3 mb-3 border-b-2 pb-2 " key={i}>
                <video
                  src={v.previewUrl}
                  controls
                  poster={v.artworkUrl100}
                  className="h-34 md:h-72 "
                />
                <div className="p-5">
                  <span className="text-xl font-semibold">{v.trackName}</span>
                  <br />

                  <span className="flex-col md:flex ">
                    <span className="mr-4 ">{v.artistName}</span>
                    <span className="text-sm">{v.primaryGenreName}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span>sorry</span>
      )}
    </>
  );
};

export default Trending;
