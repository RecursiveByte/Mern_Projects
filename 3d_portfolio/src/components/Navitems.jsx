import React from 'react'
import { Navlinks } from '../constants/index.js'
import { Link } from "react-scroll";

const Navitems = () => {
  return (
    <>
      {Navlinks.map((ele) => {
        if(ele.id === 0) {
          return (
            <li key={ele.id} className='text-gray-400 hover:text-white'>
              <a 
                href="https://drive.google.com/file/d/1WwaKtbGrst6Jb_jW8JWVy-6dFF0xa7O3/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className='cursor-pointer'>
                {ele.name}
              </a>
            </li>
          )
        } else {
          return (
            <li key={ele.id} className='text-gray-400 cursor-pointer hover:text-white'>
              <Link to={ele.to} spy={true} smooth={true} duration={300}>
                {ele.name}
              </Link>
            </li>
          )
        }
      })}
    </>
  )
}

export default Navitems
