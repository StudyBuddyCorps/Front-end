import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SettingTab from "components/studySetting/SettingTab";
import StudyType from "components/studySetting/StudyType";
import StudyMate from "components/studySetting/StudyMate";
import StudyHelper from "components/studySetting/StudyHelper";
import DefaultSetting from "components/studySetting/DefaultSetting";
import Guideline from "components/common/GuideLine";
import { getToken } from "../utils/localStroage";

const StudyRoomSetting: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('1. 스터디룸 타입');
  const [loading, setLoading] = useState(false);
  const [showGuideline, setShowGuideline] = useState(false);
  const [roomType, setRoomType] = useState('normal');
  const [studyMateVoice, setStudyMateVoice] = useState('voice1');
  const [assistantTone, setAssistantTone] = useState('default');
  const token = getToken();


  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Wrapper>
      { showGuideline ? (
        <Guideline />
      ) : (
        <>
          <SettingTab
            tabs={['1. 스터디룸 타입', '2. 스터디 메이트', '3. 스터디 도우미', '4. 디폴트 설정']}
            selectedTab={selectedTab}
            onSelectTab={handleTabSelect}
          />

          {selectedTab === '1. 스터디룸 타입' ? <StudyType setSelectedTab={setSelectedTab} setRoomType={setRoomType}/> 
          : selectedTab === '2. 스터디 메이트' ? <StudyMate setSelectedTab={setSelectedTab} setStudyMateVoice={setStudyMateVoice}/> 
          : selectedTab === '3. 스터디 도우미' ? <StudyHelper setSelectedTab={setSelectedTab} setAssistantTone={setAssistantTone}/>
          : <DefaultSetting 
              roomType={roomType} 
              studyMateVoice={studyMateVoice} 
              assistantTone={assistantTone} 
              accessToken={token || ''} 
              setSelectedTab={setSelectedTab} 
              setShowGuideline={setShowGuideline} 
            />
          }
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #212E42;
  align-items: center;
  justify-content: center;
`;

export default StudyRoomSetting;