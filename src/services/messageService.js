import axios from '../axios';

axios.defaults.withCredentials = true;

const handleLoadMessage = (idConversation, idUser) => {
    return axios.get('/api/user-load-message', {
        withCredentials: true,
        params: { idConversation, idUser },
    });
};

const handlePostMessage = (direct, messageText, timeSend, idConversation, fileName) => {
    return axios.post('/api/save-message', {
        withCredentials: true,
        direct,
        messageText,
        timeSend,
        idConversation,
        fileName,
    });
};

export { handleLoadMessage, handlePostMessage };
