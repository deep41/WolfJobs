import React, { useState, useMemo, useEffect } from "react";
import JobListTile from "./JobListTile";

interface Job {
  _id: string;
  type: string;
  affiliationTag?: string; // Optional affiliationTag property
}

interface JobsListViewProps {
  jobsList: Job[];
  title?: string;
}

type FilterType = "all" | "full-time" | "part-time";

const JobsListView: React.FC<JobsListViewProps> = ({ jobsList = [], title = "All jobs" }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  // Memoize filtered jobs based on the selected filter
  const filteredJobs = useMemo(() => {
    return filter === "all" ? jobsList : jobsList.filter((job) => job.type === filter);
  }, [jobsList, filter]);

  // Log updates to jobsList
  useEffect(() => {
    console.log("Jobs list updated:", jobsList);
  }, [jobsList]);

  // Handler for changing the job filter
  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  // Filter button configuration
  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Full Time", value: "full-time" },
    { label: "Part Time", value: "part-time" },
  ];

  return (
    <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
      <h2 className="text-2xl py-4">{title}</h2>
      <div className="mb-4">
        {filterButtons.map(({ label, value }) => (
          <button
            key={value}
            className={`mr-2 px-3 py-1 rounded ${filter === value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => handleFilterChange(value as FilterType)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No jobs available for this filter.</p>
      ) : (
        filteredJobs.map((job) => <JobListTile key={job._id} data={job} />)
      )}
    </div>
  );
};

export default JobsListView;





