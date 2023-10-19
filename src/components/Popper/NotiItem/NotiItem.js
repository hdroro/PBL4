import classNames from 'classnames/bind';
import styles from './NotiItem.module.scss';
import images from '~/assets/images';
import Modal from '~/components/Modal/Modal';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import { UserGroup } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function NotiItem({ isShowing, toggle }) {
    return (
        <div className={cx('wrapper')}>
            <Modal
                title={'Request'}
                leftIcon={<UserGroup />}
                primary
                isShowing={isShowing}
                hide={toggle}
                background
                className={cx('background-request')}
            >
                <RequestFriend hide={toggle} />
            </Modal>
            <img src={images.cancer} alt="" />
            <div className={cx('noti-container')} onClick={toggle}>
                <div>
                    <span className={cx('nick-name')}>@xalozodiac</span>
                    <span className={cx('noti-content')}>muốn kết nối với bạn</span>
                    <div className={cx('time')}>12mins ago</div>
                </div>
            </div>
        </div>
    );
}

export default NotiItem;
