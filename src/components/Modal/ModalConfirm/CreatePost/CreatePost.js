import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CreatePost({ infoUser }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images[infoUser.avatar]} alt="cancer" />
                <div className={cx('info-user')}>
                    <div className={cx('fullname')}>{infoUser.fullName}</div>
                    <div className={cx('nickname')}> @{infoUser.userName}</div>
                </div>
            </div>
            <div className={cx('content')}>
                <textarea placeholder={`${infoUser.fullName} ơi, bạn đang nghĩ gì ?`} />
            </div>
            <div className={cx('footer')}>
                <Button normal className={cx('btn-post')}>
                    Post
                </Button>
            </div>
        </div>
    );
}

export default CreatePost;
