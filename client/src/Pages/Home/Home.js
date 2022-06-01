import React from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import NavBar from "../../components/NavBar/Navbar";

function Home(props) {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <div className="search">
          <input type="text" placeholder="Search Song" id="search" />
        </div>
        <div className="buttons">
          <Link to="#">
            <button className="add-song">
              <FiIcons.FiMusic /> Add Song
            </button>
          </Link>
          <Link to="#">
            <button className="add-playlist">
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
