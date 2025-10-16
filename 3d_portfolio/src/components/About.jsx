import React from "react";
import { Element } from "react-scroll";
import { motion, useScroll, useInView, transform } from "framer-motion";
import { skills } from "../constants";
import { useRef } from "react";
import SoftSkills from "./SoftSkills";
import Links from "./Links"
import Education from "./Education"
import Skills from "./Skills";

import OtherSkills from "./OtherSkills";
import LanguagesKnown from "./Language";

import {
  containerVariants,
  parentVariants,
  childVariants,
  opacityVariant,
} from "../constants/variants";

const About = () => {
  const skillsRef = useRef();
  const techRef = useRef();
  const softRef = useRef();

  const isInView = useInView(skillsRef, { once: false, amount: 0.2 });
  const isTechInView = useInView(techRef, { once: false, amount: 0.2 });

  return (
    <Element name="about" className="about-section">
      <section className="w-screen  min-h-screen py-20  flex justify-center items-center bg-black">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{
            backgroundSize: "200% 100%",
          }}
          className="main relative top-[5%] bg-gradient-to-r from-black via-neutral-900 to-black w-[90%] min-h-fit flex flex-col gap-10 sm:gap-6 justify-around p-8 rounded-md shadow-[0_0_20px_5px_rgba(255,255,255,1)] items-center"
        >
          <div className="w-full h-full  up flex  items-center flex-col lg:flex-row  gap-10 lg:justify-around ">
            
            <div className="w-full  overview flex flex-col sm:text-5xl text-3xl gap-4  text-white p-4  h-[90%] rounded-3xl bg-transparent ">
              <h2 className="text-center font-mono  ">
                <span className="hover:[text-shadow:_0_0_50px_#ffffff]">
                  Over
                  <span className="text-emerald-500 font-extrabold">view</span>
                </span>
              </h2>

              <p className="w-full  text-sm lg:text-2xl  font-mono p-2">
                "Passionate about technology and driven by curiosity, I love
                building solutions that blend creativity with code. Always eager
                to learn, explore, and grow in the ever-evolving tech
                landscape."
              </p>
              <Education />
              </div>
          </div>
          <div className="skills w-full min-h-screen flex flex-col gap-4  ">
            <h2 className="heading text-white p-4 text-center text-xl sm:text-5xl [text-shadow:_0_0_50px_#ffffff]">
              My skills
            </h2>
            <motion.div
              ref={techRef}
              variants={opacityVariant}
              initial="hidden"
              animate={isTechInView ? "visible" : "hidden"}
              className="text-white text-xl sm:text-4xl  "
            >
              Technical Skills
            </motion.div>
            <hr />
           {/* <motion.div
              variants={parentVariants}
              animate={isInView ? "visible" : "hidden"}
              ref={skillsRef}
              className="logos p-4 flex  justify-center  flex-wrap gap-6 sm:gap-10 bg-transparent w-full"
            >
   {/* {skills.map((ele, id) => (
                <motion.div
                  key={id}
                  variants={childVariants}
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 1.3,
                    transition: { duration: 0.2 },
                  }}
                  className=" flex justify-center rounded-xl items-center  hover:shadow-[0_0_20px_5px_rgba(255,255,255,1)] bg-transparent"
                >
                  <img
                    className="bg-transparent w-10"
                    src={`/assets/${ele.name}.svg`}
                  />
                </motion.div>
              ))} */}
            {/* </motion.div> */} 
              <Skills/>
            <hr />
            <SoftSkills />
            <LanguagesKnown/>
            <OtherSkills/>
          </div>
          <div className="w-full h-full">
            <Links/>
          </div>
        </motion.div>
      </section>
    </Element>
  )
};


export default About;
