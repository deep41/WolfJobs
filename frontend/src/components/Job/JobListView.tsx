import { useEffect, useState, useMemo } from "react";
import JobListTile from "./JobListTile";

interface Job {
  _id: string;
  type: string;
  // Add other job properties as needed
}

interface JobsListViewProps {
  jobsList: Job[];
  title?: string;
}

type FilterType = 'all' | 'full-time' | 'part-time';

const JobsListView: React.FC<JobsListViewProps> = ({ jobsList, title = "All jobs" }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredJobs = useMemo(() => {
    if (filter === "all") return jobsList;
    return jobsList.filter(job => job.type === filter);
  }, [jobsList, filter]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const filterButtons: { label: string; value: FilterType }[] = [
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
            className={`mr-2 px-3 py-1 rounded ${
              filter === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {filteredJobs.map((job) => (
        <JobListTile data={job} key={job._id} />
      ))}
    </div>
  );
};

export default JobsListView;
