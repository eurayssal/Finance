import axios from "axios";

const hookApi = () => {
    const myAxios = axios.create({ baseURL: 'https://localhost:7064' });
    return myAxios;
};

export default hookApi;