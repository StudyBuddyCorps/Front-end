import React from 'react';
import styled from 'styled-components';

interface RadioProps {
  handleClickAdmin: (id: string) => void;
  click: boolean;
  text: string;
  id: string;
}

const Radio: React.FC<RadioProps> = ({ handleClickAdmin, click, text, id }) => {
  console.log('id->', id);

  return (
    <ButtonBox>
      <AdminText>
        <NomalImg
          onClick={() => handleClickAdmin(id)}
          alt="nomalImg"
          src={require('../../assets/normal_radio.png')}
          show={click}
        />
        <ChangedImg
          onClick={() => handleClickAdmin(id)}
          alt="changedImg"
          src={require('../../assets/change_radio.png')}
          show={click}
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
  margin-bottom: 20px;
`;

const AdminText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  font-weight: 600;
  font-size: 24px;
`;

const ChangeImg = styled.img`
  margin: 0 8px 0 0;
  width: 20px;
  height: 20px;
  background-color: white;
`;

const NomalImg = styled(ChangeImg)<{ show: boolean }>`
  display: ${({ show }) => (show ? 'none' : 'block')};
`;

const ChangedImg = styled(ChangeImg)<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`;