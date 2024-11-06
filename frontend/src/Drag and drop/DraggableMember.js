import React from "react";
import { useDrag } from "react-dnd";

const DraggableMember = ({
  member,
  onClick,
  selectedMember,
  getAvatarColor,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "MEMBER",
    item: { id: member.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      onClick={() => onClick(member.id)}
      style={{
        height: "50px",
        borderRadius: "15px",
        width: "100%",
        padding: "0",
        boxSizing: "border-box",
        cursor: "pointer",
        backgroundColor:
          selectedMember === member.id ? "#808080" : "transparent",
        color: selectedMember === member.id ? "white" : "black",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: "192px",
          height: "40px",
          lineHeight: "40px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginLeft: "28%",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getAvatarColor(member.avatar),
            marginRight: "10px",
          }}
        />
        {member.first_name}
      </div>
    </div>
  );
};

export default DraggableMember;
