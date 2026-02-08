// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE

import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://chatlify-backend-5v32.onrender.com/api",
    withCredentials : true

})