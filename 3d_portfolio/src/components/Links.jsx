import React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { xVariantSmall } from "../constants/variants";
import { links } from "../constants";

const Links = () => {

  const leetRef = useRef(null);
  const inleetView = useInView(leetRef, { once: false, amount: 0 });

  const gitRef = useRef(null);
  const ingitView = useInView(gitRef, { once: false, amount: 0 });

  const linkedinRef = useRef(null);
  const inLinkedinView = useInView(linkedinRef, { once: false, amount: 0 });

  return (
    <div className="links w-full min-h-full gap-6 flex flex-col justify-center text-white ">
      <motion.div
        ref={leetRef}
        variants={xVariantSmall}
        initial="hidden"
        animate={inleetView ? "visible" : "hidden"}
        className="leetcode rounded-lg p-2 w-full flex flex-col sm:gap-4 sm:flex-row sm:justify-normal text-xl sm:text-3xl bg-gray-900 "
      >
        <span className="flex items-center justify-center text-emerald-500">
          Leetcode Profile
        </span>
        <span>
          <a
            className="flex items-center justify-center"
            href={links.leetcode}
          >
            <img
              src="/assets/leetcode.svg"
              className="aspect-[4/4] bg-cover logo "
            />
            Mech_12
          </a>
        </span>
      </motion.div>

      <motion.div
        ref={gitRef}
        variants={xVariantSmall}
        initial="hidden"
        animate={ingitView ? "visible" : "hidden"}
        className="github rounded-lg  w-full flex 
flex-col sm:gap-12 sm:flex-row sm:justify-normal p-2 items-center text-xl 
sm:text-3xl  bg-gray-900 "
      >
        <span
          className="flex items-center 
text-emerald-500"
        >
          Github Profile
        </span>
        <span>
          <a
            className="flex items-center justify-normal"
            href={links.github}
          >
            <img
              src="/assets/githubsmall.svg"
              className="aspect-[4/4] bg-cover 
logo "
            />
            RecursiveByte
          </a>
        </span>
      </motion.div>

      <motion.div
  ref={linkedinRef}
  variants={xVariantSmall}
  initial="hidden"
  animate={inLinkedinView ? "visible" : "hidden"}
  className="leetcode rounded-lg p-2 w-full flex flex-col 
sm:gap-4 sm:flex-row sm:justify-normal text-xl sm:text-3xl 
bg-gray-900 "
>
  <span className="flex items-center justify-center 
text-emerald-500">
    Linkedin Profile
  </span>
  <span>
    <a
      className="flex items-center justify-center"
      href={links.linkedin}
    >
      <img
        src="/assets/linkedin.svg"
        className="aspect-[4/4] bg-cover logo "
      />
      Retesh Mourya
    </a>
  </span>
</motion.div>
    </div>
  );
};

export default Links;
