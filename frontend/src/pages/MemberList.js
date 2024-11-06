import React, { useContext, useEffect, useState } from "react";
import { Spin, List, message } from "antd";
import { AuthContext } from "../Context/AuthProvider";
import { fetchMembers, fetchTasksByUserAndMember } from "../Services/services";
import { avatarData } from "../constant";
import DraggableMember from "../Drag and drop/DraggableMember";

const MemberList = ({ selectedMember, setSelectedMember }) => {
  const { user, setMemberId } = useContext(AuthContext) ?? {};
  const userId = user.user_id;
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [errorMembers, setErrorMembers] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberData = await fetchMembers(userId);
        setMembers(memberData);
      } catch (err) {
        setErrorMembers(err);
      } finally {
        setLoadingMembers(false);
      }
    };
    fetchMemberData();
  }, [userId]);

  const handleMemberClick = async (memberId) => {
    setSelectedMember(memberId);
    setMemberId(memberId);
    setLoadingTasks(true);
    try {
      const tasksData = await fetchTasksByUserAndMember(userId, memberId);
      setTasks(tasksData);
    } catch (err) {
      message.error("Error fetching tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  const getAvatarColor = (avatarId) => {
    const avatar = avatarData.find((a) => a.id === avatarId);
    return avatar ? avatar.name : null;
  };

  if (loadingMembers) return <Spin size="large" />;
  if (errorMembers) return <p>Error fetching members</p>;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "10px",
          maxHeight: "100%",
          overflowY: "auto",
          width: "200px",
        }}
      >
        <List
          dataSource={members}
          renderItem={(item) => (
            <DraggableMember
              key={item.id}
              member={item}
              onClick={handleMemberClick}
              selectedMember={selectedMember}
              getAvatarColor={getAvatarColor}
            />
          )}
        />
      </div>
    </div>
  );
};

export default MemberList;
