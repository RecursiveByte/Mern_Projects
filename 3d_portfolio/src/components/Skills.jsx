import React from "react";
import { skills } from "../constants";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <div className="skillsContainer w-full  flex xl:flex-row lg:flex-wrap  gap-4 flex-col  justify-between">
      <motion.div 
      className="programmingLanguagesContainer  w-full xl:w-[22%]  rounded-xl  bg-transparent border-2 p-2">
        <h3 className="   text-4xl text-white">Programming Languages</h3>
        <div className="programmingLang flex flex-col mt-2 gap-5 p-2">
          {skills.programmingLanguages.map((ele, id) => {
            return (
              <div key={id} className="  w-[80%] gap-2 flex flex-row  ">
                <img
                  className="logo w-10"
                  alt={ele.name}
                  src={`/assets/${ele.name}.svg`}
                ></img>
                <p className="text-center text-3xl  text-white">{ele.name}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="Frontend w-full xl:w-[22%]  border-2  rounded-xl bg-blue   bg-transparent p-2">
        <h3 className="text-4xl text-white">Frontend</h3>
        <div className="frontend flex flex-col gap-2 py-2 mt-1">
          {skills.development.frontend.map((ele, id) => {
            return (
              <div key={id} className=" gap-2 flex flex-row  ">
                <img
                  className="logo w-10"
                  alt={ele.name}
                  src={`/assets/${ele.name}.svg`}
                ></img>
                <p className="text-left text-3xl  text-white">{ele.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Backend w-full xl:w-[22%]  rounded-xl border-2 p-2  ">
        <h3 className="text-4xl text-white ">Backend</h3>
        <div className="flex flex-col gap-2   mt-1">
          {skills.development.backend.map((ele, id) => {
            return (
              <div key={id} className=" w-[80%]  flex flex-row gap-2  ">
                <img
                  className="logo w-10"
                  alt={ele.name}
                  src={`/assets/${ele.name}.svg`}
                ></img>
                <p className="text-left text-3xl   text-white">{ele.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="Database w-full xl:w-[22%] rounded-xl border-2 p-2 ">
        <h3 className="text-4xl text-white">Database</h3>
        <div>
          {skills.development.database.map((ele, id) => {
            return (
              <div key={id} className="  flex flex-row gap-2 py-2 mt-1 ">
                <img
                  className="logo w-10"
                  alt={ele.name}
                  src={`/assets/${ele.name}.svg`}
                ></img>
                <p className="text-center text-3xl   text-white">{ele.name}</p>
              </div>
            );
          })}
        </div> */}
      </div>

      <div className="programmingLanguages w-full  rounded  border-2 p-2">
        <h3 className="text-4xl text-white">Tools</h3>
        <div className="flex flex-row flex-wrap gap-4">
          {skills.tools.map((ele, id) => {
            return (
              <div key={id} className=" flex flex-row gap-2 py-2 mt-1 ">
                <img
                  className="logo  w-10"
                  alt={ele.name}
                  src={`/assets/${ele.name}.svg`}
                ></img>
                <p className="text-center text-3xl   text-white">{ele.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
