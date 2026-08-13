import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../services/api";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(urlQuery);
  const [results, setResults] = useState({ talents: [], opportunities: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const badgeColors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  ];

  const getBadgeColor = (idx) => badgeColors[idx % badgeColors.length];

  const fetchResults = useCallback(async (q) => {
    if (!q.trim()) {
      setResults({ talents: [], opportunities: [] });
      setHasSearched(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await API.get(
        `/api/search?q=${encodeURIComponent(q.trim())}`
      );

      if (response.data?.success) {
        setResults(response.data.data || { talents: [], opportunities: [] });
      } else {
        setResults({ talents: [], opportunities: [] });
      }
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching. Please try again.");
      setResults({ talents: [], opportunities: [] });
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync input + fetch whenever the URL `q` changes (back/forward, shared links, etc.)
  useEffect(() => {
    setInputValue(urlQuery);
    fetchResults(urlQuery);
  }, [urlQuery, fetchResults]);

  const handleSearch = (e) => {
    e?.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setSearchParams({});
      return;
    }

    // Update URL → triggers the effect above
    setSearchParams({ q: trimmed });
  };

  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  const popularSearches = [
    "React Developer",
    "UI/UX Designer",
    "Full Stack",
    "Product Manager",
    "Data Analyst",
  ];

  const totalResults =
    (results.opportunities?.length || 0) + (results.talents?.length || 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-red-600 via-gren-700 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/2 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-cyan-300 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-50 text-xs sm:text-sm font-medium mb-5 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Search talent & opportunities in one place
          </p>
 
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Find the right match,
            <br className="hidden sm:block" /> faster
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 mb-10 max-w-xl mx-auto font-light">
            Search by skill, role, or keyword — discover people and jobs that fit.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 border border-white/25 p-1.5 sm:p-2 rounded-2xl flex items-center shadow-2xl focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-white/30 transition"
          >
            <i className="fa-solid fa-magnifying-glass text-white/70 text-lg ml-3 sm:ml-4 shrink-0" />

            <input
              type="search"
              placeholder="e.g. React, Product Designer, Bangalore..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/60 text-base sm:text-lg focus:outline-none px-3 py-2.5 sm:py-3"
              autoComplete="off"
              aria-label="Search query"
            />

            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-white/60 hover:text-white transition shrink-0"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            )}

            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ml-1 shrink-0 text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin" />
                  <span className="hidden sm:inline">Searching</span>
                </span>
              ) : (
                "Search"
              )}
            </button>
          </form>

          {/* Popular chips — only when no active search */}
          {!urlQuery && (
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
              <span className="text-blue-100/70 text-sm mr-1 self-center">
                Try:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setInputValue(term);
                    setSearchParams({ q: term });
                  }}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results area */}
      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-6xl">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 p-4 rounded-xl text-center mb-8 flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

        {/* Empty / idle state */}
        {!hasSearched && !loading && !error && (
          <div className="text-center py-16 sm:py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center">
              <i className="fa-solid fa-compass text-3xl text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Start exploring
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm sm:text-base">
              Type a skill, job title, or keyword above — or pick a popular
              search to get started.
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-12 animate-pulse">
            {[1, 2].map((section) => (
              <div key={section}>
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-5 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 h-36"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="w-11 h-11 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0" />
                        <div className="flex-1 space-y-2 pt-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-16" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-20" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-14" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {hasSearched && !loading && (
          <div className="space-y-14">
            {/* Summary bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {totalResults === 0 ? (
                  <>
                    No results for{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      “{urlQuery}”
                    </span>
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {totalResults}
                    </span>{" "}
                    result{totalResults !== 1 ? "s" : ""} for{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      “{urlQuery}”
                    </span>
                  </>
                )}
              </p>
              {urlQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline self-start sm:self-auto"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Opportunities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <i className="fa-solid fa-briefcase" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Opportunities
                  <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    ({results.opportunities?.length || 0})
                  </span>
                </h2>
              </div>

              {results.opportunities?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {results.opportunities.map((job) => (
                    <Link
                      to={`/opportunity/connect/${job._id}`}
                      key={job._id}
                      className="group block h-full"
                    >
                      <article className="h-full p-5 sm:p-6 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {job.company_name && (
                                <span className="flex items-center gap-1.5">
                                  <i className="fa-regular fa-building text-gray-400" />
                                  {job.company_name}
                                </span>
                              )}
                              {job.location && (
                                <span className="flex items-center gap-1.5">
                                  <i className="fa-solid fa-location-dot text-gray-400" />
                                  {job.location}
                                </span>
                              )}
                            </div>
                          </div>
                          {job.requirement_type && (
                            <span className="shrink-0 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200/80 dark:border-emerald-800/40">
                              {job.requirement_type}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
                          {job.desc_requirement || "No description provided."}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.skills?.slice(0, 4).map((skill, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(idx)}`}
                            >
                              {skill.skillName || skill}
                            </span>
                          ))}
                          {job.skills?.length > 4 && (
                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                              +{job.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyBlock
                  icon="fa-magnifying-glass-minus"
                  title="No opportunities found"
                  description="Try a different keyword or check the Talents section below."
                />
              )}
            </section>

            {/* Talents */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <i className="fa-solid fa-users" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Talents
                  <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    ({results.talents?.length || 0})
                  </span>
                </h2>
              </div>

              {results.talents?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {results.talents.map((talent) => (
                    <Link
                      to={`/candidateinfo/${talent._id}`}
                      key={talent._id}
                      className="group block h-full"
                    >
                      <article className="h-full p-5 sm:p-6 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4">
                        <img
                          src={
                            talent.profilePicture ||
                            "https://i.pinimg.com/1200x/d9/04/bb/d904bbc138e6cba76e5470df5054b106.jpg"
                          }
                          alt={talent.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800 shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {talent.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                            <i className="fa-solid fa-location-crosshairs text-gray-400 shrink-0" />
                            <span className="truncate">
                              {talent.location?.city || "Remote / Open"}
                            </span>
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {talent.skills?.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(idx + 2)}`}
                              >
                                {skill}
                              </span>
                            ))}
                            {talent.skills?.length > 4 && (
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                +{talent.skills.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors mt-2 shrink-0" />
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyBlock
                  icon="fa-user-xmark"
                  title="No talents found"
                  description="Try broadening your search or use a different skill keyword."
                />
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyBlock = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-10 sm:p-12 text-center shadow-sm">
    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <i className={`fa-solid ${icon} text-xl text-gray-400`} />
    </div>
    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
      {title}
    </h4>
    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
      {description}
    </p>
  </div>
);

export default Search;