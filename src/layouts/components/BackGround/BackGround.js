import classNames from 'classnames/bind';
import styles from './BackGround.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/Modal';
import Login from '~/components/Modal/Login';
import { useState } from 'react';
import MatchingRandom from '~/components/Modal/ModalConfirm/MatchingRandom';

const cx = classNames.bind(styles);

function BackGround({ isMatching, isShowing, toggle }) {
    const [isShowingMatching, setIsShowingMatching] = useState(false);
    const handleToggleMatching = () => {
        setIsShowingMatching(!isShowingMatching);
    };
    return (
        <div className={cx('wrapper')}>
            <img className={cx('full-screen-image')} src={images.bgImg} alt="" />
            <img className={cx('top-image')} src={images.globe} alt="" onClick={toggle} />
            <Modal isShowing={isShowing} hide={toggle}>
                <Login isShowing={isShowing} hide={toggle} />
            </Modal>
            <div className={cx('matching')}>
                {isMatching && (
                    <Button primary small className={cx('btnMatching')} onClick={handleToggleMatching}>
                        Matching
                    </Button>
                )}
                <Modal background isShowing={isShowingMatching} hide={handleToggleMatching}>
                    <MatchingRandom />
                </Modal>
            </div>
        </div>
    );
}

export default BackGround;
