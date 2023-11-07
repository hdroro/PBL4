import axios from '../axios';

axios.defaults.withCredentials = true;

const handleLoginApi = (username, password) => {
    return axios.post('api/login', { withCredentials: true, username, password });
};

const handleLogoutApi = () => {
    return axios.post('api/logout');
};

const handleGetInfo = () => {
    return axios.get('api/matching', { withCredentials: true });
};

const handleGetInfoByID = (idUser) => {
    return axios.get('api/get-user', { withCredentials: true, params: { idUser } });
};

const handleGetInfoByUsername = (nickname) => {
    return axios.get('api/get-user-by-username', { withCredentials: true, params: { nickname } });
};
const handleFetchChatUser = () => {
    return axios.get('api/user-chat', { withCredentials: true });
};

const handleGetAccById = (idConversation) => {
    return axios.get('/api/user-list', {
        withCredentials: true,
        params: { idConversation },
    });
};

const handleSignupApi = (username, password, fullname, date, gender) => {
    return axios.post('api/signup', {
        withCredentials: true,
        username,
        password,
        fullname,
        date,
        gender,
    });
};
export {
    handleLoginApi,
    handleLogoutApi,
    handleGetInfo,
    handleGetInfoByID,
    handleGetInfoByUsername,
    handleFetchChatUser,
    handleGetAccById,
    handleSignupApi,
};
