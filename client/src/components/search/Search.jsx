import React, { useState } from "react";
import { API } from "../../services/api";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ talents: [], opportunities: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.data && response.data.success) {
        setResults(response.data.data);
      } else {
        setResults({ talents: [], opportunities: [] });
      }
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const badgeColors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  ];

  const getBadgeColor = (idx) => badgeColors[idx % badgeColors.length];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Gradient Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-500 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-1/2 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-cyan-300 blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
            Discover Exceptional Talent <br className="hidden md:block" /> & Opportunities
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
            Connect with top-tier professionals or find your next career-defining role.
          </p>

          {/* Glassmorphism Search Bar */}
          <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 p-2 md:p-3 rounded-2xl flex items-center shadow-2xl transition-all hover:bg-white/15">
            <i className="fa-solid fa-magnifying-glass text-white/70 text-xl ml-4 mr-3"></i>
            <input 
              type="text" 
              placeholder="Search by keyword, skill, or job title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white placeholder-white/70 text-lg focus:outline-none px-2"
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm ml-2 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl text-center mb-8 flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        {/* Initial Empty State */}
        {!hasSearched && !loading && !error && (
          <div className="text-center py-20 opacity-60">
            <i className="fa-solid fa-compass text-6xl text-gray-300 dark:text-gray-600 mb-6 block"></i>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Ready to explore?</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Enter a skill, job title, or keyword above to uncover amazing opportunities and talented professionals.</p>
          </div>
        )}

        {/* Skeleton Loading */}
        {loading && (
          <div className="space-y-12 animate-pulse mt-8">
            {[1, 2].map((section) => (
              <div key={section}>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-800 shadow-sm h-40">
                      <div className="flex gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-16"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-20"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-12"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actual Results */}
        {hasSearched && !loading && (
          <div className="space-y-16">
            
            {/* Opportunities Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <i className="fa-solid fa-briefcase text-lg"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Opportunities <span className="text-lg font-normal text-gray-500 ml-2">({results.opportunities?.length || 0})</span>
                </h3>
              </div>
              
              {results.opportunities?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {results.opportunities.map((job) => (
                    <Link to={`/opportunity/connect/${job._id}`} key={job._id} className="group block">
                      <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {job.title}
                            </h4>
                            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 mt-2 gap-4 text-sm font-medium">
                              <span className="flex items-center gap-1.5"><i className="fa-regular fa-building text-gray-400"></i> {job.company_name}</span>
                              <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-gray-400"></i> {job.location}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800/30 whitespace-nowrap">
                            {job.requirement_type}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {job.desc_requirement || "No description provided."}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {job.skills?.slice(0, 4).map((skill, idx) => (
                            <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(idx)}`}>
                              {skill.skillName || skill}
                            </span>
                          ))}
                          {job.skills?.length > 4 && (
                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              +{job.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-magnifying-glass-minus text-2xl text-gray-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No opportunities found</h4>
                  <p className="text-gray-500 dark:text-gray-400">We couldn't find any roles matching your search criteria. Try using different keywords.</p>
                </div>
              )}
            </section>

            {/* Talents Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <i className="fa-solid fa-users text-lg"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Talents <span className="text-lg font-normal text-gray-500 ml-2">({results.talents?.length || 0})</span>
                </h3>
              </div>

              {results.talents?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {results.talents.map((talent) => (
                    <Link to={`/candidateinfo/${talent._id}`} key={talent._id} className="group block">
                      <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5">
                        <img 
                          src={talent.profilePicture || "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg"} 
                          alt={talent.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-50 dark:border-gray-700 shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors" 
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {talent.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mt-1 flex items-center gap-1.5">
                            <i className="fa-solid fa-location-crosshairs text-gray-400"></i> {talent.location?.city || "Remote / Open"}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {talent.skills?.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(idx + 2)}`}>
                                {skill}
                              </span>
                            ))}
                            {talent.skills?.length > 4 && (
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                +{talent.skills.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors">
                           <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-user-xmark text-2xl text-gray-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No talents found</h4>
                  <p className="text-gray-500 dark:text-gray-400">We couldn't find any candidates matching your search criteria. Try broadening your terms.</p>
                </div>
              )}
            </section>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
