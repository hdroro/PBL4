/* eslint-disable jsx-a11y/img-redundant-alt */
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import {
    BackIcon,
    BlockMessage,
    CloseIcon,
    FileMessage,
    Images,
    NotBlockMessage,
    NotifIcon,
    PhoneCall,
    Remove,
    SearchDown,
    SearchIcon,
    SearchUp,
    SendMessage,
    SendMessageDisabled,
    Setting,
    UserGroup,
} from '~/components/Icon/Icon';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import routes from '~/config/routes';
import Button from '~/components/Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import Block from '~/components/Modal/ModalConfirm/Block/Block';
import { handleFetchChatUser, handleGetAccById, handleGetInfoByID } from '~/services/userService';
import { handleLoadMessage, handlePostMessage } from '~/services/messageService';
import {
    handleDeleteConversation,
    handleGetConversationByID,
    handleUpdateBlockStatusConversation,
} from '~/services/conversationService';
import { handlePostBlockInfo, handleGetBlockInfo, handleDeleteBlockInfo } from '~/services/blockService';
import { handlePostFile } from '~/services/userService';
import { handlePostDeleteInfo, handleUpdateDeleteInfo } from '~/services/deleteService';
import { mydate, formatTime, isSameDay } from '~/utils/date';
import {
    handleDeleteNotificationMessageInfo,
    handlePostNotificationMessageInfo,
    handleGetAllNotificationMessageInfo,
} from '~/services/notificationMessageService';

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
    const [userBlock, setUserBlock] = useState(null);
    const [isOpenBlock, setIsOpenBlock] = useState(false);
    const [isDisableBlock, setIsDisableBlock] = useState(false);
    const [blockInfo, setBlockInfo] = useState({});
    const [blocked, setBlocked] = useState(false);
    const [currentChatBlock, setCurrentChatBlock] = useState(null);

    const [isDelete, setIsDelete] = useState(false);
    const [isCloseSearch, setIsCloseSearch] = useState(true);
    const [isShowingDetailSearch, setIsShowingDetailSearch] = useState(false);
    const [currentResultIndex, setCurrentResultIndex] = useState(0);
    const [currentResultIndexFounded, setCurrentResultIndexFounded] = useState(0);
    const [firstVisit, setFirstVisit] = useState(true);
    const [isShowingResultsSearch, setIsShowingResultsSearch] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [newFile, setNewFile] = useState({});
    const [fileName, setFileName] = useState('');
    const [notifications, setNotifications] = useState([]);
    // const [unreadnotifications, setUnreadNotifications] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [thisUserNotification, setThisUserNotification] = useState([]);
    const [reLoadPage, setReloadPage] = useState(false);
    const [idMessageLastest, setIdMessageLastest] = useState(1);
    const [senderID, setSenderID] = useState(null);
    const [receiverID, setReceiveID] = useState(null);
    const [listNotificationOfUser, setListNotificationOfUser] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    //INITIAL SOCKET
    console.log('notification ', notifications);

    useEffect(() => {
        setFirstVisit(false);
    }, []);

    const handleChangeMessage = (event) => {
        setTypeMessage(event.target.value);
    };

    const handleToggleSetting = () => {
        setIsShowSetting(!isShowSetting);
    };
    const handleChangeInputSearch = (event) => {
        setInputSearch(event.target.value);
        if (event.target.value === '') setIsCloseSearch(false);
        else setIsCloseSearch(true);
    };

    const handleDeleteInputSearch = () => {
        setInputSearch('');
        setIsShowingResultsSearch(null);
        setIsCloseSearch(false);
    };

    const handleToggleClear = () => {
        setIsShowingClear(!isShowingClear);
    };

    useEffect(() => {
        const fetchUserChat = async () => {
            try {
                const response = await handleFetchChatUser();
                setUserChat(response.userChatData);
                setIdSession(response.userChatData[0].idSession);

                const listNotifications = await handleGetAllNotificationMessageInfo();
                console.log(listNotifications);
                setListNotificationOfUser(listNotifications?.notificationMessageInfo.statusNotificationMessage);
                // const response_deleted = await handleGetDeleteInfo(response.userChatData[0])
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserChat();
    }, [reLoadPage, notifications]);

    console.log('listNotificationOfUser', listNotificationOfUser);
    //GET MESSAGE
    const handleSetLoadMessage = async (idConversation, idUser) => {
        try {
            setActiveChat(idConversation);
            setIdconversation(idConversation);
            setIdUser(idUser);
            setIsBlocked(false);
            setIsOpenBlock(false);
            setIsDisableBlock(false);
            setIsShowingDetailSearch(false);
            setInputSearch('');
            setIsShowSetting(false);
            setIsDelete(false);
            setCurrentChatBlock(null);
            setCurrentConversation(idConversation);
            console.log('senderID', senderID);
            console.log('receiverID', receiverID);
            console.log('idUser', idUser);
            console.log('idConversation', idConversation);
            handleDeleteNotificationMessageInfo(idConversation, idUser);

            const blockInfo = await handleGetBlockInfo(idConversation);
            if (notifications.length === 0) {
                if (
                    listNotificationOfUser?.some(
                        (item) =>
                            item.idConversation === idConversation &&
                            item.senderId === idUser &&
                            item.receiverId === user.idUser,
                    )
                ) {
                    setReloadPage(!reLoadPage);
                }
            } else {
                markThisUserNotificationsAsRead(idConversation, thisUserNotification, notifications);
            }
            console.log('blockInfo.blockDataInfo.blockDataInfo ' + blockInfo.blockDataInfo?.infoBlock[0]);
            setBlockInfo(blockInfo.blockDataInfo?.infoBlock[0]);

            const blocked = await handleGetConversationByID(idConversation);

            const _isBlocked = blocked.conversationData.newConversation[0].isBlocked;
            console.log('_isBlocked ' + _isBlocked);

            if (_isBlocked === 1) setBlocked(true);
            else setBlocked(false);

            const response = await handleLoadMessage(idConversation, idUser);
            setLoadMessages(response.loadMessage);
            setIsShowMessage(true);

            const re = await handleGetInfoByID(idUser);
            setLoadInfoChatSide(re.userData.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        try {
            if (typeMessage === '') return;
            const messageText = typeMessage;
            const currentDate = new Date();
            const timeSend = mydate(currentDate);
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
                isFile: 0,
            };

            setNewMessage(newMessage);
            setLoad(!load);
            setLoadMessages((prevLoadMessages) => ({
                chat: [newMessage, ...prevLoadMessages.chat],
            }));
            handlePostMessage(direct, messageText, timeSend, idConversation, messageText);
            handlePostNotificationMessageInfo(idConversation, idSession, _idSession, 1);

            // const res = handlePostMessage(direct, messageText, timeSend, idConversation);
            // console.log(res);
            socket.emit('send-message', newMessage);
            chatRef.current.scrollTop = chatRef.current.scrollHeight;

            // const response_ = await handleFetchChatUser();
            // setUserChat(response_.userChatData);
            setReloadPage(!reLoadPage);
            setTypeMessage('');
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
        }
    };

    const handleSendFile = async () => {
        try {
            if (selectedFile == null) return;
            const file = selectedFile;
            const currentDate = new Date();
            const timeSend = mydate(currentDate);
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
            const newFile = {
                _idSession,
                idSession,
                idUser_,
                direct_,
                avatar,
                file,
                fileName,
                timeSend,
                idConversation,
                isFile: 1,
            };
            //Lúc load lại thì dĩm preview cái file ni ra ảnh nghen
            setNewFile(newFile);
            setLoad(!load);
            // truyền đi new file ni là dữ liệu mềm, chưa lưu => không lấy link được
            await handlePostFile(direct, file, timeSend, idConversation, fileName).then((res) => {
                newFile.messageText = res.saveMessage.chat;
            });
            handlePostNotificationMessageInfo(idConversation, idSession, _idSession, 1);

            setLoadMessages((prevLoadMessages) => ({
                chat: [newFile, ...prevLoadMessages.chat],
            }));
            await socket.emit('send-file', newFile);

            // const response_ = await handleFetchChatUser();
            // setUserChat(response_.userChatData);
            setReloadPage(!reLoadPage);
            setSelectedFile(null);
        } catch (error) {
            console.error('Error in handleSendFile:', error);
        }
    };

    const getFileExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    };

    const isImageFile = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // Thêm các phần mở rộng ảnh khác nếu cần

        const extension = getFileExtension(filename).toLowerCase();
        return imageExtensions.includes(extension);
    };

    const handleOpenBlock = useCallback(async () => {
        setIsOpenBlock(false);
        setIsDisableBlock(false);
        setBlockInfo(null);
        setIsBlocked(false);
        setBlocked(false);
        setCurrentChatBlock(null);

        socket?.emit('open-block-conversation', {
            idUser_,
            isOpenBlock,
            isDisableBlock,
            blockInfo,
            isBlocked,
            blocked,
        });
        console.log('idUser_ ' + idSession + 'idConversation_ ' + idConversation_);
        await Promise.all([
            handleUpdateBlockStatusConversation(idConversation_),
            handleDeleteBlockInfo(idSession, idConversation_),
        ]);
    }, [blockInfo, blocked, idConversation_, idSession, idUser_, isBlocked, isDisableBlock, isOpenBlock, socket]);

    const unreadNotificationsFuc = (notifications) => {
        return notifications?.filter((n) => n?.isRead === false);
    };

    //NOTIFI--- Can't fix
    useEffect(() => {
        // console.log('idSession ' + idUser_);
        const res = unreadNotificationsFuc(notifications);
        setThisUserNotification(res);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notifications]);

    const markThisUserNotificationsAsRead = useCallback((idConversation, thisUserNotification, notifications) => {
        console.log('thisUserNotification ', thisUserNotification);
        console.log('notifications ', notifications);

        const mNotifications = notifications?.map((el) => {
            if (idConversation === el?.idConversation) {
                console.log('el?.idConversation ', el?.idConversation);
                console.log('idConversation ', idConversation);

                const matchingNotification = thisUserNotification?.find((n) => n.senderID === el.senderID);

                if (matchingNotification) {
                    return { ...matchingNotification, isRead: true };
                } else {
                    return el;
                }
            } else {
                return el;
            }
        });
        console.log('mNotifications', mNotifications);
        setNotifications(mNotifications);
    }, []);

    useEffect(() => {
        if (socket === null) return;
        socket.off('receive-message');
        socket.off('receive-notification');

        socket.on('receive-message', async (data) => {
            const chatUserResponse = await handleFetchChatUser();
            chatUserResponse.userChatData?.map(async (item) => {
                if (
                    item.idConversation === data.idConversation &&
                    item.infoUserDelete.length !== 0 &&
                    item.infoUserDelete[0].deleteAtId !== 1
                ) {
                    await handleUpdateDeleteInfo(
                        item.infoUserDelete[0].idDelete,
                        item.infoUserDelete[0].idDeleted,
                        item.infoUserDelete[0].deleteAtId,
                    );
                    // await handleDeleteInfoDeleted(item.infoUserDelete[0].idDelete, item.infoUserDelete[0].idDeleted);
                    // setLoadMessages((prevLoadMessages) => ({
                    //     chat: [data, ...(prevLoadMessages?.chat || [])],
                    // }));
                    // setReloadPage(!reLoadPage);
                }
            });

            if (data.idSession === idUser_ && data.idUser_ === idSession) {
                data.direct = 0;
                setLoadMessages((prevLoadMessages) => ({
                    chat: [data, ...(prevLoadMessages?.chat || [])],
                }));
            }
            // chatRef.current.scrollTop = chatRef?.current?.scrollHeight;

            setUserChat(chatUserResponse.userChatData);
            // setReloadPage(!reLoadPage);
        });

        socket.on('receive-notification', async (data) => {
            const currentUser = await handleGetAccById(currentConversation);
            const idAcc1 = currentUser.accountList?.chat[0]?.idAcc1;
            const idAcc2 = currentUser.accountList?.chat[0]?.idAcc2;
            console.log('currenCOnver:' + currentConversation + ' ACC1 ' + idAcc1 + ' ACC2 ' + idAcc2);
            setSenderID(data.senderID);
            setReceiveID(data.receiverID);

            if (
                (data.senderID === idAcc1 && data.receiverID === idAcc2) ||
                (data.senderID === idAcc2 && data.receiverID === idAcc1)
            ) {
                setNotifications((prev) => prev && [{ ...data, isRead: true }, ...prev]);
                handleDeleteNotificationMessageInfo(data.idConversation, data.senderID);
            } else {
                console.log('data', data);
                // handlePostNotificationMessageInfo(data.idConversation, data.senderID, data.receiverID, 1);
                setNotifications((prev) => prev && [data, ...prev]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, newMessage, idUser_, currentConversation]);

    useEffect(() => {
        if (socket === null) return;
        socket.off('blocked-conversation');
        socket.on('blocked-conversation', async (data) => {
            // const response = await handleGetAccById(data.idConversation_);
            // const a2 = response.accountList.chat[0].idAcc2;
            // const a1 = response.accountList.chat[0].idAcc1;

            // // console.log('data ' + data);
            // // console.log('a2 ' + a2 + 'a1 ' + a1 + 'idUser_ ' + idUser_);
            // let idBlock = null;
            // if (a2 === data.idUser_) {
            //     setUserBlock(a1);
            //     idBlock = a1;
            // } else if (a1 === data.idUser_) {
            //     setUserBlock(a2);
            //     idBlock = a2;
            // }
            // setBlocked(data.value);
            setCurrentChatBlock(data.idConversation_);
            // await handlePostBlockInfo(idBlock, data.idUser_, data.idConversation_);

            // setIsBlocked(data.value);
            setIsDisableBlock(true);
            setIsOpenBlock(false);
            // console.log('block: ' + idBlock + ' blocked: ' + data.idUser_);
        });
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.off('opened-block-conversation');
        socket.on('opened-block-conversation', async (data) => {
            setIsOpenBlock(false);
            setIsDisableBlock(false);
            setBlockInfo(null);
            setIsBlocked(false);
            setBlocked(false);
            setCurrentChatBlock(null);
        });
    }, [socket]);

    const handleBlockConversationChange = async (value) => {
        setIsBlocked(value);
        await socket?.emit('block-conversation', { value, idUser_, idConversation_ });
        const response = await handleGetAccById(idConversation_);
        const a2 = response.accountList.chat[0].idAcc2;
        const a1 = response.accountList.chat[0].idAcc1;

        // console.log('data ' + data);
        // console.log('a2 ' + a2 + 'a1 ' + a1 + 'idUser_ ' + idUser_);
        let idBlock = null;
        if (a2 === idUser_) {
            setUserBlock(a1);
            idBlock = a1;
        } else if (a1 === idUser_) {
            setUserBlock(a2);
            idBlock = a2;
        }
        // setBlocked(data.value);
        await handlePostBlockInfo(idBlock, idUser_, idConversation_);
        toggle(false);
        setIsOpenBlock(true);
    };

    const handleDeleteConversationChange = async (value) => {
        // console.log('value of delete: ', value);
        // console.log('delete side: ', user.idUser);
        // console.log('delete side     aaaa: ', idUser_);
        // console.log('currentConversation: ', currentConversation);
        const response = await handleLoadMessage(currentConversation, idUser_);
        console.log('currentConversation', currentConversation);
        console.log('idUser_', idUser_);
        setIdMessageLastest(response.loadMessage?.chat[0]?.idMessage);
        setIsShowSetting(false);
        setIsShowingClear(false);
        await handlePostDeleteInfo(
            user.idUser,
            idUser_,
            currentConversation,
            response?.loadMessage?.chat[0]?.idMessage,
        );
        await handleDeleteConversation(currentConversation);
        const newUserChat = userChat?.filter((u) => u.userInfo.idUser !== idUser_);
        setUserChat(newUserChat);
        setIsDelete(value);
        setLoadMessages([]);
        // setIdUser(0);
    };

    console.log(idMessageLastest);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFileName(selectedFile?.name);
        setSelectedFile(selectedFile);
        setTypeMessage('');
        console.log('selectedFile', selectedFile);
    };

    const handleDeletImageAlt = () => {
        setSelectedFile(null);
        setTypeMessage('');
    };

    const [filteredMessages, setFilteredMessages] = useState([]);
    const handleSearch = () => {
        setFirstVisit(true);
        setIsShowingDetailSearch(true);

        const removeDiacritics = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        };

        const foundIndexes = [];
        const sanitizedSearch = removeDiacritics(inputSearch.toLowerCase());

        loadMessages.chat.forEach((message, index) => {
            const sanitizedMessage = removeDiacritics(message.messageText.toLowerCase());
            if (sanitizedMessage.includes(sanitizedSearch)) {
                foundIndexes.push(index);
            }
        });

        setFilteredMessages(foundIndexes);
        setCurrentResultIndexFounded(foundIndexes[0]);
        setIsShowingResultsSearch(foundIndexes.length);
    };

    const chatRef = useRef(null);

    const handleSearchDown = () => {
        if (currentResultIndex > 0) {
            setCurrentResultIndex(currentResultIndex - 1);
            setCurrentResultIndexFounded(filteredMessages[currentResultIndex - 1]);
            const selectedMessage = chatRef.current.children[filteredMessages[currentResultIndex - 1]];
            selectedMessage?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSearchUp = () => {
        if (currentResultIndex < filteredMessages.length - 1) {
            setCurrentResultIndex(currentResultIndex + 1);
            setCurrentResultIndexFounded(filteredMessages[currentResultIndex + 1]);
            const selectedMessage = chatRef.current.children[filteredMessages[currentResultIndex + 1]];
            selectedMessage?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCloseDetailSearch = () => {
        setInputSearch('');
        setFirstVisit(false);
        setIsShowingDetailSearch(false);
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    const navigate = useNavigate();

    const handleClickOnCall=()=>{
        socket.emit("start-call", {from: user.idUser, to: loadInfoChatSide.idUser});
        // navigate(`/api/call/${loadInfoChatSide.idUser}`,{state:{from: true}});
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

                <div>
                    {userChat
                        ?.filter(
                            (item) =>
                                item.infoUserDelete.length === 0 ||
                                (item.infoUserDelete.length === 1 &&
                                    item.idSession !== item.infoUserDelete[0]?.idDelete) ||
                                (item.infoUserDelete.length === 1 &&
                                    item.idSession === item.infoUserDelete[0]?.idDelete &&
                                    item.idMessage > item.infoUserDelete[0]?.deleteAtId) ||
                                (item.infoUserDelete.length === 2 &&
                                    item.idSession === item.infoUserDelete[0]?.idDelete &&
                                    item.idMessage > item.infoUserDelete[0]?.deleteAtId) ||
                                (item.idSession === item.infoUserDelete[1]?.idDelete &&
                                    item.idMessage > item.infoUserDelete[1]?.deleteAtId),
                        )
                        .map((item) => (
                            <div
                                className={cx('message-another', { active: item.idConversation === activeChat })}
                                key={item.idConversation}
                                onClick={() => {
                                    handleSetLoadMessage(item.idConversation, item.userInfo.idUser); // idConversation + id người được nhắn
                                }}
                            >
                                <img className={cx('avatar')} src={images[item.avatar]} alt="" />
                                <div className={cx('info-user')}>
                                    <div className={cx('name-active')}>
                                        <div className={cx('fullname')}>{item.userInfo.userName}</div>
                                        <div className={cx('group-info-message')}>
                                            <span
                                                className={cx(
                                                    unreadNotificationsFuc(notifications)?.filter(
                                                        (n) => n.senderID === item.userInfo.idUser,
                                                    )?.length > 0 ||
                                                        listNotificationOfUser?.filter(
                                                            (noti) =>
                                                                noti.senderId === item.userInfo.idUser &&
                                                                noti.idConversation === item.idConversation,
                                                        ).length > 0
                                                        ? 'count-message'
                                                        : '',
                                                )}
                                            >
                                                {/* {console.log('notifications________', notifications)} */}
                                                {Math.max(
                                                    unreadNotificationsFuc(notifications)?.filter(
                                                        (n) =>
                                                            n.senderID === item.userInfo.idUser &&
                                                            n.receiverID === item.idSession,
                                                    )?.length || 0,
                                                    listNotificationOfUser
                                                        ?.filter(
                                                            (noti) =>
                                                                noti.senderId === item.userInfo.idUser &&
                                                                noti.idConversation === item.idConversation,
                                                        )
                                                        .reduce((total, noti) => total + noti.notificationCount, 0) ||
                                                        0,
                                                ) > 0
                                                    ? `(${Math.max(
                                                          unreadNotificationsFuc(notifications)?.filter(
                                                              (n) =>
                                                                  n.senderID === item.userInfo.idUser &&
                                                                  n.receiverID === item.idSession,
                                                          )?.length || 0,
                                                          listNotificationOfUser
                                                              ?.filter(
                                                                  (noti) =>
                                                                      noti.senderId === item.userInfo.idUser &&
                                                                      noti.idConversation === item.idConversation,
                                                              )
                                                              .reduce(
                                                                  (total, noti) => total + noti.notificationCount,
                                                                  0,
                                                              ) || 0,
                                                      )})`
                                                    : ''}
                                            </span>

                                            <span
                                                className={cx({
                                                    'online-user': onlineUsers.some(
                                                        (user) => user?.userID === item.userInfo.idUser,
                                                    ),
                                                })}
                                            ></span>
                                        </div>
                                    </div>
                                    <div className={cx('message-info')}>
                                        <div
                                            className={cx(
                                                unreadNotificationsFuc(notifications)?.filter(
                                                    (n) => n.senderID === item.userInfo.idUser,
                                                )?.length > 0 ||
                                                    listNotificationOfUser?.filter(
                                                        (noti) =>
                                                            noti.senderId === item.userInfo.idUser &&
                                                            noti.idConversation === item.idConversation,
                                                    ).length > 0
                                                    ? 'lastest-message-bold'
                                                    : 'lastest-message',
                                            )}
                                        >
                                            <span>{item.direct === 1 ? 'Bạn: ' : ''}</span>
                                            {item.isFile === 0
                                                ? item.messageText
                                                : isImageFile(item.messageText)
                                                ? 'Đã gửi 1 ảnh'
                                                : 'Đã gửi 1 file'}
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
                {isShowMessage && !isDelete ? (
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
                                {/* <a href={`/api/call/${loadInfoChatSide.idUser}`}>
                                    <PhoneCall className={cx('phone-call')} />
                                </a> */}
                                <Link to={`/api/call/${loadInfoChatSide.idUser}`} state={{from: true}} onClick={handleClickOnCall}>
                                    <PhoneCall className={cx('phone-call')} />
                                </Link>
                                <Setting className={cx('chat-setting')} onClick={() => handleToggleSetting()} />
                            </div>
                        </div>
                        {isShowingDetailSearch && (
                            <div className={cx('search-action')}>
                                <div className={cx('search-input')}>
                                    <div className={cx('search-message')} onClick={handleSearch}>
                                        <SearchIcon />
                                    </div>
                                    <input
                                        type="text"
                                        name="search"
                                        value={inputSearch}
                                        onChange={(value) => handleChangeInputSearch(value)}
                                    />
                                    {isShowingResultsSearch !== null && (
                                        <span className={cx('search-results')}>
                                            {isShowingResultsSearch}{' '}
                                            <span> {isShowingResultsSearch >= 2 ? 'results' : 'result'}</span>
                                        </span>
                                    )}

                                    <div className={cx('search-icon')}>
                                        {isCloseSearch && (
                                            <CloseIcon
                                                className={cx('close-icon', 'icon')}
                                                onClick={handleDeleteInputSearch}
                                            />
                                        )}
                                        <SearchUp className={cx('searchup-icon', 'icon')} onClick={handleSearchUp} />
                                        <SearchDown
                                            className={cx('searchdown-icon', 'icon')}
                                            onClick={handleSearchDown}
                                        />
                                    </div>
                                </div>
                                <button className={cx('close-search')} onClick={handleCloseDetailSearch}>
                                    Close
                                </button>
                            </div>
                        )}
                        <div className={cx('chat-main')} ref={chatRef}>
                            {loadMessages?.chat.map((result, index) => (
                                <div key={result.idMessage}>
                                    {result.direct === 0 ? (
                                        <div className={cx('chat-item')} key={index}>
                                            <Link
                                                to={`/api/profile/@${loadInfoChatSide.userName}`}
                                                className={cx('link-to-profile')}
                                            >
                                                <img src={images[result.avatar]} alt="" />
                                            </Link>
                                            <div className={cx('message-detail')}>
                                                {result.isFile === 0 ? (
                                                    <p
                                                        className={cx('message', {
                                                            highlighted:
                                                                firstVisit && index === currentResultIndexFounded,
                                                        })}
                                                    >
                                                        {result.messageText}
                                                    </p>
                                                ) : isImageFile(result.messageText) ? (
                                                    <img
                                                        className={cx('transfer-image')}
                                                        src={`http://localhost:8080/public/img/${result.messageText}`}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <a
                                                        href={`http://localhost:8080/public/img/${result.messageText}`}
                                                        download={result.fileName}
                                                        className={cx('container-file')}
                                                    >
                                                        <FileMessage className={cx('file-message-icon')} />{' '}
                                                        {result.fileName}
                                                    </a>
                                                )}
                                                <span className={cx('time-send')}>{formatTime(result.timeSend)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cx('chat-item-user')} key={index}>
                                            <div className={cx('message-detail-user')}>
                                                {result.isFile === 0 ? (
                                                    <p
                                                        className={cx('message', {
                                                            highlighted:
                                                                firstVisit && index === currentResultIndexFounded,
                                                        })}
                                                    >
                                                        {result.messageText}
                                                    </p>
                                                ) : isImageFile(result.messageText) ? (
                                                    <img
                                                        className={cx('transfer-image')}
                                                        src={`http://localhost:8080/public/img/${result.messageText}`}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <a
                                                        href={`http://localhost:8080/public/img/${result.messageText}`}
                                                        download={result.fileName}
                                                        className={cx('container-file')}
                                                    >
                                                        <FileMessage className={cx('file-message-icon')} />
                                                        {result.fileName}
                                                    </a>
                                                )}
                                                <span className={cx('time-send')}>{formatTime(result.timeSend)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isBlocked || blocked || currentChatBlock === currentConversation ? (
                            <div className={cx('block-container')}>
                                <span className={cx('block-title')}>Cuộc trò chuyện đã bị chặn!</span>
                                <span className={cx('block-note')}>Hiện các bạn không thể trò chuyện.</span>
                            </div>
                        ) : (
                            <div className={cx('chat-send-bottom')}>
                                {selectedFile && (
                                    <div className={cx('image-alt')}>
                                        {isImageFile(selectedFile.name) ? (
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Selected Image"
                                                className={cx('image-file')}
                                            />
                                        ) : (
                                            <p>{selectedFile.name}</p>
                                        )}
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
                                        accept="image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
                                                    handleSendMessage();
                                                    handleSendFile();
                                                }
                                            }}
                                        />
                                    </div>
                                    {typeMessage === '' && selectedFile == null ? (
                                        <SendMessageDisabled className={cx('btn-send')} />
                                    ) : (
                                        <SendMessage
                                            className={cx('btn-send')}
                                            onClick={() => {
                                                handleSendMessage();
                                                handleSendFile();
                                            }}
                                        />
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
                            <div className={cx('search-message')} onClick={handleSearch}>
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                name="search"
                                value={inputSearch}
                                onChange={(value) => handleChangeInputSearch(value)}
                            />
                        </div>
                        {filteredMessages.map((message) => (
                            <div key={message.idMessage}>{message.messageText}</div>
                        ))}
                        {console.log(
                            'idUser_ ' +
                                idUser_ +
                                'isOpenBlock ' +
                                isOpenBlock +
                                'isDisableBlock ' +
                                isDisableBlock +
                                'blockInfo?.idBlocked ' +
                                blockInfo?.idBlocked,
                        )}
                        {(isOpenBlock || blockInfo?.idBlocked === idUser_) && (
                            <Button normal post leftIcon={<NotBlockMessage />} onClick={handleOpenBlock}>
                                UnBlock
                            </Button>
                        )}
                        {!isOpenBlock &&
                            !isDisableBlock &&
                            blockInfo?.idBlocked !== idUser_ &&
                            blockInfo?.idBlock !== idUser_ && (
                                <Button normal post leftIcon={<BlockMessage />} onClick={toggle}>
                                    Block
                                </Button>
                            )}

                        {(isDisableBlock || blockInfo?.idBlock === idUser_) && (
                            <Button normal post leftIcon={<BlockMessage />} onClick={toggle} disabled>
                                Block
                            </Button>
                        )}

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
