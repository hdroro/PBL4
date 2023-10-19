import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import {
    BackIcon,
    BlockMessage,
    Images,
    NotifIcon,
    PhoneCall,
    Remove,
    SearchIcon,
    SendMessage,
    SendMessageDisabled,
    Setting,
    UserGroup,
} from '~/components/Icon/Icon';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import routes from '~/config/routes';
import Button from '~/components/Button';
import { useState } from 'react';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import Block from '~/components/Modal/ModalConfirm/Block/Block';

const cx = classNames.bind(styles);

const USER_INFO = [
    {
        id: 1,
        avatar: images.cancer,
        fullname: 'hd.roro',
    },
    {
        id: 2,
        avatar: images.leo,
        fullname: 'roro.hd',
    },
    {
        id: 3,
        avatar: images.cancer,
        fullname: 'yanni123',
    },
    {
        id: 4,
        avatar: images.leo,
        fullname: 'nguoitinhmuadong',
    },
    {
        id: 5,
        avatar: images.leo,
        fullname: 'harah109',
    },
];

function Message() {
    const currentTime = new Date();

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Đặt thành 'false' nếu muốn hiển thị theo 24-giờ
    };

    const [isShowSetting, setIsShowSetting] = useState(false);
    const [typeMessage, setTypeMessage] = useState('');
    const [inputSearch, setInputSearch] = useState('');

    const handleChangeMessage = (event) => {
        // console.log(event.target.value);
        setTypeMessage(event.target.value);
    };

    const handleToggleSetting = () => {
        setIsShowSetting(!isShowSetting);
    };
    const handleChangeInputSearch = (event) => {
        setInputSearch(event.target.value);
    };

    const { isShowing, toggle } = useModal();
    const [isShowingClear, setIsShowingClear] = useState(false);

    const handleToggleClear = () => {
        setIsShowingClear(!isShowingClear);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('messenger-user')}>
                <div className={cx('messenges')}>
                    <Link to={routes.matching} className={cx('back-icon')}>
                        <BackIcon />
                    </Link>
                    <h1 className={cx('messenges-title')}>Messages</h1>
                    <div className={cx('icon-noti')}>
                        <NotifIcon className={cx('noti')} />
                        <UserGroup className={cx('connect-friend')} />
                    </div>
                </div>
                {/* <div className={cx('users')}>No message</div> */}

                <div>
                    {USER_INFO.map((item) => (
                        <div className={cx('message-another')} key={item.id}>
                            <img className={cx('avatar')} src={item.avatar} alt="" />
                            <div className={cx('info-user')}>
                                <div className={cx('fullname')}>{item.fullname}</div>
                                <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('messenger-content')}>
                <div className={cx('chat-header')}>
                    <div className={cx('header-content')}>
                        <img className={cx('avatar-header')} src={images.cancer} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname-header')}>Ộpppppaaaaaaaaaaaaaaaa</div>
                            <div className={cx('nickname-header')}>@nguoitinhmuadong</div>
                        </div>
                    </div>

                    <div className={cx('action-group')}>
                        <a href="/call/@hd.roro">
                            <PhoneCall className={cx('phone-call')} />
                        </a>
                        <Setting className={cx('chat-setting')} onClick={() => handleToggleSetting()} />
                    </div>
                </div>
                <div className={cx('chat-main')}></div>
                <div className={cx('chat-send-bottom')}>
                    <Images className={cx('btn-image')} />
                    <div className={cx('message-input-area')}>
                        <input
                            className={cx('input-message')}
                            placeholder="Send a message...."
                            value={typeMessage}
                            onChange={(value) => handleChangeMessage(value)}
                        />
                    </div>

                    {typeMessage === '' ? (
                        <SendMessageDisabled className={cx('btn-send')} />
                    ) : (
                        <SendMessage className={cx('btn-send')} />
                    )}
                </div>
            </div>

            {isShowSetting && (
                <div className={cx('messenger-setting')}>
                    <div className={cx('header-setting')}>
                        <BackIcon className={cx('back-icon')} onClick={handleToggleSetting} />
                        <span className={cx('title-setting')}>Settings</span>
                    </div>
                    <div className={cx('setting-main')}>
                        <div className={cx('search-input')}>
                            <div className={cx('search-message')}>
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                name="search"
                                value={inputSearch}
                                onChange={(value) => handleChangeInputSearch(value)}
                            />
                        </div>
                        <Button normal post leftIcon={<BlockMessage />} onClick={toggle}>
                            Block
                        </Button>
                        <Modal title="Block Message" texttype background isShowing={isShowing} hide={toggle}>
                            <Block hide={toggle}>Bạn có chắc chắn muốn chặn người này hay không ?</Block>
                        </Modal>

                        <Button normal post leftIcon={<Remove />} onClick={handleToggleClear}>
                            Clear messages
                        </Button>

                        <Modal
                            title="Clear Message"
                            texttype
                            background
                            isShowing={isShowingClear}
                            hide={handleToggleClear}
                        >
                            <Block hide={handleToggleClear}>
                                Bạn có chắc chắn muốn xóa toàn bộ tin nhắn hay không ?
                            </Block>
                        </Modal>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Message;
