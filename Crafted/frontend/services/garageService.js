import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/garage`;
const config = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}; //https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios

// view all cars
async function showCar() {
    try {
        const response = await axios.get(BASE_URL, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
}

// get specific car
async function getCarDetails(car_id) {
    try {
        const response = await axios.get(`${BASE_URL}/${car_id}`, config) 
            console.log(response)
            return response.data;
        
    } catch (error) {
        console.error("Error fetching car details:", error);
        throw error;
    }
}

async function deleteCar(car_id) {
    try {
        const response = await axios.delete(`${BASE_URL}/${car_id}`, config)
        console.log(response)
        return response.data;
        
    } catch (error) {
        console.error("Error deleting car:", error);
        throw error;
    }
}
// // create car
// async function createCar(carData) {
    //     try {
//         const response = await axios.post(BASE_URL, carData, {
    //             headers: {
        //                 'Authorization': localStorage.getItem('token')
        //             }
        //         });
        //         return response.data;
        //     } catch (error) {
            //         console.error("Error creating car:", error);
            //         throw error;
            //     }
// }

// edit car
async function editCar(car_id, carDataToSend) {
    try {
        console.log(car_id);
        const response = await axios.put(`${BASE_URL}/${car_id}`, carDataToSend, config
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error updating car:", error);
        throw error;
    }
}




export { showCar, deleteCar, getCarDetails, editCar };