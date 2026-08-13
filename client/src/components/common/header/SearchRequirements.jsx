import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaBriefcase, FaUser } from "react-icons/fa";
import clsx from "clsx";
import { API } from "@/services/api";

const SearchDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ opportunities: [], talents: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ opportunities: [], talents: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/api/search?q=${query}`);
        const apiData = data?.data || {};

        setResults({
          opportunities: apiData.opportunities || [],
          talents: apiData.talents || [],
        });
      } catch (err) {
        console.error("Search failed:", err);
        setResults({ opportunities: [], talents: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item, type) => {
    onSelect?.({ ...item, type });
    setQuery("");
    setIsOpen(false);
    setResults({ opportunities: [], talents: [] });
  };

  const clearSearch = () => {
    setQuery("");
    setResults({ opportunities: [], talents: [] });
    inputRef.current?.focus();
  };

  const hasResults =
    results.opportunities.length > 0 || results.talents.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "flex items-center gap-2 rounded-full text-sm transition-all duration-200",
          "border border-slate-600/80 bg-slate-800/60 text-slate-300",
          "hover:bg-slate-700/80 hover:border-slate-500 hover:text-white",
          "px-3 py-1.5 sm:px-4",
          isOpen && "bg-slate-700 border-blue-500 text-white ring-2 ring-blue-500/30"
        )}
      >
        <FaSearch size={13} className="opacity-80 shrink-0" />
        <span className="hidden sm:inline">Search...</span>
      </button>

      {/* Dropdown */}
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">

            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
              <FaSearch size={14} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs or candidates..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-100 placeholder:text-slate-500"
              />
              {query && (
                <button onClick={clearSearch} className="text-slate-400 hover:text-white">
                  <FaTimes size={13} />
                </button>
              )}
            </div>

            {/* Count Badge */}
            {!loading && query && hasResults && (
              <div className="px-4 py-2 text-xs text-slate-400 border-b border-slate-700/70 bg-slate-900/40">
                {results.opportunities.length > 0 && (
                  <span>{results.opportunities.length} Job{results.opportunities.length > 1 ? "s" : ""}</span>
                )}
                {results.opportunities.length > 0 && results.talents.length > 0 && (
                  <span className="mx-1.5">•</span>
                )}
                {results.talents.length > 0 && (
                  <span>{results.talents.length} Candidate{results.talents.length > 1 ? "s" : ""}</span>
                )}
              </div>
            )}

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {loading && (
                <div className="px-4 py-6 text-center text-sm text-slate-400">
                  Searching...
                </div>
              )}

              {!loading && !query && (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  Type to search jobs or candidates
                </div>
              )}

              {!loading && query && !hasResults && (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  No results found
                </div>
              )}

              {/* Opportunities */}
              {!loading && results.opportunities.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/50">
                    Job Opportunities
                  </div>
                  {results.opportunities.map((item) => (
                    <button
                      key={item._id || item.id}
                      onClick={() => handleSelect(item, "opportunity")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/70 hover:text-white text-left transition-colors"
                    >
                      <FaBriefcase size={13} className="text-blue-400 shrink-0" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="truncate font-medium">
                          {item.title || "Untitled Job"}
                        </span>
                        {item.company_name && (
                          <span className="text-xs text-slate-500 truncate">
                            {item.company_name}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Talents */}
              {!loading && results.talents.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/50">
                    Candidates
                  </div>
                  {results.talents.map((item) => (  
                    <button
                      key={item._id || item.id}
                      onClick={() => handleSelect(item, "talent")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/70 hover:text-white text-left transition-colors"
                    >
                      <FaUser size={13} className="text-emerald-400 shrink-0" />
                      <span className="truncate">
                        {item.name || item.fullName || "Untitled Candidate"}
                      </span>
                    </button>
                  ))}
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