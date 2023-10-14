import classNames from 'classnames/bind';
import styles from './ProfileBrief.module.scss';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProfileBrief({ toggle }) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Edit profile</div>
            <form className={cx('form-setting')} name="settingProfile" method="POST" action="">
                <div className={cx('form-item')}>
                    <div className={cx('name-item')}>
                        <label for="avatar">Profile photo</label>
                    </div>
                    <div className={cx('avatar-container')}>
                        <img name="avatar" id="avatar" className={cx('avatar-item')} src={images.cancer} alt="error" />
                    </div>
                </div>
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
                            value={username}
                            onChange={(e) => handleOnChangeUsername(e)}
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
                            value={name}
                            onChange={(e) => handleOnChangeName(e)}
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
                            value={bio}
                            onChange={(e) => handleOnChangeBio(e)}
                        />
                        <div className={cx('desc-item')}>allow 50 characters</div>
                    </div>
                </div>

                <div className={cx('submit-contaniner')}>
                    <button onClick={toggle} type="button" className={cx('cancel-btn')}>
                        Cancel
                    </button>
                    <button type="submit" className={cx('submit-btn')}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileBrief;
