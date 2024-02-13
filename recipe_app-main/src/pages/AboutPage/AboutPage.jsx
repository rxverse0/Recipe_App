import React from "react";
import PageTemplate from "../../pages/PageTemplate/PageTemplate";
import "./aboutpage.css"
import { Carousel } from "../../components/Carussel/Carousel";
import {slides} from "../../Data/constData";

const AboutPage = () => {
  return (
      <div className={"MainAboutUs"}>
          <PageTemplate>
              <div className={"AboutRatatui"} >
                  <br/>
                  <h1>About Us</h1>
                  <Carousel data={slides} />
                  <p>
                      LOOKING FOR THE LATEST CULINARY TRENDS OR SEASONAL INSPIRATIONS? <br/>OUR BLOG KEEPS YOU UPDATED ON THE HOTTEST INGREDIENTS, INNOVATIVE COOKING METHODS, AND THE MOST MOUTHWATERING FOOD TRENDS.                  </p>

              </div>
          </PageTemplate>
      </div>
  );
};

export default AboutPage;
