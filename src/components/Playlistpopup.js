import React, { useState } from "react";

const Playlistpopup = ({ value }) => {
  const [playlistData, setPlaylistData] = useState("");
  const [playlistItem, setPlaylistItem] = useState([]);
  const playlistfun = (e) => {
    setPlaylistData(e.target.value);
  };
  const set = () => {
    if (playlistData) {
      setPlaylistItem([...playlistItem, playlistData]);
      console.log(playlistItem);
    }
    setPlaylistData("");
  };
  return (
    <div className="absolute z-30 bg-white border-2 border-black w-[50%]  right-1/4 top-32 h-[70%]">
      <input
        type="text"
        className="input"
        placeholder="Playlist"
        onChange={playlistfun}
        value={playlistData}
      />
      <button onClick={set}>submit</button>
      <div>{value}</div>

      {playlistItem.map((v, id) => (
        <div className="bg-gray-100 hover:bg-gray-200 my-1 p-4" key={id}>
          {v}
        </div>
      ))}
    </div>
  );
};

export default Playlistpopup;
