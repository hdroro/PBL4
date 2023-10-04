import classNames from 'classnames/bind';
import styles from './MatchingRandom.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Age, Female, FriendPlus, Zodiac } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function MatchingRandom() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('content')}>
                <img src={images.cancer} alt="" />
                <div className={cx('info')}>
                    <div>
                        <div className={cx('fullname')}>Hồng Diễm</div>
                        <div className={cx('nickname')}>@hd.roro</div>
                    </div>

                    <Button large normal leftIcon={<FriendPlus />} className={cx('btn-request')}>
                        Request
                    </Button>
                </div>
                <div className={cx('detail-info')}>
                    <div className={cx('zodiac')}>
                        <Zodiac /> Leo
                    </div>
                    <div className={cx('gender')}>
                        <Female /> Female
                    </div>
                    <div className={cx('age')}>
                        <Age /> 20
                    </div>
                </div>
                <div className={cx('bio')}>
                    Bio:{' '}
                    <span className={cx('bio-content')}>
                        Tôi là một cô nàng cự giải cute hột me, nếu bạn thích hãy kết nối với toi kakakakakka
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MatchingRandom;
