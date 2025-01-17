import axios from "axios";

const Api = axios.create({
    baseURL: 'http://10.17.11.140:8000/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});
Api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


export default Api;