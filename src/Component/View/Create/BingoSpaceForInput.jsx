import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { spaceChange } from "../../../_reducer/Bingo";
import { Input, Icon, Row, Col } from "antd";
const { TextArea } = Input;

function BingoSpaceForInput(props) {
  const dispatch = useDispatch();
  const [IsActive, setIsActive] = useState(false);
  const [Info, setInfo] = useState(props.info);
  // const [imgPreview, setimgPreview] = useState("");

  useEffect(() => {
    if (props.focusSpace !== props.index) {
      setIsActive(false);
    }
  }, [props.focusSpace]);

  const onFocus = (e) => {
    setIsActive(true); //이거 없어도 될듯한데
    props.updateFocusSpace(props.index);
  };
  const onChange = (e) => {
    //console.log("onChange -", Info);
    const { value, name } = e.target;
    setInfo({
      ...Info,
      [name]: value,
    });
  };

  const onBlur = (e) => {
    dispatch(spaceChange(props.index, Info));
  };

  // const onInsertImg = (e) => {
  //   const {
  //     target: { files },
  //   } = e;
  //   const theFile = files[0];
  //   if (theFile) {
  //     console.log("onInsertImg");
  //     const reader = new FileReader();
  //     reader.readAsDataURL(theFile);
  //     reader.onloadend = (finishedEvent) => {
  //       const {
  //         currentTarget: { result },
  //       } = finishedEvent;
  //       setimgPreview(result);
  //       setInfo({
  //         ...Info,
  //         img: theFile,
  //       });
  //     };
  //   }
  // };

  const settingBar = (
    <div
      style={{
        width: `${100 / props.boardScale}%`,
        position: "absolute",
        top: "0px",
      }}
    >
      {/* <Row gutter={[8, 8]}>
        <Col span={4}>
          <Icon type="picture" />
        </Col>
        <Col span={20}>
          <input
            type="file"
            name="img"
            accept={"image/*"}
            style={{ display: "inline" }}
            onChange={onInsertImg}
            onBlur={onBlur}
          ></input>
        </Col>
      </Row> */}
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <Icon type="bg-colors" />
        </Col>
        <Col span={20}>
          <input
            type="color"
            name="bgColor"
            style={{ display: "inline" }}
            onChange={onChange}
            onBlur={onBlur}
            value={Info.bgColor}
          ></input>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <Icon type="font-colors" />
        </Col>
        <Col span={20}>
          <input
            type="color"
            name="fontColor"
            style={{ display: "inline" }}
            onChange={onChange}
            onBlur={onBlur}
            value={Info.fontColor}
          ></input>
        </Col>
      </Row>
    </div>
  );

  return (
    <div
      style={{
        width: `${100 / props.boardScale}%`,
        height: `${100 / props.boardScale}%`,
        margin: "0 auto",
        boxSizing: "border-box",
        display: "inline-block",
        padding: "2px",
        backgroundColor: Info.bgColor,
        // backgroundImage: `url(${imgPreview})`,
        backgroundSize: "cover",
        border: `3px ${props.lineColor} solid`,
      }}
    >
      {IsActive && settingBar}
      <TextArea
        required
        name="content"
        value={Info.content}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="input text"
        style={{
          resize: "none",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          color: Info.fontColor,
          border: "none",
          textAlign: "center",
          fontSize: `${6 / props.boardScale}em`,
        }}
      ></TextArea>
    </div>
  );
}

export default BingoSpaceForInput;
