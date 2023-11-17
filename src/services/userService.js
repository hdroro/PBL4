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

const handlePostMessage = (direct, messageText, timeSend, idConversation) => {
    return axios.post('/api/save-message', { withCredentials: true, direct, messageText, timeSend, idConversation });
};

const handlePostFile = (direct, file, timeSend, idConversation) => {
    return axios.post(
        '/api/save-file',
        { withCredentials: true, direct, file, timeSend, idConversation },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );
};

const getFile = (filename) => {
    return axios.get('/api/get-file', { withCredentials: true, filename });
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

const handleEditProfile = (username, fullname, bio, birth, gender) => {
    return axios.post('api/setting/editprofile', {
        withCredentials: true,
        username,
        fullname,
        bio,
        birth,
        gender,
    });
};

const getProfileSetting = () => {
    return axios.get('api/setting/editprofile', {
        withCredentials: true,
    });
}

const handleChangePassword = (currentpassword, newpassword, retypepassword) => {
    return axios.post('api/setting/changepassword', {
        withCredentials: true,
        currentpassword,
        newpassword,
        retypepassword,
    });
}

const handleCheckFriendRelation = (idAcc1, idAcc2) => {
    return axios.get('api/check-friend-relation', {
        withCredentials: true,
        params: {idAcc1, idAcc2},
    });
}

const handleAddFriendRelation = (idAcc1, idAcc2) => {
    return axios.post('api/add-friend-relation', {
        withCredentials: true,
        idAcc1, idAcc2
    });
}
export {
    handleLoginApi,
    handleLogoutApi,
    handleGetInfo,
    handleGetInfoByID,
    handleGetInfoByUsername,
    handleFetchChatUser,
    handleGetAccById,
    handlePostMessage,
    handlePostFile,
    handleSignupApi,
    getFile,
    handleEditProfile,
    getProfileSetting,
    handleChangePassword,
    handleAddFriendRelation,
    handleCheckFriendRelation,
};
