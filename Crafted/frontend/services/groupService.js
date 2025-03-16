import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/group`;
const config = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }};

async function createGroup (formInput) {
    try {
        const response = await axios.post(`${BASE_URL}`, formInput, config)
            console.log(response)
            return response.data
            
    } catch (error) {
        console.error("Error creating group", error);
        throw error;
    }
}

export { createGroup };