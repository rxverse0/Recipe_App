import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PageTemplate.css";

const PageTemplate = ({ children }) => {
  return (
    <div className="page-template">
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
