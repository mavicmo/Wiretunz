import React from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import NavBar from "../../components/NavBar/Navbar";
// import "./Home.css";

function Home(props) {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <div className="search">
          <input type="text" placeholder="Search Song" id="search" />
        </div>

        <div className="welcome">
          <h1>Welcome message here</h1>
        </div>

        <div className="buttons">
          <Link to="#">
            <button className="home-button">
              <FiIcons.FiMusic /> Add Song
            </button>
          </Link>
          <Link to="#">
            <button className="home-button">
              <MdIcons.MdOutlinePlaylistAdd /> Add Playlist
            </button>
          </Link>
        </div>

        <div className="search-result"></div>
      </main>
    </>
  );
}

export default Home;
