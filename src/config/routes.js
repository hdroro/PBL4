const routes = {
    home: '/',
    call: '/api/call/:nickname',
    profile: '/api/profile/:nickname',
    search: '/api/search',
    messages: '/api/messages',
    matching: '/api/matching',
    settingProfile: '/api/setting/editprofile',
    settingPassword: '/api/setting/changepassword',

    adminShowUser: '/api/adminShowUser',
    adminDelUser: '/api/adminDelUser',
    adminShowDetailUser: '/api/adminShowDetailUser',
    adminShowMessage: '/api/adminShowMessage',
    adminCreateMessage: '/api/adminCreateMessage',
    adminShowDetailMessage: '/api/adminShowDetailMessage',
    adminShowReport: '/api/adminShowReport',
    adminShowDetailReport: '/api/adminShowDetailReport',
};

export default routes;
