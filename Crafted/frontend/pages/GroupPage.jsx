
import React from "react";
import UserSideBar from "../components/UserSideBar";
// import { UserContext } from "../src/context/UserContext";

const GroupPage = () => {
  // Your component logic here
  
  return (
    <div className="container mx-auto">
      
      {/* Include the UserPanel component */}
      <div className="user-panel-container">
        <UserSideBar />
      </div>
      
      {/* Other component content */}
    </div>
  );
};

export default GroupPage;