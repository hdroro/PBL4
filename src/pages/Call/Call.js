// import React, { useEffect, useRef, useState } from 'react';
// import AVRC from '~/avrc/avrc'; // Replace with the actual library import
// import Button from '~/components/Button';
// import Lottie from 'lottie-react';
// import CallAnimation from '../../utils/animation/call_animation.json';
// import callsound from '../../utils/phonesound.mp3';
// import callImage from '../../utils/phone-call.png';

// function Call({ socket }) {
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const [avrc, setAVRC] = useState(null);
//     const [ringing, setRinging] = useState(false);
//     const [connected, setConnected] = useState(false);
//     const [audio, setAudio] = useState(null);

//     useEffect(() => {
//         if (!socket) {
//             console.log("socket is not defined");
//         } else {
//             console.log("created avrc");
//             if (!avrc) {
//                 let _avrc = new AVRC(
//                     socket,
//                     (stream) => {
//                         if (remoteVideoRef.current) {
//                             remoteVideoRef.current.srcObject = stream;
//                         }
//                     },
//                     () => {
//                         setRinging(true);
//                         let audio = new Audio(callsound);
//                         audio.play();
//                         setAudio(audio);
//                     }
//                 );
//                 _avrc.getConnectionStateChange((ch) => {
//                     setConnected(ch);
//                 });

//                 setAVRC(_avrc);
//             }
//         }
//     }, [socket]);

//     return (
//         <div>
//             {connected ? <h1>connected</h1> : <h1>not connected</h1>}
//             <h1>this is our caller page</h1>
//             <video autoPlay={true} ref={localVideoRef} width={400}></video>
//             <video autoPlay={true} ref={remoteVideoRef} width={400}></video>

//             {ringing ? <Lottie animationData={CallAnimation} loop={true} /> : <img alt="error" src="/phone-call.png" width={200} />}

//             <Button onClick={async () => {
//                 // try {
//                     let stream = await avrc?.startLocalStream({
//                         audio: true
//                     });

//                     let videoRef = localVideoRef.current;
//                     if (videoRef && stream) {
//                         videoRef.srcObject = stream;
//                     }
//                 // }
//                 // catch (err) {
//                 //     console.log(err);
//                 // }
//             }}>Start stream
//             </Button>

//             <Button onClick={() => {
//                 avrc?.answerPhone();
//             }}>Answer Call
//             </Button>

//             <Button onClick={async () => {
//                 if (avrc) {
//                     await avrc?.createOffer();
//                 } else {
//                     console.log("Cannot find avrc");
//                 }
//             }}>
//                 Create offer
//             </Button>
//         </div>
//     );
// }

// export default Call;


// Call.js
import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import { AcceptCall, Mic, MicSlash, PhoneSlash, VolumeLow, ZoomOut } from '~/components/Icon/Icon';
import images from '~/assets/images';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import AVRC from '~/avrc/avrc'; // Replace with the actual library import
import Button from '~/components/Button';
import Lottie from 'lottie-react';
import CallAnimation from '../../utils/animation/call_animation.json';
import callsound from '../../utils/phonesound.mp3';
import { useLocation, useParams } from 'react-router-dom';
import { handleGetInfoByID } from '~/services/userService';

const cx = classNames.bind(styles);

