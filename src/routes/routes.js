//Layouts
import config from '~/config';
import { SidebarOnly } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
// import Search from '~/pages/Search';
import Message from '~/pages/Message';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile, layout: SidebarOnly },
    // { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.messages, component: Message, layout: SidebarOnly },
    // { path: config.routes.setting, component: Setting, layout: SidebarOnly },
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
