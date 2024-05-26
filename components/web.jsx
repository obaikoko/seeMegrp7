import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";


const socket = io.connect("http://localhost:5800");

const Web = () => {
  const [stream, setStream] = useState();
  const [me, setMe] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [call, setCall] = useState({});
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div>
      <h2>My Video</h2>
      <video ref={myVideo} playsInline autoPlay style={{ width: "300px" }} />
      <h2>User's Video</h2>
      <video ref={userVideo} playsInline autoPlay style={{ width: "300px" }} />

      <div>
        <input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div text={me}>
          <button
            variant="contained"
            color="primary"
            startIcon={<img fontSize="large" />}
          >
            Copy ID
          </button>
        </div>

        <input
          label="ID to Call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <div>
          {callAccepted && !callEnded ? (
            <button
              variant="contained"
              color="secondary"
              onClick={leaveCall}
              startIcon={<img fontSize="large" />}
            >
              End Call
            </button>
          ) : (
            <button
              color="primary"
              aria-label="call"
              onClick={() => callUser(idToCall)}
            >
              <img fontSize="large" />
            </button>
          )}
        </div>
      </div>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling...</h1>
          <button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Web;
