import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {  signOut } from "firebase/auth";
import {auth} from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log("Error: ", error)
    });
  }

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/recipes" className="navbar-link">
          Recipes
        </Link>
        { user != null &&
            <Link to="/editRecipes" className="navbar-link">
              Edit Recipes
            </Link>
        }
      </div>
      <div className="navbar-right">
        { user == null &&
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        }
        { user != null ?
          <Link onClick={handleLogout} to="/" className="navbar-link">
            Logout
          </Link> :
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
