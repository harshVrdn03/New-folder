import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Music from "./components/Music";
import Video from "./components/Video";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/video" element={<Video />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/playlist" element={<Playlist />} />
          <Route path="/favourite" element={<Favourite />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
