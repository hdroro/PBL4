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
import { useEffect, useState } from 'react';
import ProfileBrief from '~/components/Modal/ModalConfirm/ProfileBrief';
import { useParams } from 'react-router-dom';
import { handleGetInfoByID } from '~/services/userService';
import { handleGetPost } from '~/services/postService';

const cx = classNames.bind(styles);

function Profile({ user }) {
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
    const [infoUser, setInfoUser] = useState({});
    const [listPost, setListPost] = useState([]);

    const { nickname } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await handleGetInfoByID(user.idUser);
                setInfoUser(response.userData.user);

                const response_post = await handleGetPost(user.idUser);
                console.log(response_post.postData.posts);
                setListPost(response_post.postData.posts);
            } catch (error) {
                console.error('Error fetching user information: ' + error);
            }
        };

        fetchData();
    }, [user.idUser]);

    function formatISODateToCustomFormat(isoDateString) {
        const date = new Date(isoDateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };

        return date.toLocaleString('en-US', options);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <img className={cx('full-screen-image')} src={images.bg_profile} alt="" />
                            <div className={cx('user-info')}>
                                <div className={cx('info')}>
                                    <img className={cx('avatar')} src={images[infoUser.avatar]} alt="" />
                                    <div className={cx('info-user')}>
                                        <div className={cx('fullname')}>{infoUser.fullName}</div>
                                        <div className={cx('nickname')}>@{infoUser.userName}</div>
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
                                    <span className={cx('content')}>{infoUser.bio}</span>
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
                                {listPost?.map((item, index) => (
                                    <Wrapper key={index}>
                                        <div className={cx('post-top')}>
                                            <div className={cx('info-post')}>
                                                <img
                                                    className={cx('avatar-post')}
                                                    src={images[infoUser.avatar]}
                                                    alt=""
                                                />
                                                <div className={cx('post')}>
                                                    <div className={cx('name')}>{infoUser.fullName}</div>
                                                    <div className={cx('time-post')}>
                                                        {formatISODateToCustomFormat(item.timePost)}
                                                    </div>
                                                </div>
                                            </div>

                                            <Tippy
                                                offset={[100, -30]}
                                                interactive
                                                delay={[0, 100]}
                                                placement="bottom"
                                                content={renderPreview()}
                                            >
                                                <div>
                                                    <ThreeDots className={cx('icon-dots')} />
                                                </div>
                                            </Tippy>
                                        </div>

                                        <div className={cx('post-content')}>{item.content}</div>
                                    </Wrapper>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
