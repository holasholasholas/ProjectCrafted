import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/context/UserContext";
import * as userPanelService from "../services/userPanelService";
import CreateGroupBox from "./CreateGroupBox";


const UserPanel = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false)
  

  useEffect(() => {
    async function showCurrentUser() {
      const userData = await userPanelService.showCurrentUser(user._id);
      console.log(userData)
      setUserDetails(userData);
    }
    showCurrentUser();
  }, [user]);

 
  const userData = userDetails.user || {};
  const {
    name,
    email,
    username,
    vehicles = [],
    _id,
    groups = [],
    createdAt,
  } = userData;

  const handleNavigate = (route) => {
    if (route === "/sign-in") {
      handleLogOut();
    } else {
      navigate(route);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="font-poppins antialiased">
      <div className="flex flex-row h-screen w-screen bg-white">
        {/* Sidebar - Left side */}
        <div
          id="sidebar"
          className="bg-white h-screen shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden"
        >
          <div className="space-y-6 md:space-y-10 mt-10">
            <h1 className="font-bold text-4xl text-center md:hidden">
              D<span className="text-teal-600">.</span>
            </h1>
            <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
              {user.username}
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
                  Administrator
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div id="menu" className="flex flex-col space-y-2">
              {[
                { icon: "dashboard", text: "Dashboard", route: "/userpanel" },
                { icon: "garage", text: "Garage", route: "/garage" },
                { icon: "friends", text: "Search", route: "/search" },
                { icon: "logout", text: "Logout", route: "/sign-in" },
              ].map((item, index) => (
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

        {/* Main Content - Right side */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-teal-600 mb-6">
              User Profile
            </h1>

            {Object.keys(userData).length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">
                      Personal Information
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium text-gray-600">Name:</span>{" "}
                        {name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Username:
                        </span>{" "}
                        {username}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Email:
                        </span>{" "}
                        {email}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Account Created:
                        </span>{" "}
                        {new Date(createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          User ID:
                        </span>{" "}
                        {_id}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">
                      Vehicle Information
                    </h2>
                    <p className="font-medium text-gray-600">
                      Total Vehicles: {vehicles.length}
                    </p>
                    {vehicles.length > 0 && (
                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Vehicle IDs:
                        </h3>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          {vehicles.slice(0, 5).map((vehicleId, index) => (
                            <li key={index} className="break-all">
                              {vehicleId}
                            </li>
                          ))}
                          {vehicles.length > 5 && (
                            <li className="italic">
                              and {vehicles.length - 5} more...
                            </li>
                          )}
                        </ul>
                        <div className="mt-3">
                          <button
                            onClick={() => navigate("/garage")}
                            className="text-sm bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition"
                          >
                            View in Garage
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Groups
                  </h2>
                  {groups.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {groups.map((groupObj, index) => (
                        <li key={index}>{groupObj.group}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No groups joined yet</p>
                  )}
                </div>
                {toggleCreateGroup && (
      <CreateGroupBox 
        onClose={() => setToggleCreateGroup(false)}
        userId={_id}
        
      />
    )}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-200"
                    onClick={() => setToggleCreateGroup(true)}
                  >
                    Create New Group
                  </button>
                </div>
              </div>
              
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading user details...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
