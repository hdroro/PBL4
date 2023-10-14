//Layouts
import config from '~/config';
import { SidebarOnly, TwoSideBar } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
// import Search from '~/pages/Search';
import Message from '~/pages/Message';
import Search from '~/layouts/components/Search';
import Matching from '~/pages/Matching';
import Call from '~/pages/Call';
import SettingPassword from '~/pages/SettingPassword';
import SettingProfile from '~/pages/SettingProfile';

//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.call, component: Call },
    { path: config.routes.profile, component: Profile, layout: SidebarOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.messages, component: Message, layout: null },
    { path: config.routes.matching, component: Matching, layout: SidebarOnly },
    { path: config.routes.settingProfile, component: SettingProfile, layout: TwoSideBar },
    { path: config.routes.settingPassword, component: SettingPassword, layout: TwoSideBar },
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
