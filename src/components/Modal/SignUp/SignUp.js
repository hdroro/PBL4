import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Button from '~/components/Button';
import { Eye, Facebook, Gmail } from '~/components/Icon/Icon';
import { useState } from 'react';
import Login from '../Login';

const cx = classNames.bind(styles);

function SignUp() {
    const [isShowLogin, setIsShowLogin] = useState(false);

    function toggleLogin() {
        setIsShowLogin(!isShowLogin);
    }
    return (
        <div>
            {isShowLogin ? (
                <Login />
            ) : (
                <form method="post" action="/signup">
                    <div className={cx('modal-header')}>
                        <h2 className={cx('header-title')}>Sign Up</h2>
                    </div>
                    <div className={cx('sigup-container')}>
                        <div className={cx('left-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Username or gmail</span>
                                <div className={cx('input')}>
                                    <input type="text" name="text" />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Password</span>
                                <div className={cx('input')}>
                                    <input type="password" name="password" />
                                    <Eye className={cx('eye')} />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Repeat Password</span>
                                <div className={cx('input')}>
                                    <input type="password" name="repeatpassword" />
                                    <Eye className={cx('eye')} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('right-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Fullname</span>
                                <div className={cx('input')}>
                                    <input type="text" name="fullname" />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Date of birth</span>
                                <div className={cx('input')}>
                                    <input type="date" name="date" />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Gender</span>
                                <div className={cx('input')}>
                                    <select className={cx('selection-options')}>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <Button home small normal>
                            OK
                        </Button>

                        <div className={cx('another-way')}>
                            <span className={cx('title')}>or sign up</span>
                            <div className={cx('two-way')}>
                                <div className={cx('facebook')}>
                                    <Facebook />
                                </div>

                                <div className={cx('gmail')}>
                                    <Gmail />
                                </div>
                            </div>
                        </div>
                        <div className={cx('request')}>
                            Have an account ?
                            <span className={cx('signup-request')} onClick={toggleLogin}>
                                Log in
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default SignUp;
