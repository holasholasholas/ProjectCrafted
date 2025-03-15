import axios from 'axios';

const config = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}; //https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/userpanel`;


async function showCurrentUser(){

    try {
        const response = await axios.get(BASE_URL, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

async function updateCurrentUser(){

    try {
        const response = await axios.put(BASE_URL, config);
        return response.data;
    } catch (error) {
        console.error("Error updating current user:", error);
        throw error;
    }
}

// async function showCarsCurrentUser() {
//     try {
//         const response = await axios.get(BASE_URL, config);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching cars:", error);
//         throw error;
//     }
// }

export { showCurrentUser, updateCurrentUser };