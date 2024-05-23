import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import GroupList from "components/group/GroupList";

const Group = () => {
  return (
    <MainLayout>
      <Header title="Group"></Header>
      <GroupList></GroupList>
    </MainLayout>
  );
};

export default Group;
