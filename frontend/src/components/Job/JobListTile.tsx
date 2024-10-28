import { useEffect, useState } from "react";
import { HiOutlineArrowRight, HiOutlineBookmark } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";

const JobListTile = (props: any) => {
  // const { data, action }: { data: Job; action: string | undefined } = props;
  const { data }: { data: Job } = props;
  let action = "view-more";

  const [active, setActive] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useUserStore((state) => state.id);

  const userRole = useUserStore((state) => state.role);

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );

  const [application, setApplication] = useState<Application | null>(null);
  const [isJobSaved, setIsJobSaved] = useState<boolean>(false);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) => {
        return item.jobid === data._id && item.applicantid === userId;
      }
    );
    setApplication(temp || null);
  }, [data, applicationList, userId]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const jobExists = savedJobs.some((job: Job) => job._id === data._id);
    setIsJobSaved(jobExists);
  }, [data]);

  const affilation = data.managerAffilication;
  const role = data.name;
  const jobType = data?.type?.split("-")?.join(" ");
  const pay = data.pay || "0";

  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams, data]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setSearchParams({ jobId: data._id });
  };

  const handleSaveJob = (e: any) => {
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const jobIndex = savedJobs.findIndex((job: Job) => job._id === data._id);

    if (jobIndex === -1) {
      // Job does not exist, save it
      savedJobs.push(data);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsJobSaved(true);
      toast.success("Job saved successfully!");
    } else {
      // Job exists, unsave it
      savedJobs.splice(jobIndex, 1);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsJobSaved(false);
      toast.info("Job unsaved.");
    }
  };

  const getAffiliationTag = (tag: string) => {
    return tag.split("-").join(" ");
  };

  const getAffiliationColour = (tag: string) => {
    if (tag === "nc-state-dining") {
      return "bg-[#FF2A2A]/10";
    } else if (tag === "campus-enterprises") {
      return "bg-[#91B0FF]/10";
    } else if (tag === "wolfpack-outfitters") {
      return "bg-[#FBD71E]/10";
    }
    return "bg-[#FF2A2A]/10";
  };

  // const isClosed = data.status !== "0";

  const handleKnowMore = (e: any) => {
    e.stopPropagation();
    console.log("Know more");
  };
  const handleFillQuestionnaire = (e: any) => {
    e.stopPropagation();
    console.log("Fill Questionnaire");
  };
  const handleViewApplication = (e: any) => {
    e.stopPropagation();
    console.log("View Application");
  };

  return (
    <div className="my-3 " onClick={handleClick}>
      <div
        className={`p-3 bg-white rounded-xl shadow-sm ${
          active ? "border-black " : "border-white"
        } border`}
      >
        <div className="flex flex-row">
          <div className="w-4/6 ">
            <div
              className={`w-fit ${getAffiliationColour(
                affilation
              )} rounded-2xl px-3 py-0`}
            >
              <p className="inline text-xs" style={{ width: "fit-content" }}>
                {getAffiliationTag(affilation).toUpperCase()}
              </p>
            </div>
            <div className="h-1"></div>
            <div className="pl-2">
              <p className="text-base">
                <b>Role:</b> {role}
              </p>
              <p className="text-base">
                <b>Job Status:</b>
                <span
                  className={`${
                    data.status === "closed" ? "text-[#FF5353]" : ""
                  }`}
                >
                  &nbsp;<span className="capitalize">{data.status}</span>
                </span>
              </p>
              <p className="text-base">
                <b>Type:</b> <span className="capitalize"> {jobType} </span>
              </p>
              <p className="text-base">
                {userRole === "Applicant" &&
                  ((application !== null &&
                    application?.status === "accepted") ||
                  application?.status === "rejected" ? (
                    <span className="capitalize">
                      <b>Application Status:</b>&nbsp;{application?.status}
                    </span>
                  ) : (
                    <>
                      <b>Application Status:</b>&nbsp;"In Review"
                    </>
                  ))}
              </p>
            </div>
          </div>
          <div className="w-2/6  flex flex-col-reverse text-right">
            {action === "view-more" || !action ? (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                onClick={handleKnowMore}
              >
                <HiOutlineArrowRight />
                Know more&nbsp;
              </p>
            ) : null}
            {action === "view-questionnaire" ? (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#00B633]"
                onClick={handleFillQuestionnaire}
              >
                <HiOutlineArrowRight />
                Fill Questionnaire&nbsp;
              </p>
            ) : null}
            {action === "view-application" ? (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                onClick={handleViewApplication}
              >
                <HiOutlineArrowRight />
                View Application&nbsp;
              </p>
            ) : null}
            <p className="text-3xl">{pay}$/hr</p>
            <button
              className="ml-4 inline-flex items-center text-black cursor-pointer"
              onClick={handleSaveJob}
            >
              <HiOutlineBookmark className="mr-1 text-2xl" />
              <span className="text-black">
                {isJobSaved ? "Unsave Job" : "Save Job"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;
