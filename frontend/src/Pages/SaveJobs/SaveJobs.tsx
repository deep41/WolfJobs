import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import { saveJobURL } from "../../api/constants";
import SaveJobListView from "../../components/SaveJob/SaveJobListView";

const SaveJobs = () => {
  const naviagte = useNavigate();

  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const [jobList, setJobList] = useState([])

  useEffect(() => {
    const token: string = localStorage.getItem("token")!;
    if (!!!token) {
      naviagte("/login");
    }
    if (!!token) {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));

      updateName(userInfo.name);
      updateEmail(userInfo.email);
      updateAddress(userInfo.address);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
    }
  }, []);
  const userId = useUserStore((state) => state.id);
  useEffect(() => {

    const handleGetSavedJobs = async () => {
        try {
          const response = await axios.post(saveJobURL, {
            userId, 
          });
          
          const savedJobs = response.data.data; 
          setJobList(savedJobs);
          console.log("Saved jobs:", savedJobs);
        } catch (error) {
          console.error("Error retrieving saved jobs:", error);
          toast.error("Failed to retrieve saved jobs.");
        }
      };
      handleGetSavedJobs();
  }, []);

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <SaveJobListView jobsList={jobList} />
        </div>
      </div>
    </>
  );
};

export default SaveJobs;