function Call({ socket }) {
    const {id} = useParams();
    const location = useLocation();
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [avrc, setAVRC] = useState(null);
    const [ringing, setRinging] = useState(false);
    const [connected, setConnected] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isShowMic, setIsShowMic] = useState(true);
    const [userInfo, setUserInfo] = useState();

    const handleToggleMic = () => {
        setIsShowMic(!isShowMic);
    };

    useEffect(() => {
        const fetchApi = async() => {
            try {
                let data = await handleGetInfoByID(id);
                
                if (data && data.userData.errCode === 0) {
                    console.log(data.userData.user);
                    setUserInfo(data.userData.user)
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
        console.log('socket');
        console.log(socket);
        if (!socket) {
            console.log("socket is not defined");
        } else {
            console.log("created avrc");
            if (!avrc) {
                let _avrc = new AVRC(
                    socket,
                    (stream) => {
                        console.log("stream data:");
                        console.log(stream);
                        console.log(remoteVideoRef);
                        // remoteVideoRef.current = {}
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = stream;
                        }
                        // let videoRef = remoteVideoRef.current;
                        // if (videoRef && stream) {
                        //     videoRef.srcObject = stream;
                        // }
                    },
                    () => {
                        setRinging(true);
                        let audio = new Audio(callsound);
                        audio.play()
                            // .then(res => {})
                            // .catch(err => console.log(err)) 
                        setAudio(audio);
                    }
                    , id
                );
                _avrc.getConnectionStateChange((ch) => {
                    console.log('connected', ch);
                    setConnected(ch);
                });

                setAVRC(_avrc);
            }
        }
    }, []);

    useEffect(() => {
        const startStream = async() => {
            try {
                if(avrc) {
                    console.log('start stream');
                    let stream = await avrc?.startLocalStream({
                        audio: true,
                        video: true,
                    });
    
                    console.log('local test');
                    console.log(localVideoRef);
                    let videoRef = localVideoRef.current;
                    if (videoRef && stream) {
                        videoRef.srcObject = stream;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        startStream();

        const createOfferApi = async() => {
            try {
                if(location.state.from) {
                    if (avrc) {
                        setTimeout(async () => {
                            await avrc?.createOffer();
                        }, 1000)
                    } else {
                        console.log("Cannot find avrc");
                    }
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        createOfferApi();
        
    }, [avrc, location.state.from])

    const handleAcceptCall = () => {
        console.log('accept call');
        console.log(audio);
        console.log(avrc);
        audio?.pause();
        console.log(audio);
        avrc?.answerPhone();
    }

    console.log(localVideoRef);
    console.log(remoteVideoRef);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('status-header')}>Calling ...</div>
                <ZoomOut className={cx('zoom-action')} />
            </div>
            <div className={cx('body')}>
                {
                    // connected ? 
                    // (
                    //     <div className={cx('body-call')}>
                    //         <div>hellooooooooo</div>
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={300} ></video>
                    //         <video className={cx('remote-video')} autoPlay={true} ref={remoteVideoRef} width={300}></video>
                    //     </div>
                    // )
                    // : 
                    // (
                        <div className={cx('body-call')}>
                            {/* <div className={cx('main-call')}> */}
                                {!connected ? (
                                    <Fragment>
                                        <img src={userInfo && images[userInfo.avatar]} alt="" />
                                        <div className={cx('fullname')}>{userInfo && userInfo.fullName}</div>
                                        <Lottie animationData={CallAnimation} loop={true} />
                                    </Fragment>
                                ) : ''}
                            {/* </div> */}
                            <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={230} height={180} muted={true}></video>
                            <video className={cx('remote-video', {disconnected: !connected})} autoPlay={true} ref={remoteVideoRef} width={300}></video>
                        </div>
                    // )
                    // : location.state.from ? (
                    //     <div className={cx('body-call')}>
                    //         {/* <div className={cx('main-call')}> */}
                    //             <img src={userInfo && images[userInfo.avatar]} alt="" />
                    //             <div className={cx('fullname')}>{userInfo && userInfo.fullName}</div>
                    //         {/* </div> */}
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={250} height={250} muted={true}></video>
                    //     </div>
                    // ) : location.state.to ? (
                    //     <div className={cx('body-call')}>
                    //         {/* <img src={images.cancer} alt="" />
                    //         <div className={cx('fullname')}>Hồng Diễm</div>
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={400} muted={true}></video> */}
                    //         {/* <div className={cx('total-time')}>01:28:30</div> */}
                    //     </div>
                    // ) : ''
                }
            </div>
            <div className={cx('footer')}>
                {connected ? 
                (
                    <div className={cx('phone-function')}>
                        <VolumeLow className={cx('icon')} />
                        {isShowMic ? (
                            <Mic className={cx('icon')} onClick={handleToggleMic} />
                        ) : (
                            <MicSlash className={cx('icon')} onClick={handleToggleMic} />
                        )}
                        <div className={cx('phone-call')}>
                            <PhoneSlash />
                        </div>
                    </div>
                ) : 
                location.state.to ? (
                    <div className={cx('phone-function')}>
                        <div className={cx('accept-call')}>
                            <AcceptCall onClick={handleAcceptCall}/>
                        </div>
                        <div className={cx('phone-call')}>
                            <PhoneSlash />
                        </div>
                    </div>
                ) : (
                    <div className={cx('phone-function')}>
                        <VolumeLow className={cx('icon')} />
                        {isShowMic ? (
                            <Mic className={cx('icon')} onClick={handleToggleMic} />
                        ) : (
                            <MicSlash className={cx('icon')} onClick={handleToggleMic} />
                        )}
                        <div className={cx('phone-call')}>
                            <PhoneSlash />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // return (
    //     <div>
    //         {connected ? <h1>connected</h1> : <h1>not connected</h1>}
    //         <h1>this is our caller page</h1>
    //         <video autoPlay={true} ref={localVideoRef} width={400} muted={true}></video>
    //         <video autoPlay={true} ref={remoteVideoRef} width={400}></video>

    //         {ringing ? <Lottie animationData={CallAnimation} loop={true} /> : <img alt="error" src="/phone-call.png" width={200} />}

    //         {/* <Button onClick={async () => {
    //             try {
    //                 let stream = await avrc?.startLocalStream({
    //                     audio: true,
    //                     video: true,
    //                 });

    //                 let videoRef = localVideoRef.current;
    //                 if (videoRef && stream) {
    //                     videoRef.srcObject = stream;
    //                 }
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }}>Start stream
    //         </Button> */}

    //         <Button
    //             disabled={!ringing}
    //             onClick={() => {
    //                 audio?.pause();
    //                 avrc?.answerPhone();
    //             }}>
    //                 Answer Call
    //         </Button>

    //         <Button onClick={async () => {
    //             if (avrc) {
    //                 await avrc?.createOffer();
    //             } else {
    //                 console.log("Cannot find avrc");
    //             }
    //         }}>
    //             Create offer
    //         </Button>
    //     </div>
    // );
}


export default Call;
