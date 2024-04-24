import Header from "shared/Header";
import Layout from "shared/Layout";
import GroupList from "components/group/GroupList";

const Group = () => {
  return (
    <Layout>
      <Header title="Group"></Header>
      <GroupList></GroupList>
    </Layout>
  );
};

export default Group;
