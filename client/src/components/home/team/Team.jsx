import React from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css"; // Keep this if you have specific custom styles for this component
import '../../../tailwind.css';

const Team = () => {
  return (
    <section className="team bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Heading
          title="Our Team"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        />

        <div className="mt-10 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              className="box shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105"
              key={index}
              data-aos={index % 2 === 0 ? "flip-right" : "flip-left"}
              data-aos-duration="1700"
            >
              <div className="details space-y-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10">
                <div className="img relative">
                  <img
                    src={member.cover}
                    alt={member.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <i className="fa-solid fa-circle-check absolute top-2 right-2 text-green-500"></i>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-gray-600">
                    <i className="fa fa-location-dot mr-2"></i>
                    {member.address}
                  </p>
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                </div>

                <ul className="flex justify-center space-x-2 text-blue-500">
                  {member.icon.map((icon, index) => (
                    <li key={index} className="text-md text-center">
                      {icon}
                    </li>
                  ))}
                </ul>

                <div className="button flex justify-center space-x-4 mt-4">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-green-500 duration-500">
                    <i className="fa fa-envelope mr-2"></i>Message
                  </button>
                  <button className="btn4 flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-sky-300 duration-500">
                    <i className="fa fa-phone-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
