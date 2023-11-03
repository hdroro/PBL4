import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetPost = (idAccPost) => {
    return axios.get('/api/get-post', { withCredentials: true, params: { idAccPost } });
};

export { handleGetPost };
