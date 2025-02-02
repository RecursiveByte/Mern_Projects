import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className="w-[100vw] h-[10vh] text-white bg-black flex justify-between items-center px-4">
        <div className="w-[30%] h-full font-bold  flex items-center px-2">
          <span className="text-blue-500">Key</span>
          <span>Guardian</span>
        </div>

      
        <div className="flex w-[35%] h-full p-1 text-blue-500 items-center text-lg sm:text-xl">
          <ul className="flex w-full justify-evenly p-2 items-center max-[600px]:flex-col max-[600px]:text-sm flex-wrap">
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
