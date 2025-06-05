import React from "react";

const Heading = ({ title, subtitle, subtitleClassName, titleClassName }) => {
  return (
    <>
      <main className="heading ">
        <h1 className={`heading tracking-tighter ${titleClassName}`}>
          {title}
        </h1>
        <p className={`mt-2 ${subtitleClassName} `}>{subtitle}</p>
      </main>
    </>
  );
};  

export default Heading;
