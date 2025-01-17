import React, { useState, useEffect } from "react";
import axios from "axios";
import { getOpportunities } from "../../../services/api";

export const MyJobListnings = ({ jobId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch candidates who applied for the job
    const fetchCandidates = async () => {
      try {
        const response = await getOpportunities();
        console.log(response.data.Addedopportunities);
        setCandidates(response.data);
      } catch (err) {
        setError("Error fetching candidates.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [jobId]);

  return (
    <div>
      <h3>Candidates who applied to Job #{jobId}:</h3>

      {loading && <p>Loading candidates...</p>}
      {error && <p>{error}</p>}

      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate._id}>
              <strong>{candidate.name}</strong> - {candidate.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have applied yet.</p>
      )}
    </div>
  );
};
