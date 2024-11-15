import React from "react";
import { useLocation } from "react-router-dom";

const ConnectPage = () => {
  const { state } = useLocation();
  const {
    company_name,
    company_website,
    available_expert,
    desc_requirement,
    address,
    cover_Img,
    from,
    to,
  } = state.company;

  return (
  <div className="p-20 " >
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg hover:scale-105 border-2 border-red-500 duration-300">
      {/* Company Name */}
      <h2 className="text-3xl font-semibold text-gray-800">{company_name}</h2>

      {/* Cover Image */}
      <img
        src={`http://localhost:9002/${cover_Img}`}
        alt={company_name}
        className="w-full h-52 object-cover rounded-lg mt-4"
      />

      {/* Available Expert */}
      <div className="mt-4 text-sm text-gray-600">
        <i className="fa fa-location-dot mr-1"></i>
        {available_expert.join(", ")}
      </div>

      {/* Address */}
      <p className="mt-2 text-sm text-gray-500">{address}</p>

      {/* Description Requirement */}
      <p className="mt-2 text-sm text-gray-500">{desc_requirement}</p>

      {/* Date Range */}
      <div className="mt-4">
        <p className="text-xs text-gray-400">
          <strong>From:</strong> {new Date(from).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400">
          <strong>To:</strong> {new Date(to).toLocaleDateString()}
        </p>
      </div>

      {/* Company Website */}
      <p className="mt-4 text-sm text-blue-500">
        <strong>Website:</strong>{" "}
        <a
          href={`http://${company_website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-700"
        >
          {company_website}
        </a>
      </p>
    </div>
  </div>
  );
};

export default ConnectPage;
