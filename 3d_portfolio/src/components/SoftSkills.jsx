import React from "react";
import { motion, useInView } from "framer-motion";
import { parentVariants,xVariant} from "../constants/variants";
import { useRef } from "react";
import { softSkills } from "../constants/dataInArrays";


const SoftSkills = () => {

  const softRef = useRef(null);
  const inView = useInView(softRef, { once: false, amount: 0.2 });
  
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">
        Soft Skills
      </h2>
      <motion.ul
        ref={softRef}
        variants={parentVariants}
        animate={inView ? "visible" : "hidden"}
        className="space-y-3"
      >
        {softSkills.map((skill, index) => (
          <motion.li
            key={index}
            variants={xVariant}
            className="flex items-center"
          >
            <span className="w-4 h-4 bg-emerald-400 rounded-full mr-3"></span>
            <span>
              <strong>{skill.title}</strong>: {skill.description}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default SoftSkills;