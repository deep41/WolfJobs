import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useSearchParams } from "react-router-dom";

const JobFinalReview = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [acceptedList, setAcceptedList] = useState<Application[]>([]);
  const [rejectedList, setRejectedList] = useState<Application[]>([]);
  const [searchParams] = useSearchParams();

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setAcceptedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "accepted"
      )
    );
    setRejectedList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rejected"
      )
    );
  }, [searchParams]);

  return (
    <>
      <div className="text-xl">Review</div>
      <div className="text-xl">Accepted Candidates</div>
      {acceptedList.length == 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {acceptedList?.map((item: Application) => {
        return (
          <div className=" p-1">
            <div className="bg-white my-2 mx-1 p-2 rounded-lg">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-xl">Rejected Candidates</div>
      {rejectedList.length == 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {rejectedList?.map((item) => {
        return (
          <div className=" p-1">
            <div className="bg-white my-2 mx-1 p-2 rounded-lg">
              <div className="flex flex-col">
                <div>
                  <span className="font-bold">Name: </span> {item.applicantname}
                </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>
                  <span className="font-bold">Email: </span>
                  {item.applicantemail}
                </div>
                {!!item?.applicantSkills && (
                  <div>
                    <span className="font-bold">Skills: </span>
                    {item.applicantSkills}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobFinalReview;
