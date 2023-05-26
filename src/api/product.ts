import { axiosDummyAPI } from "../utils/api";

export const getProductsAPI = async () => {
    try {
        const response = await axiosDummyAPI.get ("/products");
        return response.data;
    } catch (error) {
        console.error (error);
    }
}