import classNames from 'classnames/bind';
import styles from './SettingProfile.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SettingProfile() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');

    const handleOnChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeName = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeBio = (event) => {
        setBio(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeDate = (event) => {
        setDate(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeGender = (event) => {
        setGender(event.target.value);
        console.log(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>Edit profile</div>
                    <form className={cx('form-setting')} name="settingProfile" method="POST" action="">
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label for="username">Username</label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className={cx('input-item')}
                                    placeholder="@yanni"
                                    onChange={(e) => handleOnChangeUsername(e)}
                                    value={username}
                                />
                                <div className={cx('desc-item')}>www.website.com/@yanni</div>
                                <div className={cx('desc-item')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label for="name">Name</label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={cx('input-item')}
                                    placeholder="Yen Nhi"
                                    onChange={(e) => handleOnChangeName(e)}
                                    value={name}
                                />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label for="bio">Bio</label>
                            </div>
                            <div className={cx('body-item')}>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    className={cx('textarea-item')}
                                    placeholder="All love for Beomgyu"
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => handleOnChangeBio(e)}
                                    value={bio}
                                />
                                <div className={cx('desc-item')}>allow 50 characters</div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label for="birthday">Date of birth</label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    className={cx('input-item')}
                                    onChange={(e) => handleOnChangeDate(e)}
                                    value={date}
                                />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label for="gender">Gender</label>
                            </div>
                            <div className={cx('body-item')}>
                                <select id="gender" onChange={(e) => handleOnChangeGender(e)} value={gender}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>

                        <div className={cx('submit-contaniner')}>
                            <button type="submit" className={cx('submit-btn')}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SettingProfile;
