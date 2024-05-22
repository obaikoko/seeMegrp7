import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const WebRTCComponent = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();
  const roomName = 'test_room'; // Replace with your room name

  const signalingServerUrl = 'http://localhost:5000'; // Replace with your signaling server URL

  useEffect(() => {
    socketRef.current = io(signalingServerUrl);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        socketRef.current.emit('join', roomName); // Join the room

        socketRef.current.on('signal', ({ signal, from }) => {
          const peerIndex = peers.findIndex((peer) => peer.peerID === from);
          if (peerIndex !== -1) {
            peers[peerIndex].peer.signal(signal);
          } else {
            const peer = new SimplePeer({
              initiator: false,
              trickle: false,
              stream: stream,
            });

            peer.on('signal', (signal) => {
              socketRef.current.emit('signal', {
                roomId: roomName,
                signalData: signal,
                to: from,
              });
            });

            peer.on('stream', (remoteStream) => {
              const remoteVideo = document.createElement('video');
              remoteVideo.srcObject = remoteStream;
              remoteVideo.autoplay = true;
              remoteVideo.playsInline = true;
              remoteVideosRef.current.appendChild(remoteVideo);
            });

            setPeers((prevPeers) => [
              ...prevPeers,
              { peerID: from, peer: peer },
            ]);
            peer.signal(signal);
          }
        });

        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: stream,
        });

        peer.on('signal', (signal) => {
          socketRef.current.emit('signal', {
            roomId: roomName,
            signalData: signal,
            to: 'all',
          });
        });

        peer.on('stream', (remoteStream) => {
          const remoteVideo = document.createElement('video');
          remoteVideo.srcObject = remoteStream;
          remoteVideo.autoplay = true;
          remoteVideo.playsInline = true;
          remoteVideosRef.current.appendChild(remoteVideo);
        });

        setPeers([{ peerID: 'self', peer: peer }]);
      });

    return () => {
      peers.forEach(({ peer }) => peer.destroy());
      socketRef.current.disconnect();
    };
  }, [peers]);

  return (
    <div>
      <h2>Local Video</h2>
      <video ref={localVideoRef} autoPlay playsInline></video>
      <h2>Remote Videos</h2>
      <div ref={remoteVideosRef}></div>
    </div>
  );
};

export default WebRTCComponent;