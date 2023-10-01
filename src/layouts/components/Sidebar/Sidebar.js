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

const cx = classNames.bind(styles);
function Sidebar() {
    const renderPreview = () => {
        return (
            <PopperWrapper className={cx('primary')}>
                <NotiItem />
                <NotiItem />
                <NotiItem />
            </PopperWrapper>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-8 m-8 c-8')}>
                                <Search />
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <div className={cx('icon-header')}>
                                    <span className={cx('count-circle')}>1</span>
                                    <Tippy
                                        offset={[10, 9]}
                                        interactive
                                        // visible
                                        placement="bottom"
                                        content={renderPreview()}
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
                                    <img src={images.cancer} alt="Cancer" />
                                    <span className={cx('name')}>Yến Nhi</span>
                                    <span className={cx('nickname')}>@yanni</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('action-container')}>
                            <div className={cx('row')}>
                                <div className={cx('col l-12 m-12 c-12')}>
                                    <div className={cx('button-action')}>
                                        <Button to={routes.matching} normal large text leftIcon={<HandHeart />}>
                                            Matching
                                        </Button>

                                        <Button to={routes.messages} normal large text leftIcon={<Messenger />}>
                                            Message
                                        </Button>

                                        <Button to={routes.profile} normal large text leftIcon={<User />}>
                                            My blog
                                        </Button>

                                        <Button normal large text leftIcon={<Setting />}>
                                            Settings
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('logout')}>
                            <div className={cx('row')}>
                                <div className={cx('col l-12 m-12 c-12')}>
                                    <Logout />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
