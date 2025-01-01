import React from 'react';

const TalentSearchCard = ({ talent }) => {
  // Destructure the properties from the talent object
  const { name, position, location, skills, profilePic } = talent;

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={profilePic} alt="Profile" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#d55d19]">{name}</h3>
        <p className="text-md text-gray-600">{position}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700">Skills:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all">
            View Profile
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all">
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentSearchCard;
