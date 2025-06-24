import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { parentVariants, xVariant } from "../constants/variants";
import { otherSkills } from "../constants/dataInArrays";

const OtherSkills = () => {

  const skillsRef = useRef(null);
  const inView = useInView(skillsRef, { once: false, amount: 0.2 });

  return (
    <div className="p-6 bg-transparent rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Other Skills</h2>
      <motion.ul
        ref={skillsRef}
        variants={parentVariants}
        animate={inView ? "visible" : "hidden"}
        className="space-y-3"
      >
        {otherSkills.map((skill, index) => (
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

export default OtherSkills;
