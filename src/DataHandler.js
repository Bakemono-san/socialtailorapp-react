import axios from "axios";

export default class DataHandler{
    static postData(url,data){
       return axios.post(url,data)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
    }

    static async getDatas(url){
        try{
            const datas = await axios.get(url);
            return datas;
        }catch(error){
            throw error;
        }
    }
}   