import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/garage`;

// view all cars
async function showCar() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
}

// create car
async function createCar(carData) {
    try {
        const response = await axios.post(BASE_URL, carData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
}

// edit car
async function editCar(carId, modificationData) {
    try {
        const response = await axios.put(`${BASE_URL}/${carId}/modifications`, modificationData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating car:", error);
        throw error;
    }
}

// get specific car
async function getCarDetails(carId) {
    try {
        const response = await axios.get(`${BASE_URL}/${carId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching car details:", error);
        throw error;
    }
}

// delete car
async function deleteCar(carId) {
    try {
        const response = await axios.delete(`${BASE_URL}/${carId}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting car:", error);
        throw error;
    }
}

export { showCar, createCar, editCar, getCarDetails, deleteCar };