import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../services/api";
import { useAuth } from "../context/AuthContext";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(urlQuery);
  const [results, setResults] = useState({
    talents: [],
    opportunities: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const isCandidate = currentUser?.role === "candidate";
  const isRecruiter = currentUser?.role === "recruiter";

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
      setResults({
        talents: [],
        opportunities: [],
      });
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
        setResults(
          response.data.data || {
            talents: [],
            opportunities: [],
          }
        );
      } else {
        setResults({
          talents: [],
          opportunities: [],
        });
      }

      setHasSearched(true);
    } catch (err) {
      console.error(err);

      setError("Something went wrong while searching. Please try again.");

      setResults({
        talents: [],
        opportunities: [],
      });

      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

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

    setSearchParams({ q: trimmed });
  };

  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  const handlePopularSearch = (term) => {
    setInputValue(term);
    setSearchParams({ q: term });
  };

  const popularSearches = [
    "React Developer",
    "UI/UX Designer",
    "Full Stack",
    "Product Manager",
    "Data Analyst",
  ];

  const talentCount = results.talents?.length || 0;
  const opportunityCount = results.opportunities?.length || 0;

  const totalResults = talentCount + opportunityCount;

  const primaryType = isRecruiter ? "talents" : "opportunities";

  const primaryCount =
    primaryType === "talents" ? talentCount : opportunityCount;

  const secondaryCount =
    primaryType === "talents" ? opportunityCount : talentCount;

  const primaryTitle =
    primaryType === "talents" ? "Matching Talents" : "Opportunities";

  const secondaryTitle =
    primaryType === "talents"
      ? "Related Opportunities"
      : "Related Talents";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="relative z-10 container mx-auto px-4 pt-14 pb-16 sm:pt-16 sm:pb-20 text-center">
          <p
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      bg-blue-50 dark:bg-blue-500/10
      text-blue-700 dark:text-blue-400
      text-xs sm:text-sm font-medium mb-5
      border border-blue-100 dark:border-blue-500/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Discover talent & opportunities
          </p>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl
      font-bold
      text-slate-900 dark:text-white
      mb-4 tracking-tight leading-tight"
          >
            Find the right match,
            <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400"> faster</span>
          </h1>

          <p
            className="text-base sm:text-lg
      text-slate-600 dark:text-slate-400
      mb-9 max-w-xl mx-auto"
          >
            Search by skill, role, or keyword to find the people and
            opportunities that match your needs.
          </p>

          <form
            onSubmit={handleSearch}
            className="
        max-w-2xl mx-auto
        bg-white dark:bg-slate-900
        border border-slate-300 dark:border-slate-700
        p-1.5 rounded-xl
        flex items-center
        shadow-sm dark:shadow-black/20

        focus-within:border-blue-500
        dark:focus-within:border-blue-500

        focus-within:ring-4
        focus-within:ring-blue-500/10

        transition
      "
          >
            <i
              className="
        fa-solid fa-magnifying-glass
        text-slate-400 dark:text-slate-500
        text-lg ml-3 sm:ml-4 shrink-0
      "
            />

            <input
              type="search"
              placeholder="Search React, Product Designer, Bangalore..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="
          w-full bg-transparent
          text-slate-900 dark:text-white
          placeholder-slate-400 dark:placeholder-slate-500
          text-base sm:text-lg
          focus:outline-none
          px-3 py-2.5 sm:py-3
        "
              autoComplete="off"
              aria-label="Search query"
            />

            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="
            p-2
            text-slate-400 dark:text-slate-500
            hover:text-slate-700 dark:hover:text-slate-200
            transition shrink-0
          "
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            )}

            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="
          px-5 sm:px-6
          py-2.5 sm:py-3
          bg-blue-600 dark:bg-blue-500
          text-white
          font-semibold
          rounded-lg

          hover:bg-blue-700
          dark:hover:bg-blue-600

          active:scale-[0.98]
          transition

          disabled:opacity-50
          disabled:cursor-not-allowed

          shrink-0
          text-sm sm:text-base
        "
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

          {!urlQuery && (
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto">
              <span className="text-slate-500 dark:text-slate-500 text-sm mr-1">
                Popular:
              </span>

              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularSearch(term)}
                  className="
              px-3 py-1.5
              rounded-lg
              text-xs sm:text-sm

              bg-white dark:bg-slate-900
              hover:bg-slate-100 dark:hover:bg-slate-800

              text-slate-600 dark:text-slate-300

              border
              border-slate-200 dark:border-slate-700

              transition
            "
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-14 max-w-6xl">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 p-4 rounded-xl text-center mb-8 flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-exclamation" />
            {error}
          </div>
        )}

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

        {loading && (
          <div className="space-y-12 animate-pulse">
            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-52 mb-6" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-48 mb-6" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {[1, 2].map((i) => (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasSearched && !loading && (
          <div className="space-y-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Search results
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {totalResults === 0 ? (
                    "No matches found"
                  ) : (
                    <>
                      {totalResults} result
                      {totalResults !== 1 ? "s" : ""} for{" "}
                      <span className="text-blue-600 dark:text-blue-400">
                        “{urlQuery}”
                      </span>
                    </>
                  )}
                </h2>
              </div>

              {urlQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {isRecruiter ? (
              <>
                <TalentSection
                  title="Matching Talents"
                  subtitle={`People matching "${urlQuery}"`}
                  count={talentCount}
                  talents={results.talents}
                  getBadgeColor={getBadgeColor}
                  primary
                />

                <OpportunitySection
                  title="Related Opportunities"
                  subtitle="Opportunities related to your search"
                  count={opportunityCount}
                  opportunities={results.opportunities}
                  getBadgeColor={getBadgeColor}
                  recruiter
                />
              </>
            ) : (
              <>
                <OpportunitySection
                  title="Opportunities"
                  subtitle={`Jobs matching "${urlQuery}"`}
                  count={opportunityCount}
                  opportunities={results.opportunities}
                  getBadgeColor={getBadgeColor}
                  candidate={isCandidate}
                  primary
                />

                <TalentSection
                  title="Related Talents"
                  subtitle="Profiles related to your search"
                  count={talentCount}
                  talents={results.talents}
                  getBadgeColor={getBadgeColor}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TalentSection = ({
  title,
  subtitle,
  count,
  talents,
  getBadgeColor,
  primary = false,
}) => {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${primary
                ? "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
            >
              <i className="fa-solid fa-users" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {title}

              <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                ({count})
              </span>
            </h2>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-0 sm:ml-[52px]">
            {subtitle}
          </p>
        </div>
      </div>

      {talents?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {talents.map((talent) => (
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
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {talent.name}
                      </h3>

                      {talent.headline && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {talent.headline}
                        </p>
                      )}
                    </div>

                    <i className="fa-solid fa-chevron-right text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors mt-2 shrink-0" />
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1.5">
                    <i className="fa-solid fa-location-crosshairs text-gray-400 shrink-0" />

                    <span className="truncate">
                      {talent.location?.city || "Remote / Open"}
                    </span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {talent.skills?.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(
                          idx + 2
                        )}`}
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
  );
};

const OpportunitySection = ({
  title,
  subtitle,
  count,
  opportunities,
  getBadgeColor,
  primary = false,
}) => {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${primary
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
            >
              <i className="fa-solid fa-briefcase" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {title}

              <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                ({count})
              </span>
            </h2>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-0 sm:ml-[52px]">
            {subtitle}
          </p>
        </div>
      </div>

      {opportunities?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {opportunities.map((job) => (
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
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(
                        idx
                      )}`}
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

                {job.candidateCount !== undefined && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-users" />
                    {job.candidateCount} candidates
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyBlock
          icon="fa-magnifying-glass-minus"
          title="No opportunities found"
          description="Try a different keyword or broaden your search."
        />
      )}
    </section>
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