import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  }, []);

  return (
    <Container>
      <Video ref={videoRef} autoPlay />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Video = styled.video`
  width: 100%;
`;

export default VideoPlayer;