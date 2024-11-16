import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "shared/Header";
import MainLayout from "components/common/Layout/MainLayout";
import GroupList from "components/group/GroupList";
import Button from "components/common/Button";
import { styled } from "styled-components";
import SearchField from "components/common/SearchField";
import { getToken } from "../utils/localStroage";
import axios from "axios";

interface Group {
  _id: string;
  groupId: string;
  name: string;
  members: { userId: string; role: string }[];
  createdAt: string;
  role: string;
  memberCount: number;
}

const Group = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [userId, setUserId] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if(token) {
      fetchUserGroups();
    }
  }, [token]);

  const fetchUserGroups = async () => {
    try {
      const response = await axios.get("http://localhost:8080/groups/mygroup", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroups(response.data);
      setFilteredGroups(response.data);
    } catch (error) {
      console.error("그룹 목록을 불러오는 중 오류 발생:", error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredGroups(groups); 
    } else {
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGroups(filtered); 
    }
  };

  const handleGenerateGroup = () => {
    navigate("/newGroup");
  };

  return (
    <MainLayout>
      <Header title="Group">
        <SearchField 
          placeHolder="Search Group Name" 
          width="25vw" 
          onSearch={(value) => {
            setSearchQuery(value); 
            handleSearch(value);
          }}
        />
        <Button width="150px" onClick={handleGenerateGroup}>
          그룹 생성
        </Button>
      </Header>
      {userId && <GroupList groups={filteredGroups} />}
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
