import { useState, useEffect } from "react";
import GroupCard from "../components/GroupCard";
import ViewGroupInPage from "../components/ViewGroupInPage";
import UserSideBarGroup from "../components/UserSideBarGroup";
import * as groupService from "../services/groupService";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [toggleView, setToggleView] = useState(false);

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

  const handleDeleteGroup = async (groupToDelete) => {
    try {
      await groupService.deleteGroup(groupToDelete);
      setGroups(groups.filter(group => group.group !== groupToDelete));
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  const handleAddUserToGroup = async (userToBeAdd) => {
    try {
      await groupService.getUserToGroup(userToBeAdd);
    } catch (error) {
      console.error("Failed to add user to group", error);
    }
  };

  const handleViewGroupDetails = (group) => {
    setSelectedGroup(group);
    setToggleView(true);
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
                onView={() => handleViewGroupDetails(group)}
              />
            ))}
          </div>
          {toggleView && selectedGroup && (
            <ViewGroupInPage data={selectedGroup} onClose={() => setToggleView(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage;