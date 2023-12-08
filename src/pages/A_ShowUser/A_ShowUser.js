import classNames from 'classnames/bind';
import styles from './A_ShowUser.module.scss';
import { Eye, Trash } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function AdminShowUser() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <h2>Admin/User</h2>
                        </div>

                        <div className={cx('container')}>
                            <div className={cx('title-container')}>
                                <p className={cx('total-user-title')}>
                                    Tổng số user: <span>250</span>{' '}
                                </p>
                                <p className={cx('total-user-online')}>
                                    Số user đang online: <span>77</span>{' '}
                                </p>
                            </div>

                            <div className={cx('content-container')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Fullname</th>
                                            <th>Birthday</th>
                                            <th>Gender</th>
                                            <th>Online</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>yanni</td>
                                            <td>Yến Nhi</td>
                                            <td>17/07/2003</td>
                                            <td>Nữ</td>
                                            <td>
                                                <span className={cx('offline')}>Online</span>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Eye />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Trash />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>yanni</td>
                                            <td>Yến Nhi</td>
                                            <td>17/07/2003</td>
                                            <td>Nữ</td>
                                            <td>
                                                <span className={cx('offline')}>Online</span>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Eye />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Trash />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>yanni</td>
                                            <td>Yến Nhi</td>
                                            <td>17/07/2003</td>
                                            <td>Nữ</td>
                                            <td>
                                                <span className={cx('online')}>Online</span>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Eye />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Trash />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>yanni</td>
                                            <td>Yến Nhi</td>
                                            <td>17/07/2003</td>
                                            <td>Nữ</td>
                                            <td>
                                                <span className={cx('online')}>Online</span>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Eye />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('table-col-action')}>
                                                    <Trash />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className={cx('pagination')}>
                                    <span className={cx('previous-page', 'btn')}>Previous</span>
                                    <span className={cx('current-page', 'btn')}>1</span>
                                    <span className={cx('next-page', 'btn')}>Next</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminShowUser;
