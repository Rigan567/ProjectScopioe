import React from "react";
import { Link } from "react-router-dom";
import hm from "../images/home.png";
import list from "../images/listing.png";
import search from "../images/search.png";
import about from "../images/about.png";
import fav from "../images/fav.png";
import help from "../images/help.png";
import sett from "../images/settings.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <main>
        <Link>
          <img src={hm} alt="" />
          Home
        </Link>
        <Link>
          <img src={list} alt="" />
          New Listing
        </Link>
        <Link>
          <img src={search} alt="" />
          Search
        </Link>
        <Link>
          <img src={about} alt="" />
          About
        </Link>
        <Link>
          <img src={fav} alt="" />
          Favourites
        </Link>
        <div></div>
        <Link>
          <img src={help} alt="" />
          Help Center
        </Link>
        <Link>
          <img src={sett} alt="" />
          Settings
        </Link>
      </main>
    </div>
  );
};

export default Navbar;
