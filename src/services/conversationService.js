import axios from '../axios';

axios.defaults.withCredentials = true;

const handlePutBlockConversation = (idConversation) => {
    return axios.put('/api/block-conversation', { withCredentials: true, idConversation });
};

const handleDeleteConversation = (idConversation) => {
    return axios.put('/api/delete-conversation', { withCredentials: true, idConversation });
};

const handleUpdateBlockStatusConversation = (idConversation) => {
    return axios.put('/api/update-block-conversation', { withCredentials: true, idConversation });
};

const handleGetConversationByID = (idConversation) => {
    return axios.get('/api/get-conversation', { withCredentials: true, params: { idConversation } });
};

export {
    handlePutBlockConversation,
    handleDeleteConversation,
    handleUpdateBlockStatusConversation,
    handleGetConversationByID,
};
