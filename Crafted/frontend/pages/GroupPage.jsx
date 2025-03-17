import { useState, useEffect } from "react";
import GroupCard from "../components/GroupCard";
import UserSideBarGroup from "../components/UserSideBarGroup"; // Import the missing component
import * as groupService from "../services/groupService";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  

  useEffect(() => {
    async function getGroupData() {
      try {
        const data = await groupService.fetchGroup();
        
        setGroups(data); 
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      }
    }

    getGroupData();
  }, []); 

  console.log(groups)

  const handleDeleteGroup = async (newGroup) => {
    
    try {
      await groupService.deleteGroup(newGroup);
      setGroups(groups.filter(group => group.group !== newGroup));
    } catch (error) {
      console.error("Failed to delete group:", error); 
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 p-4">
          <UserSideBarGroup />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-6">Your Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <GroupCard 
                key={group.id}
                group={group}
                onDelete={() => handleDeleteGroup(group.group)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default GroupPage;