import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import AddOpportunityCard from "../../AddOpportunity/OpportunityCard.jsx";
import { locations, skills } from "../../data/Data.jsx";

const RecentOpportunity = ({ handleConnectClick, addedOpportunities }) => {
  const { loggedInUser } = useAuth();
  const [filteredOpportunities, setFilteredOpportunities] = useState(addedOpportunities);

  const [filters, setFilters] = useState({
    title: "",
    desc_requirement: "",
    type: "",
    location: "",
    skills: "",
    salaryRange: "",
  });

  // Filter opportunities based on selected filters
  useEffect(() => {
    let filtered = addedOpportunities;

    // Filter by title
    if (filters.title) {
      filtered = filtered.filter(opportunity =>
        opportunity.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Filter by description requirement
    if (filters.desc_requirement) {
      filtered = filtered.filter(opportunity =>
        opportunity.desc_requirement.toLowerCase().includes(filters.desc_requirement.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(opportunity =>
        opportunity.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(opportunity =>
        opportunity.location.toLowerCase() === filters.location.toLowerCase()
      );
    }
    

    // Filter by skills
    if (filters.skills) {
      filtered = filtered.filter(opportunity =>
        opportunity.skills.some(skill =>{
          
          skill.toLowerCase().includes(filters.skills.toLowerCase())}
        )
      );
    }

    // Filter by salary range (optional if required)
    if (filters.salaryRange) {
      // You can implement a specific salary range filter logic here if needed
    }

    setFilteredOpportunities(filtered);
  }, [filters, addedOpportunities]);

  const renderOpportunityCard = (opportunity) => {
    return (
      <AddOpportunityCard
        key={opportunity._id} // Use unique identifier instead of index
        opportunity={opportunity}
        onConnectClick={() =>
          handleConnectClick(
            opportunity,
            addedOpportunities.findIndex((o) => o._id === opportunity._id),
            "opportunity"
          )
        }
      />
    );
  };

  return (
    <div className="space-y-8">
      {/* Added Opportunities Section */}
      {addedOpportunities.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           

            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity) =>
                renderOpportunityCard(opportunity)
              )
            ) : (
              <div className="text-center text-gray-500">No matching opportunities found.</div>
            )}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {addedOpportunities.length === 0 && (
        <div className="text-center text-gray-500">
          No recent posts or opportunities available.
        </div>
      )}
    </div>
  );
};

export default RecentOpportunity;
