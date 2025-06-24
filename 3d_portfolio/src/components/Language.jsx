import React from "react";
import {motion,useInView} from "framer-motion"
import { useRef } from "react";
import { parentVariants,xVariant } from "../constants/variants";
import { languages } from "../constants/dataInArrays";


const LanguagesKnown = () => {

    const softRef = useRef(null);
    const inView = useInView(softRef, { once: false, amount: 0.3 });

  return (
    <div className="languageCon tainer  rounded-md p-4  bg-transparent text-white">
        <h3 className="text-2xl ml-2 space-y-3 text-emerald-400 font-bold mb-4">Languages Known</h3>
      <motion.ul 
      ref={softRef}
      variants={parentVariants}
      animate={inView ? "visible" : "hidden"}
      className="">
        {languages.map((ele, id) => (
            <span key={id}>
          <motion.li
          variants={xVariant}
          className="flex justify-normal p-2  items-center" key={id}>
            <span className="w-4 h-4 bg-emerald-400 rounded-full mr-3"></span>
            <span><strong>{ele.title}</strong>: {ele.description}</span>
            
          </motion.li>
          </span>
        ))}
      </motion.ul>
    </div>
  );
};

export default LanguagesKnown;
