import classNames from 'classnames/bind';
import styles from './RequestFriend.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Heart, HeartCrack } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function RequestFriend() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-content')}>
                <div className={cx('info-user')}>
                    <img src={images.cancer} alt="" />
                    <div className={cx('info-detail')}>
                        <span className={cx('fullname')}>Yến Nhi</span>
                        <span className={cx('nickname')}>@yanni</span>
                    </div>
                </div>
                <div className={cx('message-noti')}>Thời gian hiệu lực 00:40s</div>
            </div>
            <div className={cx('bio-user')}>
                Bio:{' '}
                <span className={cx('bio-content')}>
                    Tôi là một cô nàng cự giải cute hột me, nếu bạn thích hãy kết nối với toi kakakakakka
                </span>
            </div>
            <div className={cx('footer')}>
                <Button medium leftIcon={<Heart />} className={cx('btn-accept')}>
                    Accept
                </Button>
                <Button medium leftIcon={<HeartCrack />} noMargin className={cx('btn-deny')}>
                    Deny
                </Button>
            </div>
        </div>
    );
}

export default RequestFriend;
