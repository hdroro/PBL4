import classNames from 'classnames/bind';
import styles from './NotiZodiac.module.scss';
import Tippy from '@tippyjs/react';
import { NotifIcon } from '~/components/Icon/Icon';
import NotiZodiacItem from '../NotiZodiacItem/NotiZodiacItem';
import { PopperWrapper } from '..';
import { useEffect, useState } from 'react';
import { handleGetListNotiZodiacMessage } from '~/services/zodiac_messageService';

const cx = classNames.bind(styles);

function NotiZodiac({ user, socket }) {
    const [listNotiZodiac, setListNotiZodiac] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resListNoti = await handleGetListNotiZodiacMessage(user.idUser);
                console.log('resListNoti', resListNoti);
                setListNotiZodiac(resListNoti.listMessage);
            } catch (e) {
                console.log('error message', e.response);
            }
        };
        fetchApi();
    }, [user]);

    const renderPreview = () => {
        return (
            <>
                {listNotiZodiac.length !== 0 && (
                    <PopperWrapper>
                        <NotiZodiacItem listNotiZodiac={listNotiZodiac} user={user.fullName} />
                    </PopperWrapper>
                )}
            </>
        );
    };
    return (
        <div className={cx('icon-header')}>
            {listNotiZodiac.filter((item) => item.isRead === 0).length !== 0 && (
                <span className={cx('count-circle')}>{listNotiZodiac.filter((item) => item.isRead === 0).length}</span>
            )}
            <Tippy offset={[10, 9]} interactive placement="bottom" content={renderPreview()}>
                <div>
                    <NotifIcon />
                </div>
            </Tippy>
        </div>
    );
}

export default NotiZodiac;
