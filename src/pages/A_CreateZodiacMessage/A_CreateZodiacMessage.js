import classNames from 'classnames/bind';
import styles from './A_CreateZodiacMessage.module.scss';
import { BackIcon, PlusIcon } from '~/components/Icon/Icon';
import ZodiacMessage from '~/components/Modal/ModalConfirm/ZodiacMessage';
import { useEffect, useState } from 'react';
import { handleGetListZodiac } from '~/services/zodiacService';
import { handleCreateZodiacMessage } from '~/services/zodiac_messageService';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import Modal from '~/components/Modal/Modal';
import ConfirmAdmin from '~/components/Modal/ModalConfirm/ConfirmAdmin';

const cx = classNames.bind(styles);

function A_CreateZodiacMessage({socket}) {
    const navigate = useNavigate();
    const [isShowing, setShowing] = useState(false);
    const [isShowingModal, setShowingModal] = useState(false);
    const [zodiacList, setZodiacList] = useState([])
    const [zodiacMessageList, setZodiacMessageList] = useState([]);
    useEffect(() => {
        const fetchApi = async() => {
            try {
                const zodiacData = await handleGetListZodiac();
                if(zodiacData.errCode === 0) {
                    setZodiacList(zodiacData.listZodiac);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchApi()
    }, [])

    useEffect(() => {
        let list = []
        zodiacList.map((item, index) => {
            list = [...list, {
                idZodiac: item.idZodiac,
                content: "Xin chao ngay moi!",
            }]
        })
        setZodiacMessageList(list);
    }, [zodiacList])

    const handleGetMessageList = (idZodiac, content) => {
        setZodiacMessageList(prev => {
            const res = prev.map((item, index) => {
                if(item.idZodiac == idZodiac) {
                    item.content = content;
                }
                return item;
            })
            return res;
        })
        setShowing(!isShowing);
    }

    const handleOnSubmit = () => {
        console.log(zodiacMessageList);
        zodiacMessageList.forEach(item => {
            const fetchApi = async() => {
                try {
                    const zodiacData = await handleCreateZodiacMessage(item.idZodiac, item.content);
                    if(zodiacData.errCode === 0) {
                        console.log(zodiacData);
                    }
                }
                catch(err) {
                    console.log(err);
                }
            }
            fetchApi();
        })
        socket.emit("create-zodiac-message", {});
        navigate(routes.adminShowMessage);
    }

    const handleToggleModal = () => {
        setShowingModal(!isShowingModal);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <div className={cx('back-icon')}><BackIcon/></div>
                                <Link to={routes.adminShowMessage}>
                                    <h2 className={(cx('title'))}>Back</h2>
                                </Link>
                            </div>

                            <Modal
                                title="Create zodiac message"
                                texttype
                                admin
                                isShowing={isShowingModal}
                                hide={handleToggleModal}
                            >
                                <ConfirmAdmin hide={handleToggleModal} handleOK={handleOnSubmit}>Bạn có chắc chắn tạo các thông điệp này không?</ConfirmAdmin>
                            </Modal>

                            <div className={cx('content-container')}>
                                <header className={cx('content-header')}>Create Zodiac Message</header>
                                <div className={cx('list-zodiac')}>
                                    {zodiacList.map((item, index) => <ZodiacMessage handleGetMessageList={handleGetMessageList} key={index} idZodiac={item.idZodiac} zodiacName={item.nameZodiac} content="Xin chao ngay moi!"/>)}
                                </div>
                                <div onClick={handleToggleModal} className={cx('container-btn')}>
                                    <div className={cx('btn-info')}>
                                        <PlusIcon/>
                                        <button type='button' className={cx('btn-submit')}>Create</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default A_CreateZodiacMessage;
