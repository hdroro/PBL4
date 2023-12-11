import classNames from 'classnames/bind';
import styles from './NotiZodiacItem.module.scss';
import images from '~/assets/images';
import { formatTimeNotiZodiacMessage } from '~/utils/date';
import Modal from '~/components/Modal/Modal';
import ShowDetailZodiac from '~/components/Modal/ModalConfirm/ShowDetailZodiac';
import { useState } from 'react';

const cx = classNames.bind(styles);

function NotiZodiacItem({ listNotiZodiac, user }) {
    const [isShowing, setIsShowing] = useState(false);
    const [idPostShowing, setIdPostShowing] = useState('');
    const handleToggleModel = (notiId) => {
        setIsShowing(!isShowing);
        console.log(`Notification with ID ${notiId} clicked`);
        setIdPostShowing(notiId);
    };
    return (
        <>
            {listNotiZodiac.map((item) => (
                <div
                    className={cx('wrapper', item.isRead && 'asRead')}
                    key={item.id}
                    onClick={() => handleToggleModel(item.idNoti)}
                >
                    <img alt="" src={images.admin} />
                    <div className={cx('noti-container')}>
                        <div>
                            <span className={cx('nick-name')}>@xaloZodiac</span>
                            <span className={cx('noti-content')}>
                                đã có thông điệp tuần mới rồi nè <b>{user}</b> ơi!
                            </span>
                            <div className={cx('time')}>{formatTimeNotiZodiacMessage(item.timeSend)}</div>
                        </div>
                    </div>
                </div>
            ))}

            <Modal background hide={handleToggleModel} isShowing={isShowing}>
                <ShowDetailZodiac idPostShowing={idPostShowing} />
            </Modal>
        </>
    );
}

export default NotiZodiacItem;
