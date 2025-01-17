import React, { useState, useEffect } from "react";

export const BookmarkTalent = () => {
  const [bookmarkedTalents, setBookmarkedTalents] = useState([]);

  useEffect(() => {
    // Fetch bookmarked talents
    fetch("/api/bookmarked-talents")
      .then((res) => res.json())
      .then((data) => setBookmarkedTalents(data));
  }, []);

  return (
    <div className="bookmark-talent">
      <h2>Bookmarked Talent</h2>
      <ul>
        {bookmarkedTalents.map((talent) => (
          <li key={talent.id}>
            <h3>{talent.name}</h3>
            <p>{talent.skills.join(", ")}</p>
            <button>View Profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
