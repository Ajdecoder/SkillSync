import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <main className="heading p-4">
        <h1 className="heading tracking-tighter" >{title}</h1>
        <p className="mt-2 " >{subtitle}</p>
      </main>
    </>
  );
};

export default Heading;
