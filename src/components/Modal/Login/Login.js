import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { Eye, Facebook, Gmail } from '~/components/Icon/Icon';
import SignUp from '../SignUp';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login({ isShowing, toggle }) {
    const [isShowingSignUp, setIsShowingSignUp] = useState(false);

    function toggleSignUp() {
        setIsShowingSignUp(!isShowingSignUp);
    }

    return (
        <div>
            {isShowingSignUp ? (
                // <Modal title={'Sign up'} isShowing={isShowing} hide={toggleSignUp}>
                <SignUp />
            ) : (
                // </Modal>
                // Render the login form
                <form method="post" action="/login">
                    <div className={cx('modal-header')}>
                        <h2 className={cx('header-title')}>Login</h2>
                    </div>
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
                    <span className={cx('forgot-password')}>Forgot password?</span>
                    <div className={cx('footer')}>
                        <Button home small normal>
                            OK
                        </Button>

                        <div className={cx('another-way')}>
                            <span className={cx('title')}>or log in</span>
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
                            Don’t have an account ?
                            <span className={cx('signup-request')} onClick={toggleSignUp}>
                                Sign Up
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
