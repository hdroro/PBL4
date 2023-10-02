import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CreatePost() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images.cancer} alt="cancer" />
                <div className={cx('info-user')}>
                    <div className={cx('fullname')}>Yến Nhi</div>
                    <div className={cx('nickname')}> @yanni</div>
                </div>
            </div>
            <div className={cx('content')}>
                <textarea placeholder="Yến Nhi ơi, bạn đang nghĩ gì ?" />
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
