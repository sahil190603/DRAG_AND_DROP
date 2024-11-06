import React, { useContext, useState, useEffect } from 'react';
import { LaptopOutlined, HomeOutlined } from '@ant-design/icons';
import MemberList from '../../pages/MemberList';
import { AuthContext } from '../../Context/AuthProvider';
import '../../Style/Member.css';
import { useDispatch } from 'react-redux';
import { setUsertaskRequests } from '../../Redux/taskRequestsSlice';

export const Member = ({ showComponent, setShowComponent }) => {
  const dispatch = useDispatch();
  const { setMemberId } = useContext(AuthContext) ?? {};
  const [selected, setSelected] = useState(showComponent || 'Alltask');
  const [lastSelected, setLastSelected] = useState(showComponent || 'Alltask');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    dispatch(setUsertaskRequests(lastSelected));
  }, [lastSelected, dispatch]);

  const handleAllTask = () => {
    setShowComponent('Alltask');
    setMemberId(null);
    setSelected('Alltask');
    setLastSelected('Alltask');
    setSelectedMember(null); 
  };

  const handleMemberList = () => {
    setShowComponent('member-list');
    setSelected('member-list');
    setLastSelected('Alltask');
  };

  const handleAddMember = () => {
    setShowComponent('addMember');
    setSelected('addMember');
    setLastSelected('addMember');
    setSelectedMember(null); 
  };

  return (
    <div style={{ backgroundColor:'#A9A9A9' , height:'150%'}}>
    <div style={{ textAlign: 'center'}}>
      <div style={{paddingBottom:'25px'}}></div>
      <div 
        className={`menu-item ${selected === 'Alltask' ? 'selected' : ''}`}
        onClick={handleAllTask}
      >
        <HomeOutlined style={{ fontSize: '16px' }} />
        <span>All Task</span>
      </div>
      <div 
        className={`memberlist ${selected === 'member-list' ? 'selected' : ''}`}
        onClick={handleMemberList}
      >
        <MemberList 
          selectedMember={selectedMember} 
          setSelectedMember={setSelectedMember}
        />
      </div>
      <div
        className={`menu-item ${selected === 'addMember' ? 'selected' : ''}`}
        onClick={handleAddMember}
      >
        <LaptopOutlined style={{ fontSize: '16px' }} />
        <span>Add Member</span>
      </div>
      </div>
    </div>
  );
};
