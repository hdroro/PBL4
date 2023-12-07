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

const handlePostFile = (direct, file, timeSend, idConversation, fileName) => {
    return axios.post(
        '/api/save-file',
        { withCredentials: true, direct, file, timeSend, idConversation, fileName },
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
};

const handleChangePassword = (currentpassword, newpassword, retypepassword) => {
    return axios.post('api/setting/changepassword', {
        withCredentials: true,
        currentpassword,
        newpassword,
        retypepassword,
    });
};

const handleRandomMatching = (idUser, onlineUsers) => {
    return axios.get('/api/random-matching', {
        withCredentials: true,
        params: {idUser, onlineUsers},
    });
}

const handleGetNotificationMatching = (idUser) => {
    return axios.get('/api/get-notification-matching', {
        withCredentials: true,
        params: {idUser},
    });
}

const handleCreateNotificationMatching = (idAcc1, idAcc2) => {
    return axios.post('/api/create-notification-matching', {
        withCredentials: true,
        idAcc1,
        idAcc2
    });
}

const handleSetDenyNotificationMatching = (idNotificationMatching) => {
    return axios.post('/api/deny-notification-matching', {
        withCredentials: true,
        idNotificationMatching
    });
}

const handleSetReadNotificationMatching = (idNotificationMatching) => {
    return axios.post('/api/read-notification-matching', {
        withCredentials: true,
        idNotificationMatching
    });
}

const handleGetCountNotReadNotificationMatching = (idAcc1) => {
    return axios.get('/api/get-count-not-read-notification-matching', {
        withCredentials: true,
        params: {idAcc1},
    });
}

const handleGetDetailNotificationMatching = (idNotificationMatching, idAcc1, idAcc2) => {
    return axios.get('/api/get-detail-notification-matching', {
        withCredentials: true,
        params: {idNotificationMatching, idAcc1, idAcc2},
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
    handleRandomMatching,
    handleGetNotificationMatching,
    handleCreateNotificationMatching,
    handleSetDenyNotificationMatching,
    handleSetReadNotificationMatching,
    handleGetCountNotReadNotificationMatching,
    handleGetDetailNotificationMatching,
};
