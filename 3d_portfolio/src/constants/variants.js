
// Text animation variants with customizable delay
export const createTextVariant = (delay = 1) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 3, type: "spring", damping: 5 },
    },
  });
  
  // Default text variant (with delay of 1)
  export const defaultTextVariant = createTextVariant();
  
  // Navigation menu animation variants

  export const  navMenuVariants = {
    hidden: { height: "0%", opacity: 0 },
    visible: { height: "30%", opacity: 1, transition: { duration: 1 } },
    exit: { height: "0%", opacity: 0, transition: { duration: 1 } }
  };

  export const xVariantSmall = {
    hidden: { x: -100 },
    visible: { x: 0, transition: { duration: 1, type: "spring", stiffness: 50 } },
  };

 export const xVariant = {
    hidden: { x: -1000 },
    visible: { x: 0, transition: { duration: 1, type: "spring", stiffness: 50 } },
  };
  
  // Scroll indicator animation
  export const scrollIndicatorVariants = {
    animate: { 
      y: [0, -20, 0],
      transition: { duration: 2, repeat: Infinity }
    }
  };


export const containerVariants = {
    initial: {
      boxShadow: "0 0 20px 5px rgba(255, 255, 255, 1)",
      backgroundPosition: "0% 50%",
    },
    animate: {
      boxShadow: [
        "0 0 20px 5px rgba(255, 255, 255, 1)",
        "0 0 20px 5px rgba(255, 255, 255, 0.4)",
        "0 0 40px 5px rgba(255, 255, 255, 1)",
      ],
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        },
        backgroundPosition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };
  
  export const moveAtPlaceVariant = {
    hidden:{rotate:[0]},
    visible:{rotate:[0,2,0,-2,0],y:[0,30,0],transition:{duration:5,repeat:Infinity}}
  }
  
  export const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };
  
 
  export const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        ease: "easeInOut" 
      },
    },
  };

  //variant for logos 
  export const childVariants = {
    hidden: { x: -100, y: 0, opacity: 0, rotate: 0, scale: 1 },
    visible: {
      x: 0,
      y: [0, 10, 0],
      opacity: 1,
      rotate: [0, 10, 0,-10,0],
      transition: {
        duration: 0.5,
        y: {
          duration: 2,
          repeat: Infinity
        },
        rotate: {
          duration: 5,
          delay: 2,
          repeat: Infinity
        }
      },
    },
  };
  