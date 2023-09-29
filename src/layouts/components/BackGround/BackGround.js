import classNames from 'classnames/bind';
import styles from './BackGround.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function BackGround({ isMatching }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('full-screen-image')} src={images.bgImg} alt="" />
            <div className={cx('top-content')}>
                <img className={cx('top-image')} src={images.globe} alt="" />
                <div className={cx('matching')}>
                    {isMatching && (
                        <Button primary className={cx('btnMatching')}>
                            Matching
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BackGround;
