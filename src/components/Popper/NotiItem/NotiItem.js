import classNames from 'classnames/bind';
import styles from './NotiItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function NotiItem() {
    return (
        <div className={cx('wrapper')}>
            <img src={images.cancer} alt="" />
            <div className={cx('noti-container')}>
                <div>
                    <span className={cx('nick-name')}>@xalozodiac</span>
                    <span className={cx('noti-content')}>đã có thông điệp tuần mới rồi nè Yến Nhi oiii....</span>
                    <div className={cx('time')}>12mins ago</div>
                </div>
            </div>
        </div>
    );
}

export default NotiItem;
