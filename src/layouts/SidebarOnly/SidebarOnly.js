import classNames from 'classnames/bind';
import styles from './SidebarOnly.module.scss';

import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { handleGetInfo } from '~/services/userService';

const cx = classNames.bind(styles);

function SidebarOnly({ children }) {
    const [user, setUser] = useState({});

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-3 m-3 c-3')}>
                                <Sidebar user={user} />
                            </div>
                            <div className={cx('col l-9 m-9 c-9')}>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SidebarOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarOnly;
