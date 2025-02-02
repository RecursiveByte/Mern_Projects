import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className="w-[100vw] h-[8vh] text-white bg-black flex justify-between items-center px-4">
        <div className="w-[30%] h-full font-bold  flex items-center px-2">
          <span className="text-blue-500">Key</span>
          <span>Guardian</span>
        </div>

      
        <div className="flex w-[35%] h-full  text-blue-500 items-center text-lg sm:text-xl">
          <ul className="flex w-full justify-evenly items-center flex-wrap">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
