import React from "react";

const Heading = ({ title, subtitle, align = "center" }) => {
  
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`w-full ${alignmentClasses[align]} py-8 px-4`}>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-3 transition-colors duration-300">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;