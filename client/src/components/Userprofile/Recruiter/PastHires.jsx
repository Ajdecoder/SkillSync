import React from 'react';

const PastHires = ({ pastHires }) => {
  return (
    <div>
      <h2>Past Hires</h2>
      <div className="past-hires-list">
        {pastHires.map((hire) => (
          <div key={hire._id.$oid} className="past-hire-card">
            <h3>{hire.candidateName}</h3>
            <p>Position: {hire.position}</p>
            <p>Hire Date: {new Date(hire.hireDate.$date).toLocaleDateString()}</p>
            <p>Testimonial: {hire.testimonial}</p>
            <p>Status: {hire.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastHires;
