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
import { useEffect, useState } from 'react';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import Block from '~/components/Modal/ModalConfirm/Block/Block';
import {
    handleFetchChatUser,
    handleGetAccById,
    handleGetInfoByID,
    handleLoadMessage,
    handlePostMessage,
} from '~/services/userService';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function Message() {
    const [isShowSetting, setIsShowSetting] = useState(false);
    const [typeMessage, setTypeMessage] = useState('');
    const [inputSearch, setInputSearch] = useState('');

    const handleChangeMessage = (event) => {
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

    //FETCH USER CHAT
    const [userChat, setUserChat] = useState([]);
    const [idSession, setIdSession] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchUserChat = async () => {
            try {
                const response = await handleFetchChatUser();
                console.log(response);
                console.log('npppp ' + response.userChatData);
                setUserChat(response.userChatData);
                // console.log(userChat[0].idSession);
                setIdSession(response.userChatData[0].idSession);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserChat();
    }, []);

    const [loadMessages, setLoadMessages] = useState([]);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [newMessage, setNewMessage] = useState({});

    //SETTTTTTTTTTTTTTTTTTTTTTT
    const [idConversation_, setIdconversation] = useState(1);
    const [idUser_, setIdUser] = useState(1);
    const [loadInfoChatSide, setLoadInfoChatSide] = useState([]);
    //GET MESSAGE
    const handleSetLoadMessage = async (idConversation, idUser) => {
        try {
            setIdconversation(idConversation);
            setIdUser(idUser);

            const response = await handleLoadMessage(idConversation, idUser);
            setLoadMessages(response.loadMessage);

            setIsShowMessage(true);

            const re = await handleGetInfoByID(idUser);
            setLoadInfoChatSide(re.userData.user);
            console.log('re.userData ' + re.userData.user[0]);
        } catch (error) {
            console.error(error);
        }
    };

    //INITIAL SOCKET
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.on('recieve-message', async (data) => {
            console.log('Received message: ', data);

            // setLoadMessages((prevLoadMessages) => ({
            //     chat: [data, ...prevLoadMessages.chat],
            // }));

            console.log(idConversation_ + ' ' + idUser_);
            const [messageResponse, chatUserResponse] = await Promise.all([
                handleLoadMessage(idConversation_, idUser_),
                handleFetchChatUser(),
            ]);
            setLoadMessages(messageResponse.loadMessage);
            setLoadMessages(messageResponse.loadMessage);
            setUserChat(chatUserResponse.userChatData);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [idConversation_, idUser_]);

    const handleSendMessage = async () => {
        try {
            const messageText = typeMessage;
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const timeSend = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const idConversation = idConversation_;
            const response = await handleGetAccById(idConversation);
            const a2 = response.accountList.chat[0].idAcc2;
            const a1 = response.accountList.chat[0].idAcc1;

            let direct, _idSession;
            if (idSession === a2) {
                direct = 0;
                _idSession = a1;
            } else {
                direct = 1;
                _idSession = a2;
            }
            let direct_ = 1;
            const newMessage = { direct_, messageText, timeSend, idConversation };
            setNewMessage(newMessage);
            setLoad(!load);
            console.log('haizzzzzzzzzzzzzzzzz ' + newMessage.messageText);
            setLoadMessages((prevLoadMessages) => ({
                chat: [newMessage, ...prevLoadMessages.chat],
            }));
            setIdUser(_idSession);
            handlePostMessage(direct, messageText, timeSend, idConversation);

            await socket.emit('send-message', newMessage);

            const response_ = await handleFetchChatUser();
            setUserChat(response_.userChatData);
            setTypeMessage('');
        } catch (error) {
            // Handle any errors here
            console.error('Error in handleSendMessage:', error);
        }
    };

    function isSameDay(date) {
        const currentDate = new Date();
        return (
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        );
    }

    function formatTime(timeSend) {
        const currentTime = new Date();
        const messageTime = new Date(timeSend);
        const timeDifference = (currentTime - messageTime) / 1000; // Chuyển đổi thành giây

        if (timeDifference < 60) {
            return 'just now';
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes}m ago`;
        } else if (timeDifference < 86400) {
            // Dưới 24 giờ
            const hours = Math.floor(timeDifference / 3600);
            return `${hours}h ago`;
        } else {
            const day = messageTime.getDate();
            const month = messageTime.getMonth() + 1;
            const hour = messageTime.getHours();
            const minute = messageTime.getMinutes();
            return `${day}/${month} ${hour}:${String(minute).padStart(2, '0')}`;
        }
    }

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
                    {userChat?.map((item) => (
                        <div
                            className={cx('message-another')}
                            key={item.idConversation}
                            onClick={() => {
                                console.log('uerrrrrrrrrr ' + item.userInfo.userName);
                                console.log('item.direct ' + item.userInfo.idUser);
                                handleSetLoadMessage(item.idConversation, item.userInfo.idUser); // idConversation + id người được nhắn
                            }}
                        >
                            <img className={cx('avatar')} src={images.cancer} alt="" />
                            <div className={cx('info-user')}>
                                <div className={cx('fullname')}>{item.userInfo.userName}</div>
                                <div className={cx('message-info')}>
                                    <div className={cx('lastest-message')}>
                                        <span>{item.direct === 1 ? 'Bạn: ' : ''}</span>
                                        {item.messageText}
                                    </div>
                                    <div className={cx('curTime')}>
                                        {isSameDay(new Date(item.timeSend))
                                            ? `${new Date(item.timeSend).getHours()}:${String(
                                                  new Date(item.timeSend).getMinutes(),
                                              ).padStart(2, '0')}${
                                                  new Date(item.timeSend).getHours() < 12 ? ' AM' : ' PM'
                                              }`
                                            : `${new Date(item.timeSend).getDate()}/${
                                                  new Date(item.timeSend).getMonth() + 1
                                              }`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('messenger-content')}>
                {isShowMessage ? (
                    <>
                        <div className={cx('chat-header')}>
                            {loadInfoChatSide.map((item, index) => (
                                <div className={cx('header-content')} key={index}>
                                    <img className={cx('avatar-header')} src={images.cancer} alt="" />
                                    <div className={cx('info-user')}>
                                        <div className={cx('fullname-header')}>{item.fullName}</div>
                                        <div className={cx('nickname-header')}>@{item.userName}</div>
                                    </div>
                                </div>
                            ))}

                            <div className={cx('action-group')}>
                                <a href="/call/@hd.roro">
                                    <PhoneCall className={cx('phone-call')} />
                                </a>
                                <Setting className={cx('chat-setting')} onClick={() => handleToggleSetting()} />
                            </div>
                        </div>
                        <div className={cx('chat-main')}>
                            {loadMessages.chat.map((item, index) =>
                                item.direct === 0 ? (
                                    <div className={cx('chat-item')} key={index}>
                                        <img src={images.leo} alt="" />
                                        <div className={cx('message-detail')}>
                                            <p className={cx('message')}>{item.messageText}</p>
                                            <span className={cx('time-send')}>{formatTime(item.timeSend)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('chat-item-user')} key={index}>
                                        <div className={cx('message-detail-user')}>
                                            <p className={cx('message')}>{item.messageText}</p>
                                            <span className={cx('time-send')}>{formatTime(item.timeSend)}</span>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className={cx('chat-send-bottom')}>
                            <Images className={cx('btn-image')} />
                            <div className={cx('message-input-area')}>
                                <input
                                    className={cx('input-message')}
                                    placeholder="Send a message...."
                                    value={typeMessage}
                                    onChange={(value) => handleChangeMessage(value)}
                                    onKeyPress={(event) => {
                                        if (
                                            (typeMessage !== '' && event.key === 'Enter') ||
                                            event.key === 'NumpadEnter'
                                        ) {
                                            console.log('Enter key pressed. Calling handleSendMessage.');
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </div>

                            {typeMessage === '' ? (
                                <SendMessageDisabled className={cx('btn-send')} />
                            ) : (
                                <SendMessage className={cx('btn-send')} onClick={() => handleSendMessage()} />
                            )}
                        </div>
                    </>
                ) : (
                    <div className={cx('chat-main-no-conversation')}>
                        <p>No conversation selected yet ...</p>
                    </div>
                )}
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
