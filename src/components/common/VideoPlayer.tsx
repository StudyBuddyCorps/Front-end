import React, { useEffect } from 'react';
import styled from "styled-components";

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef }) => {

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera setup failed:", error);
      }
    }

    setupCamera();
  }, [videoRef]);

  return (
    <Container>
      <Video ref={videoRef} autoPlay />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Video = styled.video`
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 5px;
`;

export default VideoPlayer;