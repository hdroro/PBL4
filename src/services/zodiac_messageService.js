import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListZodiacMessage = () => {
    return axios.post('/api/get-list-zodiac-message', {
        withCredentials: true,
    });
};

const handleGetZodiacMessageDetail = (id) => {
    return axios.get('/api/admin/get-detail-zodiac-message', {
        withCredentials: true,
        params: {id}
    });
};

const handleCreateZodiacMessage = (idZodiac, content) => {
    return axios.put('/api/admin/create-zodiac-message', {
        withCredentials: true,
        idZodiac,
        content
    });
};

export { handleGetListZodiacMessage, handleGetZodiacMessageDetail, handleCreateZodiacMessage };
