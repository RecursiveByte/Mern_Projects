import React from 'react';
import {educationData} from "../constants/dataInArrays"

const Education = ({ }) => {

  return (
    <div className="education font-mono w-full flex flex-col gap-2 ">
      <h3 className='text-start'>Education</h3>
      <ul className="list-disc ml-5 space-y-2 ">
        {educationData.map((item, index) => (
          <li key={index} className="text-xl">
            <strong>{item.level}</strong> - {item.institution}<br />
            {item.scoreType}: <span className="text-emerald-500">{item.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;