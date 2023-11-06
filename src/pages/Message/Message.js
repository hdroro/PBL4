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
    handlePostFile,
    handlePostMessage,
    getFile
} from '~/services/userService';
import { handleGetConversationByID } from '~/services/conversationService';

const cx = classNames.bind(styles);

function Message({ socket, onlineUsers, user }) {
    const [isShowSetting, setIsShowSetting] = useState(false);
    const [typeMessage, setTypeMessage] = useState('');
    const [inputSearch, setInputSearch] = useState('');
    const { isShowing, toggle } = useModal();
    const [isShowingClear, setIsShowingClear] = useState(false);
    //FETCH USER CHAT
    const [userChat, setUserChat] = useState([]);
    const [idSession, setIdSession] = useState(null);
    const [load, setLoad] = useState(false);
    const [loadMessages, setLoadMessages] = useState([]);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [newMessage, setNewMessage] = useState({});

    //SETTTTTTTTTTTTTTTTTTTTTTT
    const [idConversation_, setIdconversation] = useState(1);
    const [idUser_, setIdUser] = useState(1);
    const [loadInfoChatSide, setLoadInfoChatSide] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newFile, setNewFile] = useState({});
    const [formData, setFormData] = useState(new FormData());
    //INITIAL SOCKET

    const handleChangeMessage = (event) => {
        setTypeMessage(event.target.value);
    };

    const handleToggleSetting = () => {
        setIsShowSetting(!isShowSetting);
    };
    const handleChangeInputSearch = (event) => {
        setInputSearch(event.target.value);
    };

    const handleToggleClear = () => {
        setIsShowingClear(!isShowingClear);
        console.log('delete side: ', user.idUser);
    };

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

    //GET MESSAGE
    const handleSetLoadMessage = async (idConversation, idUser) => {
        try {
            setIdconversation(idConversation);
            setIdUser(idUser);

            const blocked = await handleGetConversationByID(idConversation);

            const _isBlocked = blocked.conversationData.newConversation[0].isBlocked;
            if (_isBlocked === 1) {
                // socket.emit('block-conversation', _isBlocked);
                setIsBlocked(true);
            } else setIsBlocked(false);

            const response = await handleLoadMessage(idConversation, idUser);
            setLoadMessages(response.loadMessage);

            setIsShowMessage(true);

            const re = await handleGetInfoByID(idUser);
            setLoadInfoChatSide(re.userData.user);
            console.log('re.userData ' + re.userData.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        try {
            if (typeMessage=='') return;
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
            if (idSession == a2) {
                direct = 0;
                _idSession = a1;
            } else {
                direct = 1;
                _idSession = a2;
            }
            let direct_ = 1;
            const re = await handleGetInfoByID(idSession);
            const avatar = re.userData.user.avatar;

            setIdUser(_idSession);
            console.log('idUser_ ' + idUser_);
            console.log('id ' + isBlocked);

            const newMessage = {
                _idSession,
                idSession,
                idUser_,
                direct_,
                avatar,
                messageText,
                timeSend,
                idConversation,
            };

            setNewMessage(newMessage);
            setLoad(!load);
            console.log('haizzzzzzzzzzzzzzzzz ' + newMessage.messageText);
            console.log('isBlockeddddđ ' + isBlocked);
            setLoadMessages((prevLoadMessages) => ({
                chat: [newMessage, ...prevLoadMessages.chat],
            }));
            handlePostMessage(direct, messageText, timeSend, idConversation);
            // const res = handlePostMessage(direct, messageText, timeSend, idConversation);
            // console.log(res);
            socket.emit('send-message', newMessage);

            const response_ = await handleFetchChatUser();
            setUserChat(response_.userChatData);
            setTypeMessage('');
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
        }
    };

    const handleSendFile = async()=>{
    try{
        if (selectedFile == null) return;
        const file = selectedFile;
        const filename = 
        console.log(file);
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
        if (idSession == a2) {
            direct = 0;
            _idSession = a1;
        } else {
            direct = 1;
            _idSession = a2;
        }
        let direct_ = 1;
        const re = await handleGetInfoByID(idSession);
        const avatar = re.userData.user.avatar;

        setIdUser(_idSession);
        console.log('idUser_ ' + idUser_);
        console.log('id ' + isBlocked);
        const newFile={
            _idSession,
            idSession,
            idUser_,
            direct_,
            avatar,
            file,
            timeSend,
            idConversation,
            isImage: 1,
        }
        //Lúc load lại thì dĩm preview cái file ni ra ảnh nghen
        console.log(newFile.file);
        setNewFile(newFile);
        setLoad(!load);
        console.log('haizzzzzzzzzzzzzzzzz ' + newFile.file.name);
        console.log('isBlockeddddđ ' + isBlocked);
        // truyền đi new file ni là dữ liệu mềm, chưa lưu => không lấy link được
        await handlePostFile(direct,file,timeSend,idConversation).then((res)=>{
            newFile.messageText = res.saveMessage.chat;
        });
        setLoadMessages((prevLoadMessages) => ({
            chat: [newFile, ...prevLoadMessages.chat],
        }));
        socket.emit('send-file', newFile);

        const response_ = await handleFetchChatUser();
        setUserChat(response_.userChatData);
        setSelectedFile(null);
        // selectedFile = null;
        // console.log(selectedFile);
    } catch (error) {
        console.error('Error in handleSendMessage:', error);
    }
}

    useEffect(() => {
        if (socket === null) {
            console.log(null);
            return;
        }
        console.log('Socket connected:', socket.connected);
        socket.off('receive-message');

        socket.on('receive-message', async (data) => {
            // console.log('room ' + data.room);
            console.log('Received message: ', data);
            console.log('idSession ' + idSession + 'idUser_ ' + idUser_);
            if (data.idSession == idUser_ && data.idUser_ == idSession) {
                data.direct = 0;
                setLoadMessages((prevLoadMessages) => ({
                    chat: [data, ...prevLoadMessages.chat],
                }));
            }
            const chatUserResponse = await handleFetchChatUser();
            setUserChat(chatUserResponse.userChatData);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, newMessage, idUser_]);

    const [blocked, setBlocked] = useState(false);
    useEffect(() => {
        if (socket === null) return;
        socket.on('blocked-conversation', (data) => {
            console.log('block?? ' + data);
            setBlocked(data);
        });
    }, [socket]);

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

    const handleBlockConversationChange = async (value) => {
        setIsBlocked(value);
        await socket?.emit('block-conversation', { value, idUser_ });
        toggle(false);
    };

    const handleDeleteConversationChange = async (value) => {
        setIsShowingClear(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedFile(selectedFile);
        console.log(selectedFile);
        console.log('selectedFile', selectedFile);
    };

    const handleDeletImageAlt = () => {
        setSelectedFile(null);
        setTypeMessage('');
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
                            <img className={cx('avatar')} src={images[item.avatar]} alt="" />
                            <div className={cx('info-user')}>
                                <div className={cx('name-active')}>
                                    <div className={cx('fullname')}>{item.userInfo.userName}</div>
                                    <span
                                        className={cx({
                                            'online-user': onlineUsers.some(
                                                (user) => user?.userID === item.userInfo.idUser,
                                            ),
                                        })}
                                    ></span>{' '}
                                </div>
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
                            {loadInfoChatSide && (
                                <div className={cx('header-content')}>
                                    <Link
                                        to={`/api/profile/@${loadInfoChatSide.userName}`}
                                        className={cx('link-to-profile')}
                                    >
                                        <img
                                            className={cx('avatar-header')}
                                            src={images[loadInfoChatSide.avatar]}
                                            alt=""
                                        />
                                    </Link>
                                    <div className={cx('info-user')}>
                                        <div className={cx('fullname-header')}>
                                            <Link to={`/api/profile/@${loadInfoChatSide.userName}`}>
                                                {loadInfoChatSide.fullName}
                                            </Link>
                                        </div>
                                        <div className={cx('nickname-header')}>
                                            <Link to={`/api/profile/@${loadInfoChatSide.userName}`}>
                                                @{loadInfoChatSide.userName}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={cx('action-group')}>
                                <a href="/api/call/@hd.roro">
                                    <PhoneCall className={cx('phone-call')} />
                                </a>
                                <Setting className={cx('chat-setting')} onClick={() => handleToggleSetting()} />
                            </div>
                        </div>
                        <div className={cx('chat-main')}>
                            {loadMessages.chat.map((item, index) =>
                                item.direct === 0 ? (
                                    <div className={cx('chat-item')} key={index}>
                                        <Link
                                            to={`/api/profile/@${loadInfoChatSide.userName}`}
                                            className={cx('link-to-profile')}
                                        >
                                            <img src={images[item.avatar]} alt="" />
                                        </Link>

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
                        {isBlocked || blocked ? (
                            <div className={cx('block-container')}>
                                <span className={cx('block-title')}>Cuộc trò chuyện đã bị chặn!</span>
                                <span className={cx('block-note')}>Hiện các bạn không thể trò chuyện.</span>
                            </div>
                        ) : (
                            <div className={cx('chat-send-bottom')}>
                                {selectedFile && (
                                    <div className={cx('image-alt')}>
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Selected Image"
                                            className={cx('image-file')}
                                        />
                                        <span onClick={handleDeletImageAlt}>×</span>
                                    </div>
                                )}
                                <div className={cx('chat-action')}>
                                    <label htmlFor="fileInput" className={cx('btn-image')}>
                                        <Images className={cx('btn-image')} />
                                    </label>
                                    {/* //chỗ chọn file */}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />

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
                                                    handleSendFile();
                                                }
                                            }}
                                        />
                                    </div>
                                    {(typeMessage === '' && selectedFile==null) ? (
                                        <SendMessageDisabled className={cx('btn-send')} />
                                    ) : (
                                        <SendMessage className={cx('btn-send')} onClick={() => {handleSendMessage();handleSendFile()}} />
                                    )}
                                </div>
                            </div>
                        )}
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
                            <Block
                                hide={toggle}
                                idConversation={idConversation_}
                                onBlockConversationChange={handleBlockConversationChange}
                            >
                                Bạn có chắc chắn muốn chặn người này hay không ?
                            </Block>
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
                            <Block
                                hide={handleToggleClear}
                                idConversation={idConversation_}
                                onDeleteConversation={handleDeleteConversationChange}
                                isDelete={true}
                            >
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
