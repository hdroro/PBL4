import classNames from 'classnames/bind';
import styles from './BackGround.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/Modal';
import Login from '~/components/Modal/Login';
import { Fragment, useState } from 'react';
import MatchingRandom from '~/components/Modal/ModalConfirm/MatchingRandom';
import { handleCheckFriendRelation } from '~/services/userService';

const cx = classNames.bind(styles);

function BackGround({ isMatching, isShowing, toggle, socket, onlineUsers, user }) {
    const [isShowingMatching, setIsShowingMatching] = useState(false);
    const [matchId, setMatchId] = useState();
    console.log(onlineUsers);
    const handleMatching = async () => {
        // console.log(user);
        // console.log('onlineuser length: ', onlineUsers.length);
        let randomIndex;
        // console.log('random:', randomIndex);
        // console.log('id:', user.idUser);
        // console.log('matching: ', onlineUsers[randomIndex].userID);

        if(onlineUsers.length < 2) return;
        let check;
        // while() {
            
        // }
        try {
            do {
                randomIndex = Math.floor(Math.random() * onlineUsers.length);
                if(onlineUsers[randomIndex].userID === user.idUser) continue;
                const relation = await handleCheckFriendRelation(onlineUsers[randomIndex].userID, user.idUser)
                if(relation.errCode === 0) check = true;
                else if(relation.errCode === 1) check = false;
                else {
                    console.log(relation.errMessage);
                }
                console.log(relation);
            } while(onlineUsers[randomIndex].userID === user.idUser || check)
        }
        catch(err) {
            console.log(err);
        }
        const matchUser = onlineUsers[randomIndex];
        console.log(matchUser);
        setIsShowingMatching(!isShowingMatching);
        setMatchId(matchUser.userID);
        
    };
    const handleToggleMatching = () => {
        setIsShowingMatching(!isShowingMatching);
    }
    return (
        <div className={cx('wrapper')}>
            <img className={cx('full-screen-image')} src={images.bgImg} alt="" />
            <img className={cx('top-image')} src={images.globe} alt="" onClick={toggle} />
            <Modal isShowing={isShowing} hide={toggle}>
                <Login isShowing={isShowing} hide={toggle} />
            </Modal>
            <div className={cx('matching')}>
                {isMatching && (
                    <Fragment>
                        <Button primary small className={cx('btnMatching')} onClick={handleMatching}>
                            Matching
                        </Button>
                        <Modal background isShowing={isShowingMatching} hide={handleToggleMatching}>
                            <MatchingRandom hide={handleToggleMatching} matchId={matchId} socket={socket} onlineUsers={onlineUsers} fromId={user.idUser}/>
                        </Modal>
                    </Fragment>
                )}
                
            </div>
        </div>
    );
}

export default BackGround;
