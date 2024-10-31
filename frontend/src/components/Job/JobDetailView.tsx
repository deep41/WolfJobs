import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import NoJobSelected from "./NoJobSelected";
import JobDetail from "./JobDetails";
import { useUserStore } from "../../store/UserStore";

const JobDetailView = () => {
  const [searchParams] = useSearchParams();
  const [jobData, setJobData] = useState<Job | null>(null);
  const [matchedArray, setMatchedArray] = useState<string[]>([]);
  const [skillMatchPercentage, setSkillMatchPercentage] = useState<number>(0);
  const jobsList = useJobStore((state) => state.jobList);

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (!!jobId) {
      const job = jobsList.find((item) => item._id === jobId);
      setJobData(job || null);

      if (job) {
        const jobSkills = job.skills;
        const userSkills = useUserStore.getState().skills;
        const matchedSkills = jobSkills.filter((value) =>
          userSkills.includes(value)
        );
        setMatchedArray(matchedSkills);

        const matchCount = matchedSkills.length;
        const matchPercentage = (matchCount / jobSkills.length) * 100;
        setSkillMatchPercentage(matchPercentage);
      }
    } else {
      setJobData(null);
    }
  }, [searchParams, jobsList]);

  return (
    <div className="w-8/12" style={{ height: "calc(100vh - 72px)" }}>
      {!jobData && <NoJobSelected />}
      {!!jobData && (
        <JobDetail
          jobData={jobData}
          matchedSkills={matchedArray}
          matchedpercent={skillMatchPercentage}
        />
      )}
    </div>
  );
};

export default JobDetailView;
