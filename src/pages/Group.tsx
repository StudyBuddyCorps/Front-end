import { useNavigate } from "react-router-dom";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import GroupList from "components/group/GroupList";
import IconInputField from "components/common/IconInputField";
import Button from "components/common/Button";
import { styled } from "styled-components";

const Group = () => {
  const navigate = useNavigate();

  const handleGenerateGroup = () => {
    navigate("/newGroup");
  };

  return (
    <MainLayout>
      <Header title="Group">
        <IconInputField placeHolder="Search Group Name" />
        <Button width="150px" onClick={handleGenerateGroup}>
          그룹 생성
        </Button>
      </Header>
      <GroupList></GroupList>
    </MainLayout>
  );
};

const Icon = styled.div`
  display: flex;
  height: 50px;
  padding: 0px 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white01};
  border-radius: 5px;
  border: none;
`;

export default Group;
