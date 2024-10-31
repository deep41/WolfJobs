import { toast } from "react-toastify";
import { createJobURL, loginURL } from "../api/constants";
import { getFormBody } from "./apiUtils";

export const createJob = async (
  name: string,
  id: string,
  status: string,
  location: string,
  skills: string,
  description: string,
  pay: string,
  type: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  affiliation: string,
  navigate: any
) => {
  const url = createJobURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      name,
      id,
      status,
      location,
      skills,
      description,
      pay,
      type,
      question1,
      question2,
      question3,
      question4,
      affiliation,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === true) {
        // success
        navigate("/dashboard");
        toast.success("Job created");
      }
    });
};

export async function login(email: string, password: string, navigate: any) {
  const url = loginURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Login data", data);
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
      }
    });
}
