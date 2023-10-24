import axios from '../axios';

axios.defaults.withCredentials = true;

const handleLoginApi = (username, password) => {
    return axios.post('api/login', { withCredentials: true, username, password });
};

const handleGetInfo = () => {
    return axios.get('api/matching', { withCredentials: true });
};

export { handleLoginApi, handleGetInfo };
