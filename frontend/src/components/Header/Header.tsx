import { useUserStore } from "../../store/UserStore";
import NavBar from "./NavBar";
import NavBarItem from "./NavBarItem";

const Header = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role);
  return (
    <>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
          <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              <a
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                href={isLoggedIn ? "/dashboard" : "/"}
              >
                <img
                  alt="logo"
                  src="/images/wolfjobs-logo.png"
                  className="h-10 p-0"
                />
              </a>
              <ul className="ml-4 flex space-x-8">
                {role == "Manager" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Listings" />
                )}
                {role == "Applicant" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Applications" />
                )}
                {isLoggedIn && <NavBarItem link="/explore" text="All jobs" />}
                {role == "Applicant" && isLoggedIn && (
                  <NavBarItem link="/savedJobs" text="Saved Jobs" />
                )}
              </ul>
              <NavBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
