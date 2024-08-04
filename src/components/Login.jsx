import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebase";
import img from "../images/1st.png";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user data exists in local storage
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      navigate("/home");
    } catch (error) {
      toast.error("Invalid Login Credentials ..Please Try Again");
      console.error("Error logging in with email: ", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Facebook: ", error);
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending password reset email: " + error.message);
      console.error("Error sending password reset email: ", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <section>
          <h1>LOGO</h1>
          <aside>
            <h3>Log In To Your Account</h3>
            <p>Welcome Back! Select a method to log in:</p>
          </aside>

          <article className="socialSites">
            <div className="btns">
              <button onClick={handleGoogleLogin}>
                <FcGoogle /> Google
              </button>
              <button onClick={handleFacebookLogin}>
                <FaFacebookF /> Facebook
              </button>
            </div>
            <div className="contEmail">
              <div></div>
              <div className="emailLink">
                <p>Or Continue with Email</p>
              </div>
              <div></div>
            </div>
          </article>

          <form onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="passwordContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="eyeIcon" onClick={togglePasswordVisibility}>
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </div>

            <div className="remforPass">
              <div className="rememberPass">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span>Remember me</span>
              </div>
              <div>
                <Link onClick={handleForgetPassword}>Forget password?</Link>
              </div>
            </div>

            <div className="btnP">
              <button type="submit">Sign In</button>
              <p>
                Don't Have an Account?{" "}
                <Link to={"/signup"}> Create Account</Link>
              </p>
            </div>
          </form>
        </section>
        <section>
          <main>
            <img src={img} alt="" />
            <aside>
              <article>
                <p>
                  <Link to={"/"}>Sign In</Link> to view all the massage
                  therapists
                </p>
              </article>
            </aside>
            <div className="ellipse">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default Login;
