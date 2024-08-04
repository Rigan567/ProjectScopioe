import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import img from "../images/1st.png";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error signing up: " + error.message);
      console.error("Error signing up: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup">
      <div className="container">
        <section>
          <h1>LOGO</h1>
          <aside>
            <h3>Sign Up To Your Account</h3>
            <p>
              Welcome! By clicking the sign up button, you agree to the Terms of
              Service and acknowledge the Privacy Policy.
            </p>
          </aside>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                placeholder="@username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="passwordContainer">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="eyeIcon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </div>

            <div className="check">
              <input type="checkbox" />
              <span>
                <Link>Accept Terms of Service</Link>
              </span>
            </div>

            <div className="btnP">
              <button type="submit">Sign up</button>
              <p>
                Already Have an Account? <Link to={"/"}>Login</Link>
              </p>
            </div>
          </form>
        </section>
        <section>
          <BlurredPhoto str1="Create Account" str2="Fill in Your Information" />
        </section>
      </div>
    </div>
  );
};

export const BlurredPhoto = ({ str1, str2 }) => {
  return (
    <main>
      <img src={img} alt="" />
      <aside>
        <article>
          <Link to={"/signup"}>{str1}</Link>
          <p>{str2}</p>
        </article>
      </aside>
      <div className="ellipse">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
};

export default Signup;
