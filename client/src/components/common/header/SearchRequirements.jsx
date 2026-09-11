
import React, { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaTimes,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";
import clsx from "clsx";
import { API } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SearchDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    opportunities: [],
    talents: [],
  });
  const [loading, setLoading] = useState(false);

  const { loggedInUser, googleUser } = useAuth();
  const currentUser = loggedInUser || googleUser;

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // -----------------------------------------
  // Helpers
  // -----------------------------------------

  const formatSalary = (value) => {
    if (!value) return null;

    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    return `₹${value.toLocaleString("en-IN")}`;
  };

  const clearResults = () => {
    setResults({
      opportunities: [],
      talents: [],
    });
  };

  // -----------------------------------------
  // Close dropdown on outside click
  // -----------------------------------------

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // -----------------------------------------
  // Focus input when dropdown opens
  // -----------------------------------------

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // -----------------------------------------
  // Debounced search
  // -----------------------------------------

  useEffect(() => {
    if (!query.trim()) {
      clearResults();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const { data } = await API.get(
          `/api/search?q=${encodeURIComponent(query.trim())}`
        );

        const apiData = data?.data || {};

        setResults({
          opportunities: apiData.opportunities || [],
          talents: apiData.talents || [],
        });
      } catch (error) {
        console.error("Search failed:", error);

        clearResults();
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // -----------------------------------------
  // Select search result
  // -----------------------------------------

  const handleSelect = (item, type) => {
    onSelect?.({
      ...item,
      type,
    });

    const searchValue =
      type === "opportunity"
        ? item.title
        : item.name || item.fullName;

    setQuery("");
    setIsOpen(false);
    clearResults();

    navigate(
      `/search?q=${encodeURIComponent(searchValue || "")}`
    );
  };

  // -----------------------------------------
  // Clear search
  // -----------------------------------------

  const clearSearch = () => {
    setQuery("");
    clearResults();
    inputRef.current?.focus();
  };

  const hasResults =
    results.opportunities.length > 0 ||
    results.talents.length > 0;

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* -----------------------------------------
          Search Trigger
      ----------------------------------------- */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "group flex items-center gap-2 rounded-full",
          "border px-3 py-2 sm:px-4",
          "text-sm font-medium transition-all duration-200",
          "w-[11rem] sm:w-[10rem] md:w-[9rem] lg:w-[15rem]",

          // Light mode
          "border-slate-200 bg-white text-slate-600",
          "shadow-sm hover:border-slate-300 hover:bg-slate-50",
          "hover:text-slate-900",

          // Dark mode
          "dark:border-slate-700 dark:bg-slate-900/80",
          "dark:text-slate-300",
          "dark:hover:border-slate-600 dark:hover:bg-slate-800",
          "dark:hover:text-white",

          // Open state
          isOpen && [
            "border-blue-500 bg-blue-50 text-blue-600",
            "ring-4 ring-blue-500/10",
            "dark:border-blue-500/70 dark:bg-slate-800",
            "dark:text-blue-400",
            "dark:ring-blue-500/10",
          ]
        )}
      >
        <FaSearch
          size={13}
          className="shrink-0 opacity-80 transition-transform duration-200 group-hover:scale-110"
        />

        <span className="hidden sm:inline">
          Search...
        </span>
      </button>

      {/* -----------------------------------------
          Dropdown
      ----------------------------------------- */}

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[20rem] sm:w-[24rem]">
          <div
            className={clsx(
              "overflow-hidden rounded-2xl border",
              "shadow-xl shadow-slate-900/10",
              "backdrop-blur-xl",

              // Light
              "border-slate-200 bg-white",

              // Dark
              "dark:border-slate-700/80 dark:bg-slate-900/95",
              "dark:shadow-black/40"
            )}
          >
            {/* -----------------------------------------
                Search Input
            ----------------------------------------- */}

            <div
              className={clsx(
                "flex items-center gap-3 border-b px-4 py-3.5",

                "border-slate-200 bg-slate-50/80",

                "dark:border-slate-700/80",
                "dark:bg-slate-800/70"
              )}
            >
              <div
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  "bg-blue-50 text-blue-500",
                  "dark:bg-blue-500/10 dark:text-blue-400"
                )}
              >
                <FaSearch size={13} />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs or candidates..."
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    query.trim()
                  ) {
                    navigate(
                      `/search?q=${encodeURIComponent(
                        query.trim()
                      )}`
                    );

                    setIsOpen(false);
                  }
                }}
                className={clsx(
                  "min-w-0 flex-1 bg-transparent text-sm outline-none",
                  "text-slate-800 placeholder:text-slate-400",
                  "dark:text-slate-100",
                  "dark:placeholder:text-slate-500"
                )}
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className={clsx(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    "text-slate-400 transition-colors",
                    "hover:bg-slate-200 hover:text-slate-700",
                    "dark:hover:bg-slate-700",
                    "dark:hover:text-white"
                  )}
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>

            {/* -----------------------------------------
                Result Count
            ----------------------------------------- */}

            {!loading && query && hasResults && (
              <div
                className={clsx(
                  "flex items-center gap-1.5 border-b px-4 py-2.5",

                  "border-slate-100 bg-white",
                  "text-xs font-medium text-slate-500",

                  "dark:border-slate-800",
                  "dark:bg-slate-900",
                  "dark:text-slate-400"
                )}
              >
                {currentUser?.role === "candidate" ? (
                  results.opportunities.length > 0 && (
                    <span>
                      {results.opportunities.length}{" "}
                      {results.opportunities.length === 1
                        ? "Job"
                        : "Jobs"}
                    </span>
                  )
                ) : (
                  results.talents.length > 0 && (
                    <span>
                      {results.talents.length}{" "}
                      {results.talents.length === 1
                        ? "Candidate"
                        : "Candidates"}
                    </span>
                  )
                )}
              </div>
            )}

            {/* -----------------------------------------
                Results Container
            ----------------------------------------- */}

            <div className="max-h-[22rem] overflow-y-auto">
              {/* -----------------------------------------
                  Loading
              ----------------------------------------- */}

              {loading && (
                <div className="flex flex-col items-center justify-center px-4 py-10">
                  <div
                    className={clsx(
                      "mb-3 h-6 w-6 animate-spin rounded-full border-2",
                      "border-slate-200 border-t-blue-500",
                      "dark:border-slate-700",
                      "dark:border-t-blue-400"
                    )}
                  />

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Searching...
                  </p>
                </div>
              )}

              {/* -----------------------------------------
                  Empty Query
              ----------------------------------------- */}

              {!loading && !query && (
                <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                  <div
                    className={clsx(
                      "mb-3 flex h-11 w-11 items-center justify-center rounded-xl",
                      "bg-slate-100 text-slate-400",
                      "dark:bg-slate-800",
                      "dark:text-slate-500"
                    )}
                  >
                    <FaSearch size={16} />
                  </div>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Search for something
                  </p>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Find jobs or candidates
                  </p>
                </div>
              )}

              {/* -----------------------------------------
                  No Results
              ----------------------------------------- */}

              {!loading && query && !hasResults && (
                <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                  <div
                    className={clsx(
                      "mb-3 flex h-11 w-11 items-center justify-center rounded-xl",
                      "bg-slate-100 text-slate-400",
                      "dark:bg-slate-800",
                      "dark:text-slate-500"
                    )}
                  >
                    <FaSearch size={16} />
                  </div>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Try searching for another keyword
                  </p>
                </div>
              )}

              {/* =================================================
                  CANDIDATE ROLE → SHOW JOBS
              ================================================= */}

              {!loading &&
                currentUser?.role === "candidate" &&
                results.opportunities.length > 0 && (
                  <div>
                    {/* Section Header */}

                    <div
                      className={clsx(
                        "sticky top-0 z-10 flex items-center gap-2",
                        "border-b px-4 py-2.5",

                        "border-slate-100 bg-slate-50/95",
                        "text-[11px] font-bold uppercase tracking-wider",
                        "text-slate-500 backdrop-blur-sm",

                        "dark:border-slate-800",
                        "dark:bg-slate-900/95",
                        "dark:text-slate-500"
                      )}
                    >
                      <FaBriefcase
                        size={11}
                        className="text-blue-500"
                      />

                      <span>
                        Job Opportunities
                      </span>
                    </div>

                    {/* Jobs */}

                    {results.opportunities.map((item) => {
                      const skills =
                        item.skills?.slice(0, 4) || [];

                      return (
                        <button
                          type="button"
                          key={item._id || item.id}
                          onClick={() =>
                            handleSelect(
                              item,
                              "opportunity"
                            )
                          }
                          className={clsx(
                            "group flex w-full items-start gap-3",
                            "border-b px-4 py-3.5 text-left",
                            "transition-all",

                            "border-slate-100",
                            "hover:bg-blue-50",

                            "dark:border-slate-800/70",
                            "dark:hover:bg-slate-800/80"
                          )}
                        >
                          {/* Company Logo */}

                          <div
                            className={clsx(
                              "flex h-10 w-10 shrink-0 items-center justify-center",
                              "overflow-hidden rounded-lg",
                              "border border-slate-200 bg-white",
                              "dark:border-slate-700",
                              "dark:bg-slate-800"
                            )}
                          >
                            {item.company_logo ? (
                              <img
                                src={item.company_logo}
                                alt=""
                                className="h-full w-full object-contain p-1.5"
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <FaBriefcase
                                size={14}
                                className="text-blue-500"
                              />
                            )}
                          </div>

                          {/* Job Information */}

                          <div className="min-w-0 flex-1">
                            {/* Title */}

                            <div className="flex items-center gap-2">
                              <p
                                className={clsx(
                                  "truncate text-sm font-semibold",
                                  "text-slate-800",
                                  "group-hover:text-blue-600",
                                  "dark:text-slate-100",
                                  "dark:group-hover:text-blue-400"
                                )}
                              >
                                {item.title ||
                                  "Untitled Job"}
                              </p>

                              <span
                                className={clsx(
                                  "shrink-0 rounded-full px-2 py-0.5",
                                  "text-[10px] font-medium",
                                  "bg-blue-50 text-blue-600",
                                  "dark:bg-blue-500/10",
                                  "dark:text-blue-400"
                                )}
                              >
                                {item.requirement_type ||
                                  "Job"}
                              </span>
                            </div>

                            {/* Company + Location */}

                            <div className="mt-1 flex min-w-0 items-center gap-2 text-xs">
                              {item.company_name && (
                                <span className="truncate font-medium text-slate-500 dark:text-slate-400">
                                  {item.company_name}
                                </span>
                              )}

                              {item.company_name &&
                                item.location && (
                                  <span className="text-slate-300 dark:text-slate-600">
                                    •
                                  </span>
                                )}

                              {item.location && (
                                <span className="truncate text-slate-400 dark:text-slate-500">
                                  📍 {item.location}
                                </span>
                              )}
                            </div>

                            {/* Skills */}

                            {skills.length > 0 && (
                              <div className="mt-2 flex gap-1.5 overflow-hidden">
                                {skills.map((skill) => (
                                  <span
                                    key={
                                      skill._id ||
                                      skill.skillName
                                    }
                                    className={clsx(
                                      "shrink-0 rounded-md px-1.5 py-0.5",
                                      "text-[10px] font-medium",
                                      "bg-slate-100 text-slate-500",
                                      "dark:bg-slate-800",
                                      "dark:text-slate-400"
                                    )}
                                  >
                                    {skill.skillName}
                                  </span>
                                ))}

                                {item.skills?.length >
                                  4 && (
                                    <span className="shrink-0 px-1 py-0.5 text-[10px] text-slate-400">
                                      +
                                      {item.skills.length -
                                        4}
                                    </span>
                                  )}
                              </div>
                            )}

                            {/* Salary */}

                            {(item.salaryRange?.minSalary ||
                              item.salaryRange?.maxSalary) && (
                                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  💰{" "}
                                  {formatSalary(
                                    item.salaryRange
                                      .minSalary
                                  )}
                                  {" – "}
                                  {formatSalary(
                                    item.salaryRange
                                      .maxSalary
                                  )}

                                  <span className="ml-1 text-[10px] font-normal text-slate-400">
                                    / year
                                  </span>
                                </p>
                              )}
                          </div>

                          {/* Arrow */}

                          <span
                            className={clsx(
                              "mt-3 shrink-0 text-lg transition-transform",
                              "text-slate-300",
                              "group-hover:translate-x-0.5",
                              "group-hover:text-blue-500",
                              "dark:text-slate-600",
                              "dark:group-hover:text-blue-400"
                            )}
                          >
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

              {/* =================================================
                  RECRUITER / OTHER ROLE → SHOW CANDIDATES
              ================================================= */}

              {!loading &&
                currentUser?.role !== "candidate" &&
                results.talents.length > 0 && (
                  <div>
                    {/* Section Header */}

                    <div
                      className={clsx(
                        "sticky top-0 z-10 flex items-center gap-2",
                        "border-b px-4 py-2.5",

                        "border-slate-100 bg-slate-50/95",
                        "text-[11px] font-bold uppercase tracking-wider",
                        "text-slate-500 backdrop-blur-sm",

                        "dark:border-slate-800",
                        "dark:bg-slate-900/95",
                        "dark:text-slate-500"
                      )}
                    >
                      <FaUser
                        size={11}
                        className="text-emerald-500"
                      />

                      <span>
                        Candidates
                      </span>
                    </div>

                    {/* Candidates */}

                    {results.talents.map((item) => {
                      const skills =
                        item.skills?.slice(0, 4) || [];

                      const profileImage =
                        item.profilePictureDetails?.url ||
                        item.profilePicture;

                      const initials =
                        item.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase() || "U";

                      const currentRole =
                        item.experience?.[0]?.jobRole ||
                        "Candidate";

                      const location = item.location
                        ? [
                          item.location.city,
                          item.location.state,
                        ]
                          .filter(Boolean)
                          .join(", ")
                        : null;

                      return (
                        <button
                          type="button"
                          key={item._id || item.id}
                          onClick={() =>
                            handleSelect(item, "talent")
                          }
                          className={clsx(
                            "group flex w-full items-start gap-3",
                            "border-b px-4 py-3.5 text-left",
                            "transition-all",

                            "border-slate-100",
                            "hover:bg-emerald-50",

                            "dark:border-slate-800/70",
                            "dark:hover:bg-slate-800/80"
                          )}
                        >
                          {/* Profile Picture */}

                          <div
                            className={clsx(
                              "h-10 w-10 shrink-0 overflow-hidden rounded-full",
                              "border border-slate-200 bg-emerald-50",
                              "dark:border-slate-700",
                              "dark:bg-emerald-500/10"
                            )}
                          >
                            {profileImage &&
                              !profileImage
                                .toLowerCase()
                                .includes(".pdf") ? (
                              <img
                                src={profileImage}
                                alt=""
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              <div
                                className={clsx(
                                  "flex h-full w-full items-center justify-center",
                                  "text-xs font-bold",
                                  "text-emerald-600",
                                  "dark:text-emerald-400"
                                )}
                              >
                                {initials}
                              </div>
                            )}
                          </div>

                          {/* Candidate Information */}

                          <div className="min-w-0 flex-1">
                            {/* Name + Availability */}

                            <div className="flex items-center gap-2">
                              <p
                                className={clsx(
                                  "truncate text-sm font-semibold",
                                  "text-slate-800",
                                  "group-hover:text-emerald-600",
                                  "dark:text-slate-100",
                                  "dark:group-hover:text-emerald-400"
                                )}
                              >
                                {item.name ||
                                  item.fullName ||
                                  "Untitled Candidate"}
                              </p>

                              {item.availabilityStatus && (
                                <span
                                  className={clsx(
                                    "shrink-0 rounded-full px-2 py-0.5",
                                    "text-[10px] font-medium",

                                    String(
                                      item.availabilityStatus
                                    ).toLowerCase() ===
                                      "closed"
                                      ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
                                      : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                  )}
                                >
                                  {String(
                                    item.availabilityStatus
                                  ).toLowerCase() ===
                                    "closed"
                                    ? "Unavailable"
                                    : "Available"}
                                </span>
                              )}
                            </div>

                            {/* Role */}

                            <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                              {currentRole}
                            </p>

                            {/* Location + Environment + Job Type */}

                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500">
                              {location && (
                                <span className="truncate">
                                  📍 {location}
                                </span>
                              )}

                              {item.workEnvironment && (
                                <>
                                  <span className="text-slate-300 dark:text-slate-700">
                                    •
                                  </span>

                                  <span>
                                    {item.workEnvironment}
                                  </span>
                                </>
                              )}

                              {item.preferences?.jobType && (
                                <>
                                  <span className="text-slate-300 dark:text-slate-700">
                                    •
                                  </span>

                                  <span>
                                    {item.preferences.jobType}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Skills */}

                            {skills.length > 0 && (
                              <div className="mt-2 flex gap-1.5 overflow-hidden">
                                {skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className={clsx(
                                      "shrink-0 rounded-md px-1.5 py-0.5",
                                      "text-[10px] font-medium",
                                      "bg-emerald-50 text-emerald-600",
                                      "dark:bg-emerald-500/10",
                                      "dark:text-emerald-400"
                                    )}
                                  >
                                    {skill}
                                  </span>
                                ))}

                                {item.skills?.length >
                                  4 && (
                                    <span className="shrink-0 px-1 py-0.5 text-[10px] text-slate-400">
                                      +
                                      {item.skills.length -
                                        4}
                                    </span>
                                  )}
                              </div>
                            )}

                            {/* Salary Preference */}

                            {item.preferences?.salaryRange
                              ?.min && (
                                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                  💰 ₹
                                  {(
                                    item.preferences
                                      .salaryRange.min / 1000
                                  ).toFixed(0)}
                                  K – ₹
                                  {(
                                    item.preferences
                                      .salaryRange.max / 1000
                                  ).toFixed(0)}
                                  K

                                  <span className="ml-1 text-[10px] font-normal text-slate-400">
                                    expected
                                  </span>
                                </p>
                              )}
                          </div>

                          {/* Arrow */}

                          <span
                            className={clsx(
                              "mt-3 shrink-0 text-lg transition-transform",
                              "text-slate-300",
                              "group-hover:translate-x-0.5",
                              "group-hover:text-emerald-500",
                              "dark:text-slate-600",
                              "dark:group-hover:text-emerald-400"
                            )}
                          >
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

