import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Switch from "../../assets/images/Switch.png";
import UnSwitch from "../../assets/images/unSwitch.png";

interface DefaultSettingProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setShowGuideline: React.Dispatch<React.SetStateAction<boolean>>;
  roomType: string;
  studyMateVoice: string;
  assistantTone: string;
  accessToken: string;
}

const DefaultSetting: React.FC<DefaultSettingProps> = ({ setSelectedTab, setShowGuideline, roomType, studyMateVoice, assistantTone, accessToken }) => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [defaultRoomSetting, setDefaultRoomSetting] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cameraPermission) {
      initCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [cameraPermission]);

  const initCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.log("Error accessing camera: ", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCamera = () => {
    if (cameraPermission) {
      setCameraPermission(false);
    } else {
      requestCameraPermission();
    }
  };

  const handleDefaultRoomClick = () => {
    if (defaultRoomSetting) {
      setDefaultRoomSetting(false);
    } else {
      setDefaultRoomSetting(true);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setCameraPermission(true);
    } catch (error) {
      console.log("Error accessing camera: ", error);
    }
  };

  const handlePrevButtonClick = () => {
    setSelectedTab('3. 스터디 도우미');
  };
  
  const handleNextButtonClick = async () => {
    setShowGuideline(true);

    const requestBody = {
      roomType,
      studyMate: {
        image: "Noti",
        voice: studyMateVoice,
      },
      assistantTone,
      cameraAceess: true,
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      if (defaultRoomSetting) {
        const defaultResponse = await fetch("http://localhost:8080/studyroom/default", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
  
        if (!defaultResponse.ok) {
          const errorText = await defaultResponse.text();
          console.error("Failed to set default room:", errorText);
          throw new Error("Failed to set default room.");
        }
      }

      const response = await fetch("http://localhost:8080/studyroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken || ''}`,
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to create study room.");

      const responseData = await response.json();
      const roomId = responseData._id;
      const userId = responseData.userId;

      const startRoomResponse = await fetch(`http://localhost:8080/studyroom/${roomId}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!startRoomResponse.ok) throw new Error("Failed to start study room.");

      const startRoomData = await startRoomResponse.json();
      console.log("Start Room Response:", startRoomData);

      setTimeout(() => {
        setShowGuideline(false);
        navigate(`/studyroom/${roomId}`);
      }, 5000);
    } catch (error) {
      console.error("Error creating study room: ", error);
      setShowGuideline(false);
    } 
  };

  return (
    <Wrapper>
      <div>
        {cameraPermission ? (
          <PreviewVideo>
            <Video ref={videoRef} autoPlay playsInline />
          </PreviewVideo>
        ) : (
          <PreviewVideo style={{ backgroundColor: '#000000' }}/>
        )}

        <Table>
          <tr>
            <FirstTableCell>
              카메라 접근 권한 <span>*</span>
            </FirstTableCell>
            <td>
              <PermissionButton onClick={toggleCamera}>
                {cameraPermission ? 
                  <img src={Switch} alt="Cancel permission" /> : 
                  <img src={UnSwitch} alt="Allow permission" />
                }
              </PermissionButton>
            </td>
          </tr>
          <tr>
            <TableCell>
              디폴트 스터디룸 설정
            </TableCell>
            <td>
              <PermissionButton onClick={handleDefaultRoomClick}>
                {defaultRoomSetting ? 
                  <img src={Switch} alt="Cancel permission" /> : 
                  <img src={UnSwitch} alt="Allow permission" />
                }
              </PermissionButton>
            </td>
          </tr>
        </Table>
      </div>

      <Buttons>
        <Button onClick={handlePrevButtonClick}>이전</Button>
        <Button onClick={handleNextButtonClick} disabled={!cameraPermission}>다음</Button>
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 55vw;
  height: 88vh;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0 15px 15px 0;
  padding: 84px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  scrollbar-width: none; /* Firefox 용 스크롤 바 숨김 */
  -ms-overflow-style: none; /* IE 및 Edge 용 스크롤 바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome 및 Safari 용 스크롤 바 숨김 */
  }
`;

const PreviewVideo = styled.div`
  width: 100%;
  height: calc(30vw* 0.7);
  background-color: #303237;
  border: none;
  border-radius: 5px;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
`;

const PermissionButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
`;

const TableCell = styled.td`
  font-size: 20px;
  font-weight: 500;
  min-width: 300px;
`;

const FirstTableCell = styled(TableCell)`
  font-weight: 600;
      
  span {
    color: #FF0000;
    font-size: 24px;
  }
`;

const Table = styled.table`
  border-spacing: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: #586FC5;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default DefaultSetting;