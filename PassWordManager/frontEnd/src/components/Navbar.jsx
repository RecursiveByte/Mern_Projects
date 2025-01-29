import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className='w-[100vw] h-[8vh]  text-white  bg-black flex justify-between'>
        <div className='my-auto mx-4 font-bold'>
        <span className=' text-blue-500'>Key</span>
        <span >Guardian</span>
        </div>
        
        
        <ul className='flex gap-10 w-[20%] h-[100%]  text-blue-500 justify-center items-center text-xl '>
          <li><a>Home</a></li>
          <li><a>contact</a></li>
          <li><a>About</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar