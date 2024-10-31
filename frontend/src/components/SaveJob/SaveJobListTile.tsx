import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useApplicationStore } from "../../store/ApplicationStore";
import { useUserStore } from "../../store/UserStore";

const SaveJobListTile = ({ data }: { data: Job }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [active, setActive] = useState<boolean>(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useUserStore((state) => state.id);
  const userRole = useUserStore((state) => state.role);
  const applicationList: Application[] = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) => item.jobid === data._id && item.applicantid === userId
    );
    setApplication(temp || null);
  }, [data, applicationList, userId]);

  const affilation = data.managerAffilication;
  const role = data.name;
  const jobType = data?.type?.split("-")?.join(" ");
  const pay = data.pay || "0";

  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams, data]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/explore?jobId=${data._id}`);
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

  return (
    <div className="my-3" onClick={handleClick}>
      <div className={`p-3 bg-white rounded-xl shadow-sm ${active ? "border-black" : "border-white"} border`}>
        <div className="flex flex-row">
          <div className="w-4/6 ">
            <div className={`w-fit ${getAffiliationColour(affilation)} rounded-2xl px-3 py-0`}>
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
                <span className={`${data.status === "closed" ? "text-[#FF5353]" : ""}`}>
                  &nbsp;<span className="capitalize">{data.status}</span>
                </span>
              </p>
              <p className="text-base">
                <b>Type:</b> <span className="capitalize"> {jobType} </span>
              </p>
              {userRole === "Applicant" && (
                <p className="text-base">
                  <b>Application Status:</b>&nbsp;
                  {application ? <span className="capitalize">{application?.status}</span> : "In Review"}
                </p>
              )}
            </div>
          </div>
          <div className="w-2/6 flex flex-col-reverse text-right">
            <p className="text-3xl">{pay}$/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobListTile;
