import React, { Suspense } from "react";
import { Element } from "react-scroll";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Stars } from "@react-three/drei";
import EarthHologram from "./EarthHologram";
import Loader from "./Loader";
import ContactForm from "./ContactForm";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";

const Contact = () => {

  const {ref,inView} = useInView({
    triggerOnce:false,
    threshold:0.1
  })

  const isSmall = useMediaQuery({ maxWidth: 400 });
const isMobile = useMediaQuery({ minWidth: 400, maxWidth: 640 });
const isTab = useMediaQuery({ minWidth: 640, maxWidth: 1000 });
  return (
    <Element name="contact" className="contact-section">
      <section className="z-10   p-4 min-w-screen min-h-screen h-screen relative w-screen bg-black">
        <div><ContactForm/></div>

        <div  ref={ref} className="w-full h-full absolute">
          {inView && (
        <Canvas className="z-10 absolute top-0 w-screen h-screen">
          <Suspense  fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={1} /> 
            <OrbitControls enableZoom={false} />{" "}

            <Stars
              radius={100}
              depth={50}
              count={8000}
              factor={isSmall ? 8 : 4}
              saturation={0}
              fade
            />
          <EarthHologram scale={isSmall ? 1 : (isTab ? 4 :( isMobile ? 1.3 : 5))} position={ isSmall ? [1,1.9,0] :(isTab ? [2.7,0,0] :(isMobile ? [1,1.9,0] :[4,-0.5,0])) } rotation={[0,-Math.PI/1.5,0]}/>
          </Suspense>
        </Canvas>
        )}
        </div>
      </section>
    </Element>
  );
};

export default Contact;
