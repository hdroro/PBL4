import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListReport = (page) => {
    return axios.get('/api/admin/get-all-report', {
        withCredentials: true,
        params: { page },
    });
};

export { handleGetListReport };
