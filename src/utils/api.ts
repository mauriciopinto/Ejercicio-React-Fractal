import axios from "axios";

const urlDummyAPI = import.meta.env.VITE_REACT_APP_URL_DUMMY_BASE;

export const axiosDummyAPI = axios.create ({
    baseURL: urlDummyAPI,
});

axiosDummyAPI.interceptors.response.use (
    (response) => response,
    (error) => Promise.reject (
        (error.response) || "SERVER ENCOUNTERED AN ERROR"
    )
)