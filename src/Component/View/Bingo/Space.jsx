import React, { useState } from "react";

function Space(props) {
  const [IsCheck, setIsCheck] = useState(false);
  //const [IsBingo, setIsBingo] = useState(false);
  const onClick = () => {
    setIsCheck((pre) => !pre);
    props.changeCheck(props.index, !IsCheck);
  };

  return (
    <div
      className={IsCheck ? "space checked" : "space"}
      onClick={onClick}
      style={{
        width: `${100 / props.boardScale}%`,
        height: `${100 / props.boardScale}%`,
        fontSize: `${5 / props.boardScale}em`,
        color: props.info.fontColor,
        boxSizing: "border-box",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",
        backgroundColor: props.info.bgColor,
        border: `3px ${props.lineColor} solid`,
      }}
    >
      <div className={"spaceText"} style={{ width: "100%" }}>
        {props.info.content}
      </div>
    </div>
  );
}

export default Space;
