import classNames from 'classnames/bind';
import styles from './TwoSideBar.module.scss';
import React from 'react';

import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import SubSidebar from '../components/SubSidebar';
import { useEffect, useState } from 'react';
import { handleGetInfo } from '~/services/userService';
import { io } from 'socket.io-client';
import Modal from '~/components/Modal/Modal';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import { UserGroup } from '~/components/Icon/Icon';
import Message from '~/pages/Message';
import ConfirmMatching from '~/components/Modal/ModalConfirm/ConfirmMatching';

const cx = classNames.bind(styles);

function TwoSideBar({ children, socket }) {
    const [user, setUser] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isShowRequest, setShowRequest] = useState(false);
    const [fromId, setFromId] = useState();
    const [matchId, setMatchId] = useState();
    const [isShowNotifMatching, setShowNotifMatching] = useState(false);
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await handleGetInfo();
                console.log(response);
                console.log('npppp ' + response.userData.user[0]);
                setUser(response.userData.user[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    // useEffect(() => {
    //     const newSocket = io('http://localhost:3001');
    //     setSocket(newSocket);

    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, [user]);

    useEffect(() => {
        if (socket === null) return;
        console.log(user);
        if(user.idUser) {
            socket.emit('addNewUser', user.idUser);
            socket.on('getOnlineUsers', (response) => {
                setOnlineUsers(response);
            });
        }
    }, [user]);

    useEffect(() => {
        if(socket === null) return;
        socket.on('receive-request-matching', (response) => {
            console.log(response);
            setShowRequest(!isShowRequest);
            setFromId(response.fromId);
            setMatchId(response.matchId);
        })
    }, [])

    useEffect(() => {
        if(socket === null) return;
        socket.on('move-to-new-conversation', (data) => {
            console.log(data);
            setShowNotifMatching(true);
        })
    }, [])

    const handleToggleShowRequest = () => {
        setShowRequest(!isShowRequest);
    }

    const handleToggleShowNotifMatching = () => {
        setShowNotifMatching(!isShowNotifMatching);
    }
    console.log('OnlineUser', onlineUsers);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { socket, onlineUsers });
        }
        return child;
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-3 m-3 c-3')}>
                                <Sidebar user={user} />
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <SubSidebar />
                            </div>
                            <div className={cx('col l-7 m-7 c-7')}>{childrenWithProps}</div>
                        </div>
                        <div className={cx('matching')}>
                            {isShowRequest && (
                                <Modal background leftIcon={<UserGroup/>} title={'Request matching'} isShowing={isShowRequest} hide={handleToggleShowRequest}>
                                    <RequestFriend hide={handleToggleShowRequest} fromId={fromId && fromId} socket={socket} onlineUsers={onlineUsers} matchId={matchId && matchId}/>
                                </Modal>
                            )}

                            {isShowNotifMatching && (
                                <Modal background leftIcon={<UserGroup/>} title={'Notification'} isShowing={isShowNotifMatching} hide={handleToggleShowNotifMatching}>
                                    <ConfirmMatching hide={handleToggleShowNotifMatching} fromId={fromId && fromId} socket={socket} onlineUsers={onlineUsers} matchId={matchId && matchId}/>
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TwoSideBar.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TwoSideBar;
