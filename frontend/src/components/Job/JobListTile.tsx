import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useUserStore } from "../../store/UserStore";

interface Job {
  _id: string;
  type?: string; // Optional type property to prevent errors
  managerAffilication?: string;
  name: string;
  status: string;
  pay?: string;
}

interface Application {
  jobid: string;
  applicantid: string;
  status: string;
}

const getAffiliationTag = (tag?: string): string => {
  return tag ? tag.split("-").join(" ").toUpperCase() : "UNKNOWN AFFILIATION";
};

const JobListTile = ({ data }: { data: Job }) => {
  const [active, setActive] = useState<boolean>(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const userId = useUserStore((state) => state.id);
  const userRole = useUserStore((state) => state.role);
  
  const applicationList = useApplicationStore((state) => state.applicationList);

  // Find application for the current job and user
  useEffect(() => {
    const temp = applicationList.find(
      (item) => item.jobid === data._id && item.applicantid === userId
    );
    setApplication(temp || null);
  }, [data, applicationList, userId]);

  // Set active job based on search params
  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams, data._id]);

  // Handle click event to set active job
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams({ jobId: data._id });
  };

  // Get affiliation color based on tag
  const getAffiliationColour = (tag?: string) => {
    switch (tag) {
      case "nc-state-dining":
        return "bg-[#FF2A2A]/10";
      case "campus-enterprises":
        return "bg-[#91B0FF]/10";
      case "wolfpack-outfitters":
        return "bg-[#FBD71E]/10";
      default:
        return "bg-[#FF2A2A]/10";
    }
  };

  return (
    <div className="my-3" onClick={handleClick}>
      <div className={`p-3 bg-white rounded-xl shadow-sm ${active ? "border-black" : "border-white"} border`}>
        <div className="flex flex-row">
          <div className="w-4/6">
            <div className={`w-fit ${getAffiliationColour(data.managerAffilication)} rounded-2xl px-3 py-0`}>
              <p className="inline text-xs">{getAffiliationTag(data.managerAffilication)}</p>
            </div>
            <div className="h-1"></div>
            <div className="pl-2">
              <p className="text-base">
                <b>Role:</b> {data.name}
              </p>
              <p className="text-base">
                <b>Job Status:</b>
                <span className={`${data.status === "closed" ? "text-[#FF5353]" : ""}`}>
                  &nbsp;<span className="capitalize">{data.status}</span>
                </span>
              </p>
              {/* Fixing split error by adding fallback */}
              <p className="text-base">
                <b>Type:</b> <span className="capitalize">{data.type?.split("-").join(" ") || "Unknown Type"}</span>
              </p>
              {userRole === "Applicant" && (
                <p className="text-base">
                  <b>Application Status:</b>&nbsp;
                  {application?.status === "accepted" || application?.status === "rejected"
                    ? application?.status
                    : '"In Review"'}
                </p>
              )}
            </div>
          </div>

          <div className="w-2/6 flex flex-col-reverse text-right">
            {/* Action buttons */}
            {/* Add action button logic here if needed */}
            <p className="text-3xl">{data.pay || "0"}$/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;
