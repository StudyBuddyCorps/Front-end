import styled from "styled-components";
import VideoPlayer from "components/common/VideoPlayer";
import Noti from 'assets/images/Noti2.png';

const StudyRoom = () => {
  return (
    <Wrapper>
      <VideoContainer>
        <BuddyContainer>
          <BuddyImg src={Noti} alt="Buddy image" />
        </BuddyContainer>
        <VideoPlayer />
      </VideoContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background2};
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 100px 50px;
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BuddyContainer = styled.div`
  position: relative;
  width: 46vw;
  height: calc(40vw*0.7);
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 5px;
`;

const BuddyImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 40vw;
`;

export default StudyRoom;