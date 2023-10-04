import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import { Mic, MicSlash, PhoneSlash, VolumeLow, ZoomOut } from '~/components/Icon/Icon';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Call() {
    const [isShowMic, setIsShowMic] = useState(true);
    const handleToggleMic = () => {
        setIsShowMic(!isShowMic);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('status-header')}>Calling ...</div>
                <ZoomOut className={cx('zoom-action')} />
            </div>
            <div className={cx('body')}>
                <img src={images.cancer} alt="" />
                <div className={cx('fullname')}>Hồng Diễm</div>
                <div className={cx('total-time')}>01:28:30</div>
            </div>
            <div className={cx('footer')}>
                <VolumeLow className={cx('icon')} />
                {isShowMic ? (
                    <Mic className={cx('icon')} onClick={handleToggleMic} />
                ) : (
                    <MicSlash className={cx('icon')} onClick={handleToggleMic} />
                )}
                <div className={cx('phone-call')}>
                    <PhoneSlash />
                </div>
            </div>
        </div>
    );
}

export default Call;
