import React from "react";
import styled from "styled-components";
import Send from "assets/images/Send.png";
import Close from "assets/images/Close_round.png";

interface ChatProps {
  showChat: boolean;
  toggleChat: () => void;
}

const Chat: React.FC<ChatProps> = ({ showChat, toggleChat }) => {
  return (
    <ChatWrapper showChat={showChat}>
      <ChatHeader>
        <div></div>
        스터디 도우미
        <CloseButton onClick={toggleChat}>
          <CloseIcon src={Close} alt="Close" />
        </CloseButton>
      </ChatHeader>
      <ChatContent>
        <p><strong>천재 너드 친구</strong> <br />오 어떤. 흥미로운. 주제를. 갖고왔지.?</p>
        <p><strong>You</strong> <br />왓썹맨~~</p>
      </ChatContent>
      <ChatInput>
        <Input type="text"/>
        <Button>
          <SendIcon src={Send} alt="Send" />
        </Button>
      </ChatInput>
    </ChatWrapper> 
  );
};

const ChatWrapper = styled.div<{ showChat: boolean }>`
  position: absolute;
  right: 0;
  width: 320px;
  height: calc(100% - 200px);
  display: ${({ showChat }) => (showChat ? 'flex' : 'none')};
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.white02};
  border-radius: 25px;
  align-items: center;
  padding-bottom: 16px;
  box-sizing: border-box;
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.colors.black02};
  color: ${({theme}) => theme.colors.white02};
  font-size: 20px;
  font-family: NotoSansSemiBold;
  display: flex;
  align-items: center;
  border-radius: 20px 20px 0 0;
  justify-content: space-between;
  padding: 0 5px;
  box-sizing: border-box;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  display: flex;
  border: 1px solid #C7C7C7;
  border-radius: 10px;
  width: 295px;
  height: 44px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  border-radius: 10px 0 0 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 5px;
`;

const SendIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default Chat;