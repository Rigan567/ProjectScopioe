import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userimg from "../images/user.png";
import arr from "../images/arrdown.png";
import bell from "../images/bell.png";
import out from "../images/logout.png";
import shades from "../images/shades.png";
import sample from "../images/sample.png";
import fp from "../images/1stPerson.png";
import sp from "../images/2ndPerson.png";
import tp from "../images/3rdPerson.png";
import fop from "../images/4thPerson.png";
import gps from "../images/gps.png";
import car from "../images/car.png";
import leftarrow from "../images/left.png";
import rightarrow from "../images/right.png";
import tp1 from "../images/testiPerson1.png";
import tp2 from "../images/testiPerson2.png";
import data from "../assets/data.json";
import Navbar from "./Navbar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <div className="home">
      <section>
        <Navbar />
      </section>

      <section>
        <div className="topBar">
          <div className="user">
            <div className="userimg">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" />
              ) : (
                <img src={userimg} alt="Default User" /> // replace with your default user image path
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
          <aside>
            <div className="notibell">
              <img src={bell} alt="Notification Bell" />
            </div>
            <div className="logout">
              <p>Log Out</p>
              <div>
                <img src={out} alt="Logout" onClick={handleLogout} />
              </div>
            </div>
          </aside>
        </div>

        <div className="homeContainer">
          <article className="startDiv">
            <div className="divContent">
              <aside>
                <h4>I'm Looking for Massage Therapist Near...</h4>
                <p>
                  In using this site, I agree to be bound by the{" "}
                  <Link>Terms of Service</Link> and
                  <Link> Privacy Policy</Link>
                </p>
                <div className="inpBtn">
                  <input type="text" placeholder="ZIP code or city name" />
                  <button>GO</button>
                </div>
              </aside>
            </div>
            <article>
              <img src={shades} alt="" className="shades" />
              <img src={sample} alt="" className="sample" />
            </article>
          </article>
          <article className="middleDiv">
            <div className="leftarr">
              <img src={leftarrow} alt="" />
            </div>
            <div className="cards_row">
              <Card
                img={fp}
                name={"Alexander Cort"}
                address={"123 Elm Street, New York"}
                workplace={"Mobile & In-Studio"}
              />
              <Card
                img={sp}
                name={"Michael Smith"}
                address={"789 Maple Drive, NY"}
                workplace={"Mobile & In-Studio"}
              />
              <Card
                img={tp}
                name={"David Martinez"}
                address={"Pine Street, San Fran"}
                workplace={"Mobile & In-Studio"}
              />
              <Card
                img={fop}
                name={"Jennifer Lee"}
                address={"567 Cedar Lane, Miami"}
                workplace={"Mobile & In-Studio"}
              />
            </div>
            <div className="rightarr">
              <img src={rightarrow} alt="" />
            </div>
          </article>
          <article className="lastDiv">
            <section>
              <TestimonialCard img={tp1} />
              <TestimonialCard img={tp2} />
              <div className="ellipse">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </section>
            <section>
              {data.cities.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.name},{item.state}
                  </p>
                </div>
              ))}
            </section>
          </article>
        </div>
      </section>
    </div>
  );
};

const Card = ({ img, name, address, workplace }) => {
  return (
    <main className="card">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <aside>
        <p>{name}</p>
        <div className="infos">
          <span>
            <img src={gps} alt="" />
            {address}
          </span>
          <span>
            <img src={car} alt="" />
            {workplace}
          </span>
        </div>
      </aside>
      <button>See Details</button>
    </main>
  );
};

const TestimonialCard = ({ img }) => {
  return (
    <div className="testimonialCard">
      <main>
        <img src={img} alt="" />
      </main>
      <aside>
        <div className="spanhead">
          <span>
            <img src={gps} alt="" />
            123 Elm Street, New York
          </span>
          <h4>
            Healing Bodywork <Link>by Cort</Link>
          </h4>
        </div>

        <p>
          Cort’s healing bodywork massage was absolutely transformative. Their
          intuitive touch and deep understanding of...
          <Link>Read More</Link>
        </p>
      </aside>
    </div>
  );
};

export default Home;
