import classNames from 'classnames/bind';
import styles from './AdjustPost.module.scss';
import Button from '~/components/Button';
import { BookPost, Edit, Remove } from '~/components/Icon/Icon';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import EditPost from '~/components/Modal/ModalConfirm/EditPost';
import { useState } from 'react';
import Block from '~/components/Modal/ModalConfirm/Block/Block';

const cx = classNames.bind(styles);

function AdjustPost({ idPost, infoUser, reloadProfile }) {
    const { isShowing, toggle } = useModal();
    const [isShowingClearPost, setIsShowingClearPost] = useState(false);
    console.log('idPost hahaha ', idPost);

    const handleChangeStatusEditPost = async (value) => {
        toggle(value);
        reloadProfile();
    };

    const handleToggleClear = () => {
        setIsShowingClearPost(!isShowingClearPost);
    };
    const handleDeletPostChange = (value) => {
        setIsShowingClearPost(value);
        reloadProfile();
    };
    return (
        <div className={cx('wrapper')}>
            <Modal title="Edit post" leftIcon={<BookPost />} texttype background isShowing={isShowing} hide={toggle}>
                <EditPost onChangeStatusEditPost={handleChangeStatusEditPost} infoUser={infoUser} idPost={idPost} />
            </Modal>
            <Button post leftIcon={<Edit />} onClick={toggle}>
                Edit post
            </Button>
            <Button post leftIcon={<Remove />} onClick={handleToggleClear}>
                Delete post
            </Button>

            <Modal title="Delete Post" texttype background isShowing={isShowingClearPost} hide={handleToggleClear}>
                <Block
                    hide={handleToggleClear}
                    isDeletePost={true}
                    idPost={idPost}
                    idAccPost={infoUser.idUser}
                    onDeletePost={handleDeletPostChange}
                >
                    Bạn có chắc chắn muốn xóa bài post này không ?
                </Block>
            </Modal>
        </div>
    );
}

export default AdjustPost;
