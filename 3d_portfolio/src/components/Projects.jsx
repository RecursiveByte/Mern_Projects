import React from "react";
import { Link, Element } from "react-scroll";
import { project } from "../constants/dataInArrays";
import { motion, useInView } from "framer-motion";
import {
  containerVariants,
  moveAtPlaceVariant,
  xVariant,
  xVariantSmall,
} from "../constants/variants";
import { useRef } from "react";

const Projects = () => {
  const headRef = useRef(null);
  const isInView = useInView(headRef, { once: false, amount: 0 });

  return (
    <Element name="work">
      <section className="min-h-screen py-10 w-screen">
      <div className="projects flex items-center min-h-screen min-w-screen justify-center ">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="main w-[90%] relative flex rounded-xl shadow-[0_0_20px_5px_rgba(255,255,255,1)]  flex-col gap-4 p-4 h-[90%] "
        >
          <motion.h1
            ref={headRef}   
            variants={xVariantSmall}
            animate={isInView ? "visible" : "hidden"}
            className="text-white [text-shadow:_0_0_50px_#ffffff] text-3xl font-bold text-center p-4"
          >
            My Projects
          </motion.h1>
          <div className="flex-col  gap-4  w-full md:flex-row p-4 flex flex-wrap  justify-around items-center">
            {project.map((ele, id) => (
              <motion.div
                variants={moveAtPlaceVariant}
                initial="hidden"
                animate="visible"
                whileHover={{scale:1.1}}
                whileTap={{scale:1.1}}
                key={id}
                className=" space-y-3 rounded-lg  shadow-[0_0_20px_3px_rgba(255,255,255,1)] w-full  px-4 py-16 lg:w-[30%] h-auto text-white"
              >
                <div
                  style={{
                    backgroundImage: `url(${ele.projectImageUrl})`,
                    backgroundPosition: "center",
                  }}
                  className="aspect-[4/2] bg-cover "
                />
                <h3 className=" font-bold text-3xl">{ele.projectName}</h3>
                <div className="text">{ele.projectDesc}</div>
                <div className="link flex rounded-xl p-2 bg-neutral-700 items-center px-2 gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-red-500 bg-white"></span>
                  <a href={ele.projectLink}>click here to visit the website</a>
                </div>
                <div className="githublink bg-neutral-800 p-2  rounded-xl flex justify-normal w-full gap-2">
                  <div
                    className="bg-cover w-6 h-6 aspect-[4/4] "
                    style={{ backgroundImage: "url(/assets/githubsmall.svg)" }}
                  ></div>
                  <div className="flex w-full ">
                    <a href={ele.projectGithubLink}>
                      click here for codes
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </section>
    </Element>
  );
};

export default Projects;
