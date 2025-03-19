import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/group`;
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// Get all groups for logged in user
async function getUserGroups() {
  try {
    const response = await axios.get(BASE_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
}

// Create a new group
async function createGroup(groupData) {
  try {
    const response = await axios.post(BASE_URL, groupData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}

// Add user to group
async function getUserToGroup(userData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${userData.group_id}`,
      { user_id: userData.user_id },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user to group:", error);
    throw error;
  }
}

// Delete group
async function deleteGroup(groupId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${groupId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
}

// Get specific group details
async function getGroupDetails(groupId) {
  try {
    const response = await axios.get(`${BASE_URL}/${groupId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching group details:", error);
    throw error;
  }
}

export { getUserGroups, createGroup, getUserToGroup, deleteGroup, getGroupDetails };