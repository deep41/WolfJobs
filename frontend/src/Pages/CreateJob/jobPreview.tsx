import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { s } from "vitest/dist/reporters-5f784f42.js";

type FormValuesQuestions = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

type FormValuesDetails = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  skills: string;
  description: string;
};

const JobPreview = () => {
  const location = useLocation();
  const { state } = location;
  const {
    details,
    questions,
  }: { details: FormValuesDetails; questions: FormValuesQuestions } = state;

  const navigate = useNavigate();

  const userId = useUserStore((state) => state.id);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = `http://localhost:8000/api/v1/users/createjob`;
    const body = {
      id: userId,
      name: details.role,
      type: details.jobtype,
      location: details.location,
      skills: details.skills,
      description: details.description,
      pay: details.pay,
      question1: questions.question1,
      question2: questions.question2,
      question3: questions.question3,
      question4: questions.question4,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Job posting failed");
        return;
      }
      toast.success("Job created");
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="flex flex-col m-10 ">
            <div className="text-xl border-b border-gray-300 font-bold">
              Job Details
            </div>
            <div className="flex flex-row justify-between m-2">
              <div className="flex flex-col ">
                <div>
                  <span className="font-semibold text-lg">Role:</span>&nbsp;
                  {details["role"]}
                </div>
                <div>
                  <span className="font-semibold text-lg">Job Status:</span>
                  &nbsp;
                  <span className={`capitalize ${"text-green-500"}`}>open</span>
                </div>
                <div>
                  <span className="font-semibold text-lg capitalize">
                    Type:
                  </span>
                  &nbsp;
                  <span className="capitalize">
                    {details["jobtype"].split("-").join(" ")}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-lg">Location:</span>
                  &nbsp;
                  {details["location"]}
                </div>
              </div>
              <div className="text-3xl p-4">{details["pay"]}$/hr</div>
            </div>
            <div className="h-6" />
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Skills
            </div>
            <div className="text-[#686868] mx-2">{details["skills"]}</div>
            <div className="h-6" />
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Description
            </div>
            <div className="text-[#686868] mx-2">{details["description"]}</div>
            <div className="h-6" />
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Questions
            </div>
            <div className="text-[#686868] mx-2">
              1: {questions["question1"]}
            </div>
            <div className="text-[#686868] mx-2">
              2: {questions["question2"]}
            </div>
            <div className="text-[#686868] mx-2">
              3: {questions["question3"]}
            </div>
            <div className="text-[#686868] mx-2">
              4: {questions["question4"]}
            </div>
            <div className="mt-4 ">
              <Button
                onClick={onSubmit}
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
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;
