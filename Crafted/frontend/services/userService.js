import axios from 'axios';

// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/search`;
const config = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}; //https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios


// perform search for users

async function showAllUsers(){

    try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/search/users`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
}

async function showAllCars(){

    try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/search/cars`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
}

export { showAllUsers, showAllCars };