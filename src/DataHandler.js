import axios from "axios";

export default class DataHandler {
    static api = axios.create({
        baseURL: "http://localhost:3004", // Your backend API base URL
    });

    static setupInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                
                
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                // Handle the request error here
                return Promise.reject(error);
            }
        );
    }

    static async postData(url, data) {
        try {
            const response = await this.api.post(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getDatas(url) {
        try {
            const response = await this.api.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updateData(url, data) {
        try {
            const response = await this.api.put(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteData(url) {
        try {
            const response = await this.api.delete(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

// Call setupInterceptors once during app initialization
DataHandler.setupInterceptors();
