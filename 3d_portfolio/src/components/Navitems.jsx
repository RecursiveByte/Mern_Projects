import React from 'react'
import { Navlinks } from '../constants/index.js'
import { Link } from "react-scroll";

const Navitems = () => {
  return (
    <>
            {Navlinks.map((ele) => (
                <li key={ele.id} className= 'text-gray-400 hover:text-white'> <Link to={ele.to} spy={true} smooth={true} duration={300} >{ele.name}  </Link></li>
            ))}
    </>
  )
}

export default Navitems