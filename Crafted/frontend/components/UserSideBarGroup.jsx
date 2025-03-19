import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/context/UserContext";
import * as userPanelService from "../services/userPanelService";

const UserSidebarGroup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [toggleUserType, setToggleUserType] = useState("User");
  

  useEffect(() => {
    async function showCurrentUser() {
      const userData = await userPanelService.showCurrentUser(user._id);
      setUserDetails(userData);
    
      const groups = userData.user.groups;
      console.log(groups)
        // setGroupDetails(groups)
      setToggleUserType(groups.length > 0 ? "Owner" : "User");
    }
    showCurrentUser();
  }, [user, toggleUserType]);

  // runtime error prevention
  const userData = userDetails.user || {};
  const { name } = userData;

  const handleNavigate = (route) => {
    if (route === "/sign-in") {
      handleLogOut();
    } else {
      navigate(route);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div
      id="sidebar"
      className="bg-white h-screen shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden"
    >
      <div className="space-y-6 md:space-y-10 mt-10">
        <h1 className="font-bold text-4xl text-center md:hidden">
          D<span className="text-teal-600">.</span>
        </h1>
        <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
          {name}
          <span className="text-teal-600">.</span>
        </h1>

        {/* Profile Section */}
        <div id="profile" className="space-y-3">
          <img
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="Avatar user"
            className="w-10 md:w-16 rounded-full mx-auto"
          />
          <div>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              {user.username}
            </h2>
            <p className="text-xs text-gray-500 text-center">
              {toggleUserType}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div id="menu" className="flex flex-col space-y-2">
          {(toggleUserType === "User"
            ? [
                {
                  icon: "dashboard",
                  text: "Dashboard",
                  route: "/userpanel",
                },
                { icon: "garage", text: "Garage", route: "/garage" },
                { icon: "friends", text: "Search", route: "/search" },
                { icon: "logout", text: "Logout", route: "/sign-in" },
              ]
            : toggleUserType === "Owner"
            ? [
                {
                  icon: "dashboard",
                  text: "Dashboard",
                  route: "/userpanel",
                },
                { icon: "garage", text: "Garage", route: "/garage" },
                { icon: "group", text: "Groups", route: "/group" },
                { icon: "friends", text: "Search", route: "/search" },
                { icon: "logout", text: "Logout", route: "/sign-in" },
              ]
            : []
          ).map((item, index) => (
            <a
              key={index}
              onClick={() => handleNavigate(item.route)}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Add appropriate SVG paths for each icon */}
              </svg>
              <span className="ml-2">{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSidebarGroup;