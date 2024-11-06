import React, { useState } from "react";
import { Member } from "../components/Member/Member";
import { Task } from "../components/Tasks/Task";
import "../Style/FamilyTask.css";
import { useSelector } from "react-redux";

export const FamilyTask = () => {
  const { usertaskRequests } =
    useSelector((state) => state?.taskRequestData) ?? {};
  const [showComponent, setShowComponent] = useState(usertaskRequests);

  return (
    <div className="container">
      <div className="member-section">
        <Member
          showComponent={showComponent}
          setShowComponent={setShowComponent}
        />
      </div>
      <div className="task-section">
        <Task showComponent={showComponent} />
      </div>
    </div>
  );
};
