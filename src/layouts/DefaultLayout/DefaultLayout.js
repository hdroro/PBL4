import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import React from 'react';

import styles from './DefaultLayout.module.scss';
import { handleGetInfo } from '~/services/userService';
import PropTypes from 'prop-types';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import Modal from '~/components/Modal/Modal';
import { UserGroup } from '~/components/Icon/Icon';
import Message from '~/pages/Message';
import ConfirmMatching from '~/components/Modal/ModalConfirm/ConfirmMatching';

const cx = classNames.bind(styles);

function DefaultLayout({ children, socket }) {
    const [user, setUser] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isShowRequest, setShowRequest] = useState(false);
    const [fromId, setFromId] = useState();
    const [matchId, setMatchId] = useState();
    // const [isCreateConversation, setCreateConversation] = useState(false);
    const [isShowNotifMatching, setShowNotifMatching] = useState(false);
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await handleGetInfo();
                setUser(response.userData.user[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

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

    console.log('OnlineUser', onlineUsers);

    const handleToggleShowRequest = () => {
        setShowRequest(!isShowRequest);
    }

    const handleToggleShowNotifMatching = () => {
        setShowNotifMatching(!isShowNotifMatching);
    }

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
                    <div className={cx('content')}> {childrenWithProps}</div>
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
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
