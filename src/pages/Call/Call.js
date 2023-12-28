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
import React, { useEffect, useRef, useState } from 'react';
import AVRC from '~/avrc/avrc'; // Replace with the actual library import
import Button from '~/components/Button';
import Lottie from 'lottie-react';
import CallAnimation from '../../utils/animation/call_animation.json';
import callsound from '../../utils/phonesound.mp3';
import { useParams } from 'react-router-dom';

function Call({ socket }) {
    const toUserID = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [avrc, setAVRC] = useState(null);
    const [ringing, setRinging] = useState(false);
    const [connected, setConnected] = useState(false);
    const [audio, setAudio] = useState(null);

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
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = stream;
                        }
                    },
                    () => {
                        setRinging(true);
                        let audio = new Audio(callsound);
                        audio.play()
                            .then(res => {})
                            .catch(err => console.log(err)) 
                        setAudio(audio);
                    }
                );
                _avrc.getConnectionStateChange((ch) => {
                    setConnected(ch);
                });

                setAVRC(_avrc);
            }
        }
    }, [socket]);

    useEffect(() => {
        const startStream = async() => {
            console.log('start stream');
            try {
                if(avrc) {
                    let stream = await avrc?.startLocalStream({
                        audio: true,
                        video: true,
                    });
    
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
    }, [avrc])

    return (
        <div>
            {connected ? <h1>connected</h1> : <h1>not connected</h1>}
            <h1>this is our caller page</h1>
            <video autoPlay={true} ref={localVideoRef} width={400}></video>
            <video autoPlay={true} ref={remoteVideoRef} width={400}></video>

            {ringing ? <Lottie animationData={CallAnimation} loop={true} /> : <img alt="error" src="/phone-call.png" width={200} />}

            {/* <Button onClick={async () => {
                try {
                    let stream = await avrc?.startLocalStream({
                        audio: true,
                        video: true,
                    });

                    let videoRef = localVideoRef.current;
                    if (videoRef && stream) {
                        videoRef.srcObject = stream;
                    }
                } catch (err) {
                    console.log(err);
                }
            }}>Start stream
            </Button> */}

            <Button
                disabled={!ringing}
                onClick={() => {
                    audio?.pause();
                    avrc?.answerPhone();
                }}>
                    Answer Call
            </Button>

            <Button onClick={async () => {
                if (avrc) {
                    await avrc?.createOffer(toUserID);
                } else {
                    console.log("Cannot find avrc");
                }
            }}>
                Create offer
            </Button>
        </div>
    );
}


export default Call;
