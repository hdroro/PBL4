import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { BackIcon, Images, NotifIcon, PhoneCall, SendMessage, Setting, UserGroup } from '~/components/Icon/Icon';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Message() {
    const currentTime = new Date();

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Đặt thành 'false' nếu muốn hiển thị theo 24-giờ
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('messenger-user')}>
                <div className={cx('messenges')}>
                    <Link to={'/'} className={cx('back-icon')}>
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
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.cancer} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.leo} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.cancer} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.leo} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.cancer} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
                    <div className={cx('message-another')}>
                        <img className={cx('avatar')} src={images.leo} alt="" />
                        <div className={cx('info-user')}>
                            <div className={cx('fullname')}>choose</div>
                            <div className={cx('curTime')}>{currentTime.toLocaleTimeString('en-US', options)}</div>
                        </div>
                    </div>
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
                        <PhoneCall className={cx('phone-call')} />
                        <Setting className={cx('chat-setting')} />
                    </div>
                </div>
                <div className={cx('chat-main')}></div>
                <div className={cx('chat-send-bottom')}>
                    <Images className={cx('btn-image')} />
                    <div className={cx('message-input-area')}>
                        <input className={cx('input-message')} placeholder="Send a message...." />
                    </div>
                    <SendMessage className={cx('btn-send')} />
                </div>
            </div>
        </div>
    );
}

export default Message;
