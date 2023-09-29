import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Search from '../Search';
import { HandHeart, Logout, Messenger, NotifIcon, Setting, User, UserGroup } from '~/components/Icon/Icon';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function Sidebar() {
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
                                    <NotifIcon />
                                </div>
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <div className={cx('icon-header')}>
                                    <span className={cx('count-circle')}>2</span>
                                    <UserGroup />
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
                                        <Button normal text leftIcon={<HandHeart />}>
                                            Matching
                                        </Button>

                                        <Button normal text leftIcon={<Messenger />}>
                                            Message
                                        </Button>

                                        <Button normal text leftIcon={<User />}>
                                            My blog
                                        </Button>

                                        <Button normal text leftIcon={<Setting />}>
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
