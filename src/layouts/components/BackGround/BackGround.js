import classNames from 'classnames/bind';
import styles from './BackGround.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/Modal';
import Login from '~/components/Modal/Login';

const cx = classNames.bind(styles);

function BackGround({ isMatching, isShowing, toggle }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('full-screen-image')} src={images.bgImg} alt="" />
            <img className={cx('top-image')} src={images.globe} alt="" onClick={toggle} />
            <Modal title={'Login'} isShowing={isShowing} hide={toggle}>
                <Login isShowing={isShowing} hide={toggle} />
            </Modal>
            <div className={cx('matching')}>
                {isMatching && (
                    <Button primary small className={cx('btnMatching')}>
                        Matching
                    </Button>
                )}
            </div>
        </div>
    );
}

export default BackGround;
