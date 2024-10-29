import { useEffect } from "react";
import SaveJobListTile from "./SaveJobListTile";

const SaveJobListView = (props: any) => {
  const { jobsList, title } = props;

  useEffect(() => {
    console.log(jobsList);
  }, [jobsList]);

  return (
    <>
      <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
        <div className="text-2xl py-4">{title || "Saved jobs"}</div>
        {jobsList?.map((job: Job) => {
          return <SaveJobListTile data={job} key={job._id} />;
        })}
      </div>
    </>
  );
};

export default SaveJobListView;
