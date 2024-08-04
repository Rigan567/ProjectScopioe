import React from "react";
import Navbar from "./Navbar";
// import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// import { toast } from "react-toastify";
import userimg from "../images/user.png";
import arr from "../images/arrdown.png";

const NavPhone = ({ navOn, setNavOn }) => {
  const user = auth.currentUser;
  return (
    <div className={`navPhone ${navOn ? "navPhoneComes" : ""}`}>
      <article>
        <div className="usernav">
          <div className="userimg">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" />
            ) : (
              <img src={userimg} alt="Default User" />
            )}
          </div>
          <div className="userdet">
            <div className="p_Arr">
              <p>{user?.displayName || "User Name"}</p>
              <img src={arr} alt="Arrow" className="downarr" />
            </div>
            <span>{user?.email || "user@example.com"}</span>
          </div>
        </div>
      </article>
      <article>
        <Navbar />
      </article>
    </div>
  );
};

export default NavPhone;
