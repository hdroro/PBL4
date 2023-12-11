import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListReport = () => {
    return axios.get('/api/admin/get-all-report', {
        withCredentials: true,
    });
};

const handleGetReportDetail = (idPost) => {
    return axios.get('/api/admin/get-info-detail-post', {
        withCredentials: true,
        params: {idPost}
    });
};

const handleDenyReport = (idPost) => {
    return axios.put('/api/admin/deny-report', {
        withCredentials: true,
        idPost
    });
};

const handleAcceptReport = (idPost) => {
    return axios.put('/api/admin/accept-report', {
        withCredentials: true,
        idPost
    });
};

export { 
    handleGetListReport, 
    handleGetReportDetail,
    handleDenyReport,
    handleAcceptReport,
};
