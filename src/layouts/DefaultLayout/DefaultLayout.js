import classNames from 'classnames/bind';
import { Fragment, useEffect, useRef, useState } from 'react';
import React from 'react';

import styles from './DefaultLayout.module.scss';
import { handleGetInfo } from '~/services/userService';
import PropTypes from 'prop-types';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import Modal from '~/components/Modal/Modal';
import { Check, CloseIcon, UserGroup } from '~/components/Icon/Icon';
import Message from '~/pages/Message';
import ConfirmMatching from '~/components/Modal/ModalConfirm/ConfirmMatching';
import ToastMessage from '~/components/Modal/ModalConfirm/ToastMessage';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function DefaultLayout({ children, socket }) {
    const count = useRef(0);
    const [user, setUser] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isShowRequest, setShowRequest] = useState(false);
    const [fromId, setFromId] = useState();
    const [matchId, setMatchId] = useState();
    // const [isCreateConversation, setCreateConversation] = useState(false);
    const [isShowNotifMatching, setShowNotifMatching] = useState(false);
    const [isShowDenyMatching, setShowDenyMatching] = useState(false);
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await handleGetInfo();
                setUser(response?.userData?.user[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (socket === null) return;
        console.log(user);
        if (user?.idUser) {
            socket.emit('addNewUser', user.idUser);
            socket.on('getOnlineUsers', (response) => {
                setOnlineUsers(response);
            });
        }
    }, [user]);

    useEffect(() => {
        if(socket === null) return;
        if(user) {
            console.log('check counttttttttttttttt: ', count.current)
            socket.off('receive-request-matching');
            socket.on('receive-request-matching', (response) => {
                console.log(response);
                console.log('123333333333333333');
                // setShowRequest(!isShowRequest);
                // setFromId(response.fromId);
                // setMatchId(response.matchId);
                toast.info(<ContentToastMessage title={'Thông báo'} content={'Bạn vừa có yêu cầu matching!'}/>,
                    {position: toast.POSITION.TOP_RIGHT}
                )
                
            })
        }
    }, [user])

    useEffect(() => {
        if(socket === null) return;
        socket.off('move-to-new-conversation');
        socket.on('move-to-new-conversation', (data) => {
            console.log(data);
            // setShowNotifMatching(true);
            toast.success(<ContentToastMessage title={'Thông báo'} content={'Bạn đã được matching thành công!'}/>,
                {position: toast.POSITION.TOP_RIGHT, autoClose: 3000}
            )
        })
    }, [user])

    useEffect(() => {
        if (socket === null) return;
        if(user) {
            socket.off('send-deny-matching');
            socket.on('send-deny-matching', (data) => {
            console.log(data);
            // setShowDenyMatching(true);
            toast.error(<ContentToastMessage title={'Thông báo'} content={'Rất tiếc! Bạn đã bị từ chối matching!'}/>,
                {position: toast.POSITION.TOP_RIGHT, autoClose: 3000}
            )
        });
        }
    }, [user]);

    const ContentToastMessage = ({ title, content }) => (
        <div>
            <div style={{fontWeight: 600, color: 'black', fontSize: 16}}>{title}</div>
            <div style={{fontSize: 14, marginTop: 3}}>{content}</div>
        </div>
    )

    console.log('OnlineUser', onlineUsers);

    const handleToggleShowRequest = () => {
        setShowRequest(!isShowRequest);
    };

    const handleToggleShowNotifMatching = () => {
        setShowNotifMatching(!isShowNotifMatching);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { socket, onlineUsers, user });
        }
        return child;
    });
    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('grid')}>
                        <div className={cx('content')}> {childrenWithProps}</div>
                        <div className={cx('matching')}>
                            {/* {isShowRequest && (
                                <Modal background leftIcon={<UserGroup/>} title={'Request matching'} isShowing={isShowRequest} hide={handleToggleShowRequest}>
                                    <RequestFriend hide={handleToggleShowRequest} fromId={fromId && fromId} socket={socket} onlineUsers={onlineUsers} matchId={matchId && matchId}/>
                                </Modal>
                            )}
    
                            {isShowNotifMatching && (
                                <Modal background leftIcon={<UserGroup/>} title={'Notification'} isShowing={isShowNotifMatching} hide={handleToggleShowNotifMatching}>
                                    <ConfirmMatching hide={handleToggleShowNotifMatching} fromId={fromId && fromId} socket={socket} onlineUsers={onlineUsers} matchId={matchId && matchId}/>
                                </Modal>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </Fragment>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
