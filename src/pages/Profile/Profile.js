import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { BookPost, Edit, ThreeDots } from '~/components/Icon/Icon';
import { PopperWrapper } from '~/components/Popper';
import Wrapper from '~/components/Wrapper';
import Tippy from '@tippyjs/react';
import AdjustPost from '~/components/Popper/AdjustPost/AdjustPost';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import CreatePost from '~/components/Modal/ModalConfirm/CreatePost';
import { useState } from 'react';
import ProfileBrief from '~/components/Modal/ModalConfirm/ProfileBrief';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const renderPreview = () => {
        return (
            <PopperWrapper>
                <AdjustPost />
            </PopperWrapper>
        );
    };
    const { isShowing, toggle } = useModal();
    const [isShowingProfile, setShowingProfile] = useState(false);
    const toggleProfile = () => {
        setShowingProfile(!isShowingProfile);
    };

    const { nickname } = useParams();

    console.log(nickname);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <img className={cx('full-screen-image')} src={images.bg_profile} alt="" />
                            <div className={cx('user-info')}>
                                <div className={cx('info')}>
                                    <img className={cx('avatar')} src={images.cancer} alt="" />
                                    <div className={cx('info-user')}>
                                        <div className={cx('fullname')}>Yến Nhi</div>
                                        <div className={cx('nickname')}>{nickname}</div>
                                        <Button
                                            onClick={toggleProfile}
                                            normal
                                            className={cx('btn-edit')}
                                            leftIcon={<Edit />}
                                        >
                                            Edit Profile
                                        </Button>
                                        <Modal isShowing={isShowingProfile} hide={toggleProfile}>
                                            <ProfileBrief toggle={toggleProfile} />
                                        </Modal>
                                    </div>
                                </div>
                                <div className={cx('bio')}>
                                    <span className={cx('title')}>Bio: </span>
                                    <span className={cx('content')}>
                                        Tôi là một cô nàng cự giải cute hột me, nếu bạn thích hãy kết nối với toi
                                        kakakakakka
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('blog-container')}>
                            <div className={cx('header-blog')}>
                                <img src={images.cancer} alt="" />
                                <input
                                    className={cx('thinking')}
                                    placeholder="Yến Nhi ơi, bạn đang nghĩ gì ?"
                                    onClick={toggle}
                                />
                            </div>
                            <Modal
                                title="Create new post"
                                leftIcon={<BookPost />}
                                texttype
                                background
                                isShowing={isShowing}
                                hide={toggle}
                            >
                                <CreatePost />
                            </Modal>

                            <div className={cx('post-container')}>
                                <Wrapper>
                                    <div className={cx('post-top')}>
                                        <div className={cx('info-post')}>
                                            <img className={cx('avatar-post')} src={images.cancer} alt="" />
                                            <div className={cx('post')}>
                                                <div className={cx('name')}>Yến Nhi</div>
                                                <div className={cx('time-post')}>September 14, 2023 at 10:20</div>
                                            </div>
                                        </div>

                                        <Tippy
                                            offset={[100, -30]} // Đặt offset trong một mảng
                                            interactive
                                            delay={[0, 100]} // Đặt delay trong một mảng
                                            placement="bottom"
                                            content={renderPreview()} // Sử dụng content thay vì render
                                        >
                                            <div>
                                                <ThreeDots className={cx('icon-dots')} />
                                            </div>
                                        </Tippy>
                                    </div>

                                    <div className={cx('post-content')}>
                                        “Wow wow chúc mừng sinh nhật anh cả của chúng ta Hôm nay và ngày mai hãy tận
                                        hưởng thật vui vẻ nhé iu anh nhiều ạ Woa woa otp tui nè mọi người ơi, kakakakak.
                                        Chúc mừng mà đăng ảnh như boyfriend dzị ó. Otp mãi keooooo Anw Yeonjun chúc mừng
                                        sinh nhật zui zẻ nhaaaa, mãi iuuu.
                                    </div>
                                </Wrapper>

                                <Wrapper>
                                    <div className={cx('post-top')}>
                                        <div className={cx('info-post')}>
                                            <img className={cx('avatar-post')} src={images.cancer} alt="" />
                                            <div className={cx('post')}>
                                                <div className={cx('name')}>Yến Nhi</div>
                                                <div className={cx('time-post')}>September 14, 2023 at 10:20</div>
                                            </div>
                                        </div>

                                        <Tippy
                                            offset={[100, -30]} // Đặt offset trong một mảng
                                            interactive
                                            delay={[0, 100]} // Đặt delay trong một mảng
                                            placement="bottom"
                                            content={renderPreview()} // Sử dụng content thay vì render
                                        >
                                            <div>
                                                <ThreeDots className={cx('icon-dots')} />
                                            </div>
                                        </Tippy>
                                    </div>

                                    <div className={cx('post-content')}>
                                        “Wow wow chúc mừng sinh nhật anh cả của chúng ta Hôm nay và ngày mai hãy tận
                                        hưởng thật vui vẻ nhé iu anh nhiều ạ Woa woa otp tui nè mọi người ơi, kakakakak.
                                        Chúc mừng mà đăng ảnh như boyfriend dzị ó. Otp mãi keooooo Anw Yeonjun chúc mừng
                                        sinh nhật zui zẻ nhaaaa, mãi iuuu.
                                    </div>
                                </Wrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
