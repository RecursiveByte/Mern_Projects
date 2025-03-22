import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import { PerspectiveCamera, OrbitControls, Stars } from "@react-three/drei";
import Dragon from "./Dragon";
import Loader from "./Loader";
import { useMediaQuery } from "react-responsive";
import { Link, Element } from "react-scroll";
import { useSelector } from "react-redux";
import Navitems from "./Navitems";
import { useEffect } from "react";
import { defaultTextVariant, createTextVariant, navMenuVariants, scrollIndicatorVariants } from "../constants/variants";

const Hero = () => {
  const isOpen = useSelector((state) => state.changer.value);
  
  const isSmall = useMediaQuery({ maxWidth: 400 });
  const isMobile = useMediaQuery({ minWidth: 400, maxWidth: 640 });
  const isTab = useMediaQuery({ minWidth: 640, maxWidth: 1000 });

  const {ref,inView} = useInView({
    triggerOnce:false,
    threshold:0.1
  })


  return (
    <Element name="home">
      <section className="relative w-screen h-screen">
        
          {isOpen =='y' ?(
            <motion.div
              initial="hidden"
              animate="visible"
              variants={navMenuVariants}
              className="fixed top-[8%] flex flex-col text-2xl items-center p-4 list-none bg-black z-30 w-full overflow-hidden"
            >
              <Navitems />
            </motion.div>
          ):(isOpen =='n' && <motion.div
              animate="exit"
              variants={navMenuVariants}
              className="fixed top-[8%] flex flex-col text-2xl items-center p-4 list-none text-gray-500 hover:text-white bg-black z-30 w-full overflow-hidden"
            >
              <Navitems />
            </motion.div>)}
        
        <div
          className="absolute w-full left-0 top-[10%] sm:w-[50%] flex flex-col justify-center items-start p-4 text-white z-10 bg-transparent"
          variants={defaultTextVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full flex flex-col gap-4 p-4 h-full">
            <motion.h1
              variants={defaultTextVariant}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-5xl roboto-mono text-center [text-shadow:_0_0_15px_#ffffff,_0_0_30px_#ffffff]"
            >
              HI I AM <span className="text-cyan-300">Retesh</span>
              <br/>
              A Full Stack Developer
            </motion.h1>

            <motion.p
              variants={createTextVariant(2)}
              initial="hidden"
              animate="visible"
              className="text-center text-xl sm:text-2xl font-mono"
            >
              I bring imagination to reality through technical excellence and creative problem-solving.
            </motion.p>
          </div>
        </div>

        <div ref={ref} className="absolute w-full h-full" >
          {inView && (
        <Canvas className="w-full z-1 h-full absolute top-0 left-0">
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={1} /> {/* Soft overall light */}
            <pointLight position={[10, 10, 10]} intensity={0.8} /> {/* Bright light from a point */}
            <OrbitControls enableZoom={false} /> {/* Disable zoom for better control */}
            <Stars radius={100} depth={50} count={8000} factor={isSmall ? 8 : 4} saturation={0} fade />
            <Dragon 
              scale={isMobile ? 2.5 : (isTab ? 3.5 : (isSmall ? 2 : 5))} 
              position={isMobile ? [0, -2, 0] : (isTab ? [2, -1.5, 0] : (isSmall ? [0, -2.2, 0] : [2, -2.5, 0]))} 
              rotation={[0, -0.5, 0]} 
            />
          </Suspense>
        </Canvas>
        )}
        </div>
      
        
        <div className="scrollUp absolute bottom-20 flex justify-center items-center py-1 left-1/2 border-4 rounded-full border-gray-600 w-[30px] h-[45px]">
          <Link to="about" spy={true} duration={500} smooth={true} className="w-full flex justify-center items-end h-full">
            <motion.div
              variants={scrollIndicatorVariants}
              animate="animate"
              className="w-[35%] h-[20%] rounded-full bg-white"
            ></motion.div>
          </Link>
        </div>
      </section>
    </Element>
  );
};

export default Hero;