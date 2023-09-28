import classNames from 'classnames/bind';
import styles from './SidebarOnly.module.scss';

import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function SidebarOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-3 m-3 c-3')}>
                                <Sidebar />
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
