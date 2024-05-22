import React from 'react';
import styled, { css } from 'styled-components';

interface RadioProps {
  handleClickAdmin: (id: string) => void;
  selected: boolean;
  text: string;
  id: string;
  fontSize?: string;
  fontFamily?: string;
}

const Radio: React.FC<RadioProps> = ({ handleClickAdmin, selected, text, id, fontSize, fontFamily }) => {
  return (
    <ButtonBox>
      <AdminText fontSize={fontSize}>
        <NomalImg
          onClick={() => handleClickAdmin(id)}
          alt="nomalImg"
          src={require('../../assets/images/normal_radio.png')}
          selected={selected}
        />
        <ChangedImg
          onClick={() => handleClickAdmin(id)}
          alt="changedImg"
          src={require('../../assets/images/change_radio.png')}
          selected={selected}
        />
        {text}
      </AdminText>
    </ButtonBox>
  );
};

export default Radio;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AdminText = styled.div<{ fontSize?: string, fontFamily?: string }>`
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-weight: 600;
  font-size: ${(props) => props.fontSize || '20px'};
  font-family: ${(props) => props.fontFamily || 'NotoSansMedium'}
`;

const ChangeImg = styled.img`
  margin: 0 8px 0 0;
  width: 20px;
  height: 20px;
  background-color: white;
`;

const sharedImgStyles = css`
  display: none;
`;

const NomalImg = styled(ChangeImg)<{ selected: boolean }>`
  ${sharedImgStyles}
  ${({ selected }) => !selected && css`
    display: block;
  `}
`;

const ChangedImg = styled(ChangeImg)<{ selected: boolean }>`
  ${sharedImgStyles}
  ${({ selected }) => selected && css`
    display: block;
  `}
`;
