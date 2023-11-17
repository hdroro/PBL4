//Layouts
import config from '../config/routes';
import { DefaultLayout, SidebarOnly, TwoSideBar } from '~/layouts';

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
    { path: config.home, component: Home },
    { path: config.call, component: Call, layout: DefaultLayout },
    { path: config.profile, component: Profile, layout: SidebarOnly },
    { path: config.search, component: Search, layout: null },
    { path: config.messages, component: Message, layout: DefaultLayout },
    { path: config.matching, component: Matching, layout: SidebarOnly },
    { path: config.settingProfile, component: SettingProfile, layout: TwoSideBar },
    { path: config.settingPassword, component: SettingPassword, layout: TwoSideBar },
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
