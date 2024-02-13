import React from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import "./homepage.css";
// import { useRef } from "react";
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"


const HomePage = () => {

    const container = useRef();


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline()
            t1.from("#intro-slider", {
                xPercent: "-100",
                duration: 1.3,
                delay: 0.3,
            })
                .from(["#title-1", "#title-2", "#title-3"], {
                    opacity: 0,
                    y: "+=30",
                    stagger: 0.5,
                })
                .to(["#title-1", "#title-2", "#title-3"], {
                    opacity: 0,
                    y: "-=30",
                    delay: 0.3,
                    stagger: 0.5,
                })
                .to("#intro-slider", {
                    xPercent: "-100",
                    duration: 1.3,
                })
                .from("#welcome", {
                    opacity: 0,
                    duration: 0.5,
                })
        }, container)

        return () => ctx.revert()
    }, [])

  return (
      <div className={"MainHome"}>

        <PageTemplate>

            <div className="relative" ref={container}>
                <div id="intro-slider"  className="TextSlider">
                    <h1 className="text-9xl" id="title-3">
                        Flavor Fusion
                    </h1>
                    <h1 className="text-9xl" id="title-3" >
                        Culinary Confessions
                    </h1>
                    <h1 className="text-9xl" id="title-3">
                        Unleash Your Inner Chef!
                    </h1>
                </div>
                <div className={"RecipeBook"}>
                    <div className="h-screen flex " >
                        <h1 id="recipebook" className="text-9xl">
                            Recipe Book
                        </h1>

                    </div>
                </div>
            </div>

        </PageTemplate>
      </div>
  );
};

export default HomePage;
