import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* TODO: Add more links as needed here */}
      <Link to="/terms" className="footer-link">
        Terms of Service
      </Link>
      <Link to="/privacy" className="footer-link">
        Privacy Policy
      </Link>
    </footer>
  );
};

export default Footer;
