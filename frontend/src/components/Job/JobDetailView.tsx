import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";
import NoJobSelected from "./NoJobSelected";
import JobDetail from "./JobDetails";
import { useUserStore } from "../../store/UserStore";

const JobDetailView = () => {
  // eslint-disable-line
  /* tslint:disable-next-line */
  const [searchParams] = useSearchParams(); // eslint-disable-line
  const [jobData, setJobData] = useState<Job | null>();
  const [matchedArray, setMatchedArray] = useState<string[]>([]);
  const [skillMatchPercentage, setSkillMatchPercentage] = useState<number>(0);
  //   let job: Job | undefined | null = null;
  const jobsList = useJobStore((state) => state.jobList);

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (!!jobId) {
      const job = jobsList.find((item) => item._id === jobId);
      setJobData(job);
      console.log("jobData after choosing job", job);

      if (job) {
        const jobSkills = job.skills;
        const userSkills = useUserStore.getState().skills;
        const m = jobSkills.filter((value) => userSkills.includes(value));
        setMatchedArray(m);
        const matchCount = m.length;
        const s = (matchCount / jobSkills.length) * 100;
        setSkillMatchPercentage(s);
        console.log("matchCount", matchCount);
        console.log("for user: ", useUserStore.getState().name);
        console.log("user skills are: ", userSkills);
        console.log("percent:  ", skillMatchPercentage);
      }
    } else {
      setJobData(null);
    }
  }, [searchParams, jobsList]);

  return (
    <>
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
    </>
  );
};

export default JobDetailView;
