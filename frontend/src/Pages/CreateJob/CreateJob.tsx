import { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  skills: string;
  description: string;
};

const CreateJob = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      role: "",
      jobtype: "",
      location: "",
      pay: "",
      skills: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [jobType, setJobType] = useState("full-time");

  const onSubmit = (data: FormValues) => {
    const body = {
      role: data.role,
      jobtype: jobType,
      location: data.location,
      pay: data.pay,
      skills: data.skills,
      description: data.description,
    };
    navigate("/job_questionnaire", {
      state: body,
    });
  };

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
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div
          className="w-9/12 pt-10 pl-10"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl translate-x-10">Add Details</div>
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="m-4 mx-10"
            >
              <Stack spacing={2} width={600}>
                <TextField
                  label="Job Role"
                  type="text"
                  {...register("role", {
                    required: "Job role is required",
                  })}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <FormControl>
                  <InputLabel id="role-id">Job Type</InputLabel>
                  <Select
                    value={jobType}
                    labelId="role-id"
                    label="Job Type"
                    id="role"
                    onChange={(e: SelectChangeEvent) => {
                      setJobType(e.target.value);
                    }}
                    sx={{
                      "& label": { paddingLeft: (theme) => theme.spacing(1) },
                      "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                      "& fieldset": {
                        paddingLeft: (theme) => theme.spacing(0.75),
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <MenuItem value={"full-time"}>Full Time</MenuItem>
                    <MenuItem value={"part-time"}>Part Time</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  type="text"
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Pay"
                  type="number"
                  {...register("pay", {
                    required: "Job pay is required",
                  })}
                  error={!!errors.pay}
                  helperText={errors.pay?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Skills preferred"
                  type="text"
                  {...register("skills", {
                    required: "Skills are required",
                  })}
                  error={!!errors.skills}
                  helperText={errors.skills?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                  multiline
                />
                <TextField
                  label="Job Description"
                  type="text"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                  minRows={4}
                  multiline
                />
                <Button
                  type="submit"
                  variant="outlined"
                  style={{
                    color: "#FF5353",
                    borderColor: "#FF5353",
                    textTransform: "none",
                    fontSize: "16px",
                    minWidth: "200px",
                  }}
                >
                  Proceed
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
