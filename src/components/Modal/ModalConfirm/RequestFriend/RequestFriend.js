import classNames from 'classnames/bind';
import styles from './RequestFriend.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Heart, HeartCrack } from '~/components/Icon/Icon';
import { useEffect, useRef, useState } from 'react';
import { handleAddFriendRelation, handleGetInfoByID, handlePostMessage } from '~/services/userService';
import { handleCreateConversation } from '~/services/conversationService';

const cx = classNames.bind(styles);

function RequestFriend({ hide, fromId, socket, onlineUsers, matchId }) {
    const [user, setUser] = useState();
    const [time, setTime] = useState(60);
    const timeRef = useRef(null);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await handleGetInfoByID(fromId);
                console.log('match randommmmmmmm');
                // data = data.userData;
                
                if (data && data.userData.errCode === 0) {
                    console.log('Get info user successfully');
                    const temp = String(data.userData.user.birth);
                    const tempDate = new Date(temp);
                    const year = tempDate.getFullYear();
                    data.userData.user.age = new Date().getFullYear() - year;
                    setUser(data.userData.user);
                } else {
                    console.log('data.message ' + data.errMessage);
                }
            } catch (e) {
                console.log('error message', e.response);
            }
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
        timeRef.current = timer;
        return () => clearInterval(timeRef.current);
    }, [])

    useEffect(() => {
        if(time === 0) {
            clearInterval(timeRef.current);
        }
    }, [time])

    const handleAddConversation = async () => {
        try {
            console.log(fromId, matchId);
            const data = await handleCreateConversation(fromId, matchId);
            console.log(data);
            if(data.errCode == 0 && data.errMessage == "OK") {
                console.log('add conversation success');
                const dataFriend = await handleAddFriendRelation(fromId, matchId);
                if(dataFriend.errCode == 0) {
                    console.log('add friend success');
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const hours = currentDate.getHours().toString().padStart(2, '0');
                    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
                    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
                    const timeSend = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    await handlePostMessage(1, "Hello!", timeSend, data.idConversation);
                    socket.emit("accept-request-matching", {
                        idConversation: data.idConversation,
                        fromId: fromId,
                        matchId: matchId,
                    });
                    hide()

                } else {
                    console.log(dataFriend.errMessage);
                }
            } else {
                console.log(data.errMessage);
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-content')}>
                <div className={cx('info-user')}>
                    <img src={user && images[user.avatar]} alt="" />
                    <div className={cx('info-detail')}>
                        <span className={cx('fullname')}>{user && user.fullName}</span>
                        <span className={cx('nickname')}>@{user && user.userName}</span>
                    </div>
                </div>
                <div className={cx('message-noti')}>{time ? `Thời gian hiệu lực: ${time} s` : 'Đã hết thời gian hiệu lực'}</div>
            </div>
            <div className={cx('bio-user')}>
                Bio:{' '}
                <span className={cx('bio-content')}>
                    {user && user.bio}
                </span>
            </div>
            <div className={cx('footer')}>
                <Button medium leftIcon={<Heart />} className={cx('btn-accept', 'btn')} onClick={handleAddConversation}>
                    Accept
                </Button>
                <Button onClick={hide} medium leftIcon={<HeartCrack />} noMargin className={cx('btn-deny', 'btn')}>
                    Deny
                </Button>
            </div>
        </div>
    );
}

export default RequestFriend;
