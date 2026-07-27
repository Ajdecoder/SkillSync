import React from "react";
import Marquee from "react-fast-marquee";

const HorizontalLogos = () => {
  const logos = [
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg",
    "https://digitallearning.eletsonline.com/wp-content/uploads/2016/10/7-million-jobs-can-disappear-by-2050-Study.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyq4oqiekrxpYgu3kNNBZ4dFuGMBWjDsU9Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfWWKDQxFBQI9eCkXzQErGmClpRJpTVostQ&s",
    "https://s3.ap-south-1.amazonaws.com/mployee.me/website/job_matching_platform/job_matching_platform_best.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTObZhY6d2tJBLOrqNLVFvBcODWqozTp67lybyG7W1q8cQcla5q-3Etsm0yuucvZfPHIPQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjA0g6SVyHOoPQOSSZ9yg2J9DCb0pa0mecQ&s",
  ];

  return (
    <div className="py-10 dark:text-white">
      <Marquee
        speed={140}
        gradient={true}
        pauseOnHover={true}
        gradientWidth={100}
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-5 hover:none overflow-hidden ">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="block w-58 h-48 object-cover cursor-default"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HorizontalLogos;
