class AVRC {
    constructor(io, fn, onCall, userID) {
        this.toUserID = userID;
        this.connection = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        this.io = io;
        this.remoteStream = new MediaStream();

        io.on("answer", async (answer) => {
            console.log("answer fe");
            console.log(answer);
            try {
                let rtc_session_description = new RTCSessionDescription(answer.answer);
                await this.connection?.setRemoteDescription(rtc_session_description);
            } catch (error) {
                throw error;
            }
        });

        io.on("offer", async (offer) => {
            console.log("offer fe");
            console.log(offer.offer);
            this.offer = offer.offer;
            onCall();
        });

        this.connection.ontrack = (ev) => {
            if (ev.streams[0]) {
                fn(ev.streams[0]);
            }
        };

        let toUserID = this.toUserID
        this.connection.onicecandidate = (e) => {
            if (e.candidate) {
                let candidate = e.candidate;
                io.emit("ice_candidate", {candidate, toUserID});
            }
        };
    }

    async createOffer() {
        try {
            let offer = await this.connection?.createOffer();
            await this.connection?.setLocalDescription(offer);
            console.log(offer);

            this.io && this.io.on("ice_candidate", async (ice_candidate) => {
                console.log("ice_candidate fe");
                console.log(ice_candidate);
                try {
                    await this.connection?.addIceCandidate(ice_candidate.ice_candidate);
                } catch (error) {
                    throw error;
                }
            });

            let toUserID = this.toUserID
            this.io?.emit("offer", {offer, toUserID});
        } catch (err) {
            throw err;
        }
    }

    async startLocalStream(config) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(config);
            this.localStream.getTracks().forEach((track) => {
                this.localStream && this.connection?.addTrack(track, this.localStream);
            });
            return this.localStream;
        } catch (err) {
            console.log("Some issue during starting the stream");
            throw err;
        }
    }

    async getLocalStream() {
        return this.localStream;
    }

    async getConnectionStateChange(fn) {
        if (this.connection) {
            this.connection.onconnectionstatechange = () => {
                fn(this.connection?.connectionState === "connected");
            };
        }
    }

    getRemoteStream() {
        return this.remoteStream;
    }

    async answerPhone() {
        if (!this.offer) {
            console.log("there is a phone call");
            return;
        }

        try {
            console.log(this.offer);
            const rtc_session_description = new RTCSessionDescription(this.offer);
            await this.connection?.setRemoteDescription(rtc_session_description);
            let answer = await this.connection?.createAnswer();
            await this.connection?.setLocalDescription(answer);

            let toUserID = this.toUserID
            this.io && this.io.emit("answer", {answer, toUserID});
        } catch (err) {
            throw err;
        }
    }
}

export default AVRC;
