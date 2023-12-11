import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListZodiacMessage = (page) => {
    return axios.get('/api/admin/get-all-zodiac-message', {
        withCredentials: true,
        params: { page },
    });
};

const handleGetListNotiZodiacMessage = (idUser) => {
    return axios.get('/api/get-list-zodiac-message', {
        withCredentials: true,
        params: { idUser },
    });
};

const handleFilterListZodiacMessage = async (timeFrom, timeTo, pageNumber) => {
    return axios.get('/api/admin/filter-zodiac-message', {
        withCredentials: true,
        params: { timeFrom, timeTo, pageNumber },
    });
};

export { handleGetListZodiacMessage, handleFilterListZodiacMessage, handleGetListNotiZodiacMessage };
