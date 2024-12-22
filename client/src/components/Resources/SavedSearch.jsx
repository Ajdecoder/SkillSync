import React, { useState, useEffect } from "react";

export const SavedSearches = ({ userId }) => {
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    // Fetch saved searches from the backend
    fetch(`/api/saved-searches?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setSavedSearches(data));
  }, [userId]);

  const deleteSearch = (searchId) => {
    // Delete a saved search
    fetch(`/api/saved-searches/${searchId}`, { method: "DELETE" })
      .then(() => setSavedSearches(savedSearches.filter(s => s.id !== searchId)));
  };

  return (
    <div className="saved-searches">
      <h2>Saved Searches</h2>
      <ul>
        {savedSearches.map((search) => (
          <li key={search.id}>
            <p>{search.name}</p>
            <button onClick={() => deleteSearch(search.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

