import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddMember from '../../pages/AddMember';
import TaskList from '../../pages/Tasklisting';

export const Task = ({ showComponent }) => {
  const { usertaskRequests } = useSelector(state => state?.taskRequestData) ?? {};
  const [alreadyselected, setAlreadyselected] = useState();

  useEffect(() => {
    if (usertaskRequests !== null) {
      setAlreadyselected(usertaskRequests);
    }else{
      setAlreadyselected(showComponent);
    }
  }, [usertaskRequests , showComponent]);



  return (
    <div>
      {alreadyselected === 'addMember' && <AddMember />}
      {alreadyselected === 'Alltask' && <TaskList />}
      {alreadyselected === 'member-list' && <TaskList />}
    </div>
  );
};
