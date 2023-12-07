import classNames from 'classnames/bind';
import styles from './RequestFriend.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Heart, HeartCrack } from '~/components/Icon/Icon';
import { useEffect, useRef, useState } from 'react';
import { handleGetInfoByID, handlePostMessage, handleSetDenyNotificationMatching } from '~/services/userService';
import { handleCreateConversation } from '~/services/conversationService';
import { mydate } from '~/utils/date';

const cx = classNames.bind(styles);

function RequestFriend({
    idNotificationMatching,
    deny,
    timeCreated,
    timeData,
    hide,
    fromId,
    socket,
    onlineUsers,
    matchId,
}) {
    console.log('time data:');
    console.log(timeData);
    const [user, setUser] = useState();
    // const [minute, setMinute] = useState(timeData.minutes);
    // const [second, setSecond] = useState(timeData.seconds);
    const [remainingMinutes, setRemainingMinutes] = useState(timeData.minutes);
    const [remainingSeconds, setRemainingSeconds] = useState(timeData.seconds);
    const [isDeny, setDeny] = useState();
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
        };
        fetchApi();
    }, []);

    useEffect(() => {
        // if(deny) {
        //     setDeny(true)
        // }
        //  else {
        //     if(isNotif) {
        //         const timeLeft = formatTimeMatching(timeCreated);
        //         if(timeLeft.errCode == 0) {
        //             setMinute(timeLeft.minutes)
        //             setSecond(timeLeft.seconds)
        //         }
        //     } else {
        //         console.log('heluuuuuuuuu');
        //         setMinute(5)
        //         setSecond(0)
        //     }
        // }
    }, []);

    // useEffect(() => {
    //     console.log('timeeeeeeeeeeeee');
    //     console.log('minute time: ', minute);
    //     console.log('second time: ', second);
    //     if(minute !== 0 || second !== 0) {

    //         const timerSecond = setInterval(() => {
    //             console.log('minute: ', minute);
    //             console.log('second: ', second);
    //             if(second !== 0) {
    //                 setSecond(prev => prev - 1);
    //             } else if(second === 0 && minute > 0) {
    //                 setSecond(59);
    //                 setMinute(prev => prev - 1);
    //             }
    //         }, 1000);
    //         timeRef.current = timerSecond;

    //     }
    //     return () => clearInterval(timeRef.current);
    // }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (remainingSeconds > 0) {
                setRemainingSeconds(remainingSeconds - 1);
            } else if (remainingMinutes > 0) {
                setRemainingMinutes(remainingMinutes - 1);
                setRemainingSeconds(59);
            } else {
                clearInterval(timer); // Dừng đếm ngược khi hết thời gian
            }
        }, 1000);

        return () => clearInterval(timer); // Hủy interval khi component unmount
    }, [remainingMinutes, remainingSeconds]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         if (second === 0) {
    //           if (minute === 0) {
    //             // Hết thời gian
    //             clearInterval(timer);
    //           } else {
    //             // Giảm số phút và đặt lại giây
    //             setMinute(minute - 1);
    //             setSecond(59);
    //           }
    //         } else {
    //           // Giảm số giây
    //           setSecond(second - 1);
    //         }
    //     }, 1000);

    //     // Xử lý khi component unmount
    //     return () => clearInterval(timer);
    //   }, [minute, second]);

    // useEffect(() => {
    //     if(second === 0 && minute === 0 && timeRef.current) {
    //         clearInterval(timeRef.current);
    //     }
    // }, [second, minute])

    const handleAddConversation = async () => {
        try {
            console.log(fromId, matchId);
            const data = await handleCreateConversation(fromId, matchId);
            console.log(data);
            if (data.errCode == 0 && data.errMessage == 'OK') {
                console.log('add conversation success');
                // const currentDate = new Date();
                // const year = currentDate.getFullYear();
                // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                // const day = currentDate.getDate().toString().padStart(2, '0');
                // const hours = currentDate.getHours().toString().padStart(2, '0');
                // const minutes = currentDate.getMinutes().toString().padStart(2, '0');
                // const seconds = currentDate.getSeconds().toString().padStart(2, '0');
                // const timeSend = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                // await handlePostMessage(1, "Hello!", timeSend, data.idConversation);
                const currentDate = new Date();
                const timeSend = mydate(currentDate);
                const text = 'Bạn đã bắt đầu cuộc trò chuyện này!';
                await handlePostMessage(1, text, timeSend, data.idConversation, text);
                socket.emit('accept-request-matching', {
                    idConversation: data.idConversation,
                    fromId: fromId,
                    matchId: matchId,
                });
                hide();
            } else {
                console.log(data.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDenyMatching = async () => {
        try {
            console.log('idDenyMatching: ', idNotificationMatching);
            const checkDeny = await handleSetDenyNotificationMatching(idNotificationMatching);
            if (checkDeny.errCode == 0) {
                socket.emit('deny-matching', {
                    fromId: fromId,
                    matchId: matchId,
                });
                hide();
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                {/* <div className={cx('message-noti')}>{(minute !== 0 && second !== 0) ? `Thời gian hiệu lực: ${minute}:${second} s` : 'Đã hết thời gian hiệu lực'}</div> */}
                <div className={cx('message-noti')}>
                    {isDeny === 1
                        ? 'Bạn đã từ chối yêu cầu matching'
                        : remainingMinutes !== 0 || remainingSeconds !== 0
                        ? `Thời gian hiệu lực: ${remainingMinutes}:${String(remainingSeconds).padStart(2, '0')} s`
                        : 'Đã hết thời gian hiệu lực'}
                </div>
            </div>
            <div className={cx('bio-user')}>
                Bio: <span className={cx('bio-content')}>{user && user.bio}</span>
            </div>
            <div className={cx('footer')}>
                <Button medium leftIcon={<Heart />} className={cx('btn-accept', 'btn')} onClick={handleAddConversation}>
                    Accept
                </Button>
                <Button
                    onClick={handleDenyMatching}
                    medium
                    leftIcon={<HeartCrack />}
                    noMargin
                    className={cx('btn-deny', 'btn')}
                >
                    Deny
                </Button>
            </div>
        </div>
    );
}

export default RequestFriend;
