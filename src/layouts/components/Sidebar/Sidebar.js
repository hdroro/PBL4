import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Search from '../Search';
import { HandHeart, Logout, Messenger, NotifIcon, Setting, User, UserGroup } from '~/components/Icon/Icon';
import images from '~/assets/images';
import Button from '~/components/Button';
import routes from '~/config/routes';
import Tippy from '@tippyjs/react';
import NotiItem from '~/components/Popper/NotiItem';
import { PopperWrapper } from '~/components/Popper';
import { useModal } from '~/hooks';
import { Link } from 'react-router-dom';
import { handleGetAccById, handleGetInfoByID, handleLogoutApi } from '~/services/userService';
import {
    handleGetNotificationByReceiverId,
    handlePostNotificationMessageInfo,
} from '~/services/notificationMessageService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function Sidebar({ user, socket }) {
    const [infoUser, setInfoUser] = useState({});
    const { isShowing, toggle } = useModal();
    const [notificationCount, setNotificationCount] = useState('');
    const [reLoadPage, setReloadPage] = useState(false);

    const renderPreview = () => {
        return (
            <PopperWrapper className={cx('primary')}>
                <NotiItem isShowing={isShowing} toggle={toggle} />
                <NotiItem />
                <NotiItem />
            </PopperWrapper>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('user?.idUser ', user?.idUser);
                const response = await handleGetInfoByID(user?.idUser);
                setInfoUser(response?.userData?.user);

                const notifications = await handleGetNotificationByReceiverId(user.idUser);
                setNotificationCount(notifications?.notificationMessageInfo?.statusNotificationMessage);
            } catch (error) {
                console.error('Error fetching user information: ' + error);
            }
        };

        fetchData();
    }, [user?.idUser, reLoadPage]);

    useEffect(() => {
        if (socket === null) return;
        socket.off('receive-notification');
        socket.on('receive-notification', async (data) => {
            handlePostNotificationMessageInfo(data.idConversation, data.senderID, data.receiverID, 1);
            setReloadPage(!reLoadPage);
        });
    }, [socket, reLoadPage]);

    console.log('notificationCount', notificationCount);

    const handleLogoutAccout = async () => {
        await handleLogoutApi();
    };

    console.log('user: ', user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-8 m-8 c-8')}>
                                <Search user={user} />
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <div className={cx('icon-header')}>
                                    <span className={cx('count-circle')}>1</span>
                                    <Tippy
                                        offset={[10, 9]}
                                        interactive
                                        // visible
                                        placement="bottom"
                                        // content={renderPreview()}
                                    >
                                        <div>
                                            <NotifIcon />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <div className={cx('icon-header')}>
                                    <span className={cx('count-circle')}>2</span>
                                    <Tippy
                                        offset={[10, 9]}
                                        interactive
                                        // visible
                                        placement="bottom"
                                        content={renderPreview()}
                                    >
                                        <div>
                                            <UserGroup />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        <div className={cx('row')}>
                            <div className={cx('col l-12 m-12 c-12')}>
                                <div className={cx('infor')}>
                                    <img src={images[infoUser.avatar]} alt="Cancer" />
                                    <span className={cx('name')}>{user.fullName}</span>
                                    <span className={cx('nickname')}>@{user.userName}</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('action-container')}>
                            <div className={cx('row')}>
                                <div className={cx('col l-12 m-12 c-12')}>
                                    <div className={cx('button-action')}>
                                        <Button active to={routes.matching} normal large text leftIcon={<HandHeart />}>
                                            Matching
                                        </Button>

                                        <Button
                                            active
                                            to={routes.messages}
                                            normal
                                            large
                                            text
                                            leftIcon={<Messenger />}
                                            // className={cx('btn-message')}
                                        >
                                            Message
                                            <span className={cx('notification-count')}>
                                                {notificationCount != 0 && '(' + notificationCount + ')'}
                                            </span>
                                        </Button>

                                        <Button
                                            active
                                            to={`/api/profile/@${user.userName}`}
                                            normal
                                            large
                                            text
                                            leftIcon={<User />}
                                        >
                                            My blog
                                        </Button>

                                        <Button
                                            active
                                            to={routes.settingProfile}
                                            normal
                                            large
                                            text
                                            leftIcon={<Setting />}
                                        >
                                            Settings
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('logout')}>
                            <div className={cx('row')}>
                                <Link to="/">
                                    <div className={cx('col l-12 m-12 c-12')}>
                                        <Logout onClick={() => handleLogoutAccout()} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
