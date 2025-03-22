import React from "react";
import Navitems from "./Navitems";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link, Element } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { changer } from "/src/redux/change/changeSlice";

const Navbar = () => {
  const controls = useAnimation();
   
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await controls.start({
        background: [
          "conic-gradient(from 0deg, rgba(255, 255, 255, 0.8) 5%, transparent 30%)",
          "conic-gradient(from 120deg, rgba(255, 255, 255, 0.8) 5%, transparent 30%)",
          "conic-gradient(from 240deg, rgba(255, 255, 255, 0.8) 5%, transparent 30%)",
          "conic-gradient(from 360deg, rgba(255, 255, 255, 0.8) 5%, transparent 30%)",
        ],
      });
    };

    sequence();
  }, [controls]);

  const isOpen = useSelector((state) => state.changer.value);

  const upToDownVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      delay: 2,
      transition: {
        duration: 2,
        type: "spring",
        damping: 10,
      },
    },
  };

  const dispatch = useDispatch();

  return (
    <nav className=" z-20  w-full fixed top-0 h-[8vh]  flex justify-between px-8 items-center gap-6 border-b-[0.5px] bg-black border-neutral-800">
      <motion.div
        initial={{ opacity: 0, background: "transparent" }}
        animate={controls}
        transition={{
          delay: 2,
          opacity: { duration: 1, delay: 0 },
          background: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="  sm:w-[10%] relative  rounded-md sm:h-[90%] h-[60%] flex justify-center items-center"
      >
        <div className="text-white px-4 rounded-md text-xs sm:text-xl flex justify-center items-center w-[95%] sm:w-[96%] h-[95%] bg-black ">
          <motion.div
            variants={upToDownVariants}
            initial="hidden"
            animate="visible"
            className="w-full  h-full flex justify-center items-center bg-transparent "
          >
            <Link to="home" spy={true} smooth={true} duration={500} className="sm:font-mono">
              Retesh
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="list-none  hidden sm:flex sm:gap-6 sm:text-xl sm:justify-around sm:items-center ">
        <Navitems />
      </div>
      <button className="block sm:hidden" onClick={() => dispatch(changer())}>
        <img src={isOpen=='y' ? "assets/close.svg" : "assets/open.svg"} alt="wait" />
      </button>
    </nav>
  );
};

export default Navbar;
