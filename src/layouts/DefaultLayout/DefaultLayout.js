import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import React from 'react';

import styles from './DefaultLayout.module.scss';
import { handleGetInfo } from '~/services/userService';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [user, setUser] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

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
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
        socket.emit('addNewUser', user.idUser);
        socket.on('getOnlineUsers', (response) => {
            setOnlineUsers(response);
        });
    }, [socket]);

    console.log('OnlineUser', onlineUsers);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { socket, onlineUsers, user });
        }
        return child;
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('content')}> {childrenWithProps}</div>
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
