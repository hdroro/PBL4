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
const handleFetchChatUser = () => {
    return axios.get('api/user-chat', { withCredentials: true });
};

const handleLoadMessage = (idConversation, idUser) => {
    return axios.get('/api/user-load-message', {
        withCredentials: true,
        params: { idConversation, idUser },
    });
};

const handleGetAccById = (idConversation) => {
    return axios.get('/api/user-list', {
        withCredentials: true,
        params: { idConversation },
    });
};

const handlePostMessage = (direct, messageText, timeSend, idConversation) => {
    return axios.post('/api/save-message', { withCredentials: true, direct, messageText, timeSend, idConversation });
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
    handleFetchChatUser,
    handleLoadMessage,
    handleGetAccById,
    handlePostMessage,
    handleSignupApi,
};
