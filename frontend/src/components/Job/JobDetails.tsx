import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Stack, TextField } from "@mui/material";
import JobManagerView from "./JobManagerView";
import "./Job.css";

type FormValues = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

const JobDetail = (props: any) => {
  const {
    jobData,
    matchedSkills,
    matchedpercent,
  }: {
    jobData: Job;
    matchedSkills: string[];
    matchedpercent: number;
  } = props;
  console.log("matchedperc", matchedpercent);
  const jobType = jobData.type === "part-time" ? "Part time" : "Full time";

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );

  const applicantemail = useUserStore((state) => state.email);
  const userId = useUserStore((state) => state.id);
  const applicantname = useUserStore((state) => state.name);
  const applicantSkills = useUserStore((state) => state.skills);
  const applicantNumber = useUserStore((state) => state.phonenumber);
  const role = useUserStore((state) => state.role);

  const [application, setApplication] = useState<Application | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const userRole = useUserStore((state) => state.role);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) => {
        return item.jobid === jobData._id && item.applicantid === userId;
      }
    );
    setApplication(temp || null);
  }, [jobData]);

  useEffect(() => {
    if (role === "Manager") {
      setShowQuestionnaire(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) =>
          item.jobid === jobData._id &&
          item.status === "screening" &&
          item.applicantid === userId
      );
      setShowQuestionnaire(!!temp || false);
    }
  }, [jobData, applicationList, userId]);

  useEffect(() => {
    if (role === "Manager") {
      setShowApply(false);
    } else {
      const temp: Application | undefined = applicationList.find(
        (item) => jobData._id === item.jobid
      );
      setShowApply(!temp || false);
    }
  }, [jobData]);

  const form = useForm<FormValues>({
    defaultValues: {
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
  });
  const { register, handleSubmit } = form;

  const handleApplyJob = (e: any) => {
    e.preventDefault();
    const body = {
      applicantname,
      applicantid: userId,
      applicantemail,
      applicantSkills,
      phonenumber: applicantNumber,
      managerid: jobData.managerid,
      jobname: jobData.name,
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/createapplication", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        location.reload();
        toast.success("Applied successfully");
      });
  };

  const handleAnswerQuestionnaire = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: application?._id,
      status: "grading",
      answer1: data.answer1,
      answer2: data.answer2,
      answer3: data.answer3,
      answer4: data.answer4,
    };

    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Accepted candidate");
        location.reload();
        return;
      }
      toast.error("Failed to accept candidate");
    });
  };

  return (
    <>
      <div className="w-7/12">
        <div className="flex flex-col m-4 ">
          <div className="text-xl border-b border-gray-300 font-bold">
            Job Details
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold text-lg">Role:</span>&nbsp;
                {jobData.name}
              </div>
              <div>
                <span className="font-semibold text-lg">Job Status:</span>
                &nbsp;
                <span
                  className={`capitalize ${
                    jobData.status === "open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {jobData.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-lg capitalize">Type:</span>
                &nbsp;
                {jobType}
              </div>
              <div>
                <span className="font-semibold text-lg">Location:</span>&nbsp;
                {jobData.location}
              </div>
              <div>
                {userRole === "Applicant" &&
                  (application?.status === "accepted" ||
                  application?.status === "rejected" ? (
                    <>
                      <b>Application Status:</b>
                      <span className="capitalize">
                        &nbsp;{application?.status}
                      </span>
                    </>
                  ) : (
                    <>
                      <b>Application Status:</b>&nbsp;In Review
                    </>
                  ))}
              </div>
            </div>
            <div className="text-3xl p-4">{jobData.pay}$/hr</div>
          </div>
          <div className="h-6" />
          <div className="text-lg border-b border-gray-300 mb-2 font-bold">
            Skills
          </div>
          <div className="mx-2 mb-2">
            {jobData.skills && jobData.skills.length > 0 ? (
              jobData.skills.map((skill, index) => (
                <span key={index} className="mr-2">
                  {skill}
                </span>
              ))
            ) : (
              <span>No skills required.</span>
            )}
          </div>
          <div className="text-lg border-b border-gray-300 mb-2 font-bold">
            Description
          </div>
          <div className="text-[#686868] mx-2">{jobData.description}</div>
          <div
            className="text-lg border-b border-gray-300 mb-2 font-bold"
            id="percontainer"
          >
            <span className="perc">Skills {matchedpercent} % matched</span>
          </div>
          <div className="mx-2 mb-2">
            {matchedSkills.length > 0 ? (
              <div>
                {matchedSkills.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">{skill}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>

      {role === "Applicant" && jobData.status === "open" && (
        <div>
          {showQuestionnaire && (
            <div className="w-7/12 mb-10">
              <div className="flex flex-col m-4 ">
                <div className="text-xl border-b border-gray-300 font-bold">
                  Fill Questionnaire
                </div>

                <form
                  onSubmit={handleSubmit(handleAnswerQuestionnaire)}
                  noValidate
                >
                  <div className="flex flex-row justify-between m-2">
                    <div className="flex flex-col ">
                      <div>
                        <span className="font-semibold text-lg">1:</span>
                        &nbsp;
                        {jobData.question1}
                      </div>
                    </div>
                  </div>
                  <Stack spacing={2} width={400}>
                    <TextField
                      label="Answer 1"
                      type="text"
                      {...register("answer1")}
                      sx={{
                        "& label": {
                          paddingLeft: (theme) => theme.spacing(1),
                        },
                        "& input": {
                          paddingLeft: (theme) => theme.spacing(2.5),
                        },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />

                    <div className="flex flex-row justify-between m-2">
                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">2:</span>
                          &nbsp;
                          {jobData.question2}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label="Answer 2"
                      type="text"
                      {...register("answer2")}
                      sx={{
                        "& label": {
                          paddingLeft: (theme) => theme.spacing(1),
                        },
                        "& input": {
                          paddingLeft: (theme) => theme.spacing(2.5),
                        },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />

                    <div className="flex flex-row justify-between m-2">
                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">3:</span>
                          &nbsp;
                          {jobData.question3}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label="Answer 3"
                      type="text"
                      {...register("answer3")}
                      sx={{
                        "& label": {
                          paddingLeft: (theme) => theme.spacing(1),
                        },
                        "& input": {
                          paddingLeft: (theme) => theme.spacing(2.5),
                        },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <div className="flex flex-row justify-between m-2">
                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">4:</span>
                          &nbsp;
                          {jobData.question4}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label="Answer 4"
                      type="text"
                      {...register("answer4")}
                      sx={{
                        "& label": {
                          paddingLeft: (theme) => theme.spacing(1),
                        },
                        "& input": {
                          paddingLeft: (theme) => theme.spacing(2.5),
                        },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        background: "#FF5353",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "16px",
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          )}

          {showApply && (
            <Button
              onClick={handleApplyJob}
              type="button"
              variant="contained"
              style={{
                background: "#FF5353",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "18px",
                width: "250px",
              }}
            >
              Apply Now
            </Button>
          )}
        </div>
      )}

      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && (
          <>
            <JobManagerView jobData={jobData} />
            <div className="h-40"></div>
          </>
        )}
    </>
  );
};

export default JobDetail;
