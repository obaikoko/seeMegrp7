import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const WebRTCComponent = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();
  const roomName = "test_room"; // Replace with your room name
  const signalingServerUrl = "http://localhost:5800"; // Replace with your signaling server URL

  useEffect(() => {
    socketRef.current = io(signalingServerUrl);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        socketRef.current.emit("join", roomName); // Join the room

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current.id, stream);
            peers.push({ peerID: userId, peer });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          setPeers((peers) => [...peers, { peerID: payload.callerID, peer }]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peers.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peers.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peersList = peers.filter((p) => p.peerID !== id);
          setPeers(peersList);
        });
      });

    return () => {
      socketRef.current.disconnect();
      peers.forEach((peer) => peer.peer.destroy());
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    peer.on("stream", (remoteStream) => {
      addRemoteStream(remoteStream);
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.on("stream", (remoteStream) => {
      addRemoteStream(remoteStream);
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function addRemoteStream(remoteStream) {
    const remoteVideo = document.createElement("video");
    remoteVideo.srcObject = remoteStream;
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;
    remoteVideosRef.current.appendChild(remoteVideo);
  }

  return (
    <div>
      <h2>Local Video</h2>
      <video ref={localVideoRef} autoPlay playsInline muted></video>
      <h2>Remote Videos</h2>
      <div ref={remoteVideosRef}></div>
    </div>
  );
};

export default WebRTCComponent;
