import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Button from '~/components/Button';
import { Eye, Facebook, Gmail, NotEye } from '~/components/Icon/Icon';
import { useReducer, useState } from 'react';
import Login from '../Login';
import reducer from './reducer';
import { initialState } from './reducer';

const cx = classNames.bind(styles);

function SignUp() {
    const [isShowLogin, setIsShowLogin] = useState(false);

    function toggleLogin() {
        setIsShowLogin(!isShowLogin);
    }

    const [isTogglePassword, setTogglePassword] = useState(false);

    function handleTogglePassword() {
        setTogglePassword(!isTogglePassword);
    }

    const [isTogglePasswordRepeat, setTogglePasswordRepeat] = useState(false);

    function handleTogglePasswordRepear() {
        setTogglePasswordRepeat(!isTogglePasswordRepeat);
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    // Các hàm xử lý sự kiện
    const handleOnChangeUsername = (event) => {
        dispatch({ type: 'SET_USERNAME', payload: event.target.value });
    };

    const handleOnChangePassword = (event) => {
        dispatch({ type: 'SET_PASSWORD', payload: event.target.value });
    };

    const handleOnChangeRepeatPassword = (event) => {
        dispatch({ type: 'SET_REPEAT_PASSWORD', payload: event.target.value });
    };

    const handleOnChangeFullName = (event) => {
        dispatch({ type: 'SET_FULL_NAME', payload: event.target.value });
    };

    const handleOnChangeDate = (event) => {
        dispatch({ type: 'SET_DATE', payload: event.target.value });
    };

    const handleOnChangeGender = (event) => {
        dispatch({ type: 'SET_GENDER', payload: event.target.value });
    };

    return (
        <div>
            {isShowLogin ? (
                <Login />
            ) : (
                <div className={cx('wrapper-form')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('header-title')}>Sign Up</h2>
                    </div>
                    <div className={cx('sigup-container')}>
                        <div className={cx('left-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Username or gmail</span>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        name="text"
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangeUsername(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Password</span>
                                <div className={cx('input')}>
                                    <input
                                        type={isTogglePassword ? 'text' : 'password'}
                                        name="password"
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangePassword(event)}
                                    />
                                    {isTogglePassword ? (
                                        <Eye className={cx('eye')} onClick={() => handleTogglePassword()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleTogglePassword()} />
                                    )}
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Repeat Password</span>
                                <div className={cx('input')}>
                                    <input
                                        type={isTogglePasswordRepeat ? 'text' : 'password'}
                                        name="reapeatpassword"
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangeRepeatPassword(event)}
                                    />
                                    {isTogglePasswordRepeat ? (
                                        <Eye className={cx('eye')} onClick={() => handleTogglePasswordRepear()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleTogglePasswordRepear()} />
                                    )}{' '}
                                </div>
                            </div>
                        </div>

                        <div className={cx('right-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Fullname</span>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangeFullName(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Date of birth</span>
                                <div className={cx('input')}>
                                    <input
                                        type="date"
                                        name="date"
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangeDate(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Gender</span>
                                <div className={cx('input')}>
                                    <select
                                        className={cx('selection-options')}
                                        value={dispatch.payload}
                                        onChange={(event) => handleOnChangeGender(event)}
                                    >
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
                </div>
            )}
        </div>
    );
}

export default SignUp;
