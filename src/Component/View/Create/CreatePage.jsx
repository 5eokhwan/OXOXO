import React, { useState, useEffect, useRef } from "react";
import BingoSpaceForInput from "./BingoSpaceForInput";
import { useDispatch, useSelector } from "react-redux";
import { bingoInsert, bingoUpdate } from "../../../_reducer/Bingo";
import { spaceInit } from "../../../_reducer/Bingo";

import { maxScale, defaultSpaceInfo } from "./data";
import "./bingoCreatePage.css";
import {
  Slider,
  Row,
  Col,
  Select,
  Typography,
  Form,
  Input,
  Button,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const marks = { 2: "2", 3: "3", 4: "4", 5: "5", 6: "6" };

const renderOption = () => {
  const options = [];
  for (let i = 2; i <= maxScale; i++)
    options.push(
      <Option value={i} key={i}>
        {i} X {i}
      </Option>
    );
  return options;
};

function BingoCreatePage(props) {
  const [focusSpace, setfocusSpace] = useState(null);
  const [basicInfo, setBasicInfo] = useState({
    Creator: "",
    BoardScale: 3,
    BingoTitle: "",
    ThumnailFile: "",
    BriefDesc: "",
    Description: "",
  });
  const spaces_info = useSelector((state) => state.spaces_info);
  const [globalInfo, setGlobalInfo] = useState({ lineColor: "#bdd7ee" });
  //const [isUpdate, setIsUpdate] = useState(props.match.params.numbe false);
  const dispatch = useDispatch();
  console.log("match", /update/.test(props.match.url));

  const bingos = useSelector((state) => state.bingos);
  const isUpdate = useRef(/update/.test(props.match.url));
  useEffect(() => {
    if (isUpdate.current !== /update/.test(props.match.url)) {
      props.history.push("/");
      props.history.goBack();
      return;
    }
    if (isUpdate.current) {
      console.log(bingos, props.match.params.number);
      const bingo = bingos.find(
        (bingo) => bingo.number === parseInt(props.match.params.number)
      );
      setBasicInfo(bingo.basicInfo);
      setGlobalInfo(bingo.globalInfo);
      const tempArr = [...bingo.spaceInfos];
      for (let i = bingo.spaceInfos.length; i < Math.pow(maxScale, 2); i++) {
        tempArr.push(defaultSpaceInfo);
      }
      dispatch(spaceInit(tempArr));
    } else {
      dispatch(
        spaceInit(
          Array.from({ length: Math.pow(maxScale, 2) }).map(
            (v) => defaultSpaceInfo
          )
        )
      );
    }
  }, [props.match.url]);

  const onBasicInfoChange = (e) => {
    const { value, name } = e.target;
    setBasicInfo({
      ...basicInfo, // ????????? input ????????? ????????? ???
      [name]: value, // name ?????? ?????? ?????? value ??? ??????
    });
  };

  const onBoardScaleChange = (value) => {
    setBasicInfo({
      ...basicInfo,
      BoardScale: value,
    });
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        console.log(theFile, result);
        setBasicInfo({
          ...basicInfo,
          ThumnailFile: result,
        });
      };
    }
  };

  const onClearThumnail = (e) => {
    setBasicInfo({
      ...basicInfo,
      ThumnailFile: "",
    });
  };

  const onGlobalChange = (e) => {
    const { value, name } = e.target;
    setGlobalInfo({
      ...globalInfo,
      [name]: value,
    });
  };

  const updateFocusSpace = (i) => {
    setfocusSpace(i);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (basicInfo.BingoTitle.length === 0 || basicInfo.BriefDesc.length === 0) {
      alert("????????? ??????????????? ?????? ?????? ???????????????.");
      return;
    }
    const spaceInfos = spaces_info.slice(
      0,
      basicInfo.BoardScale * basicInfo.BoardScale
    );
    const data = {
      number: bingos[0] ? bingos[0].number + 1 : 0,
      basicInfo,
      globalInfo,
      spaceInfos,
    };
    if (!isUpdate.current) dispatch(bingoInsert(data));
    else {
      console.log("update???");
      data.number = parseInt(props.match.params.number);
      dispatch(bingoUpdate(data));
    }
    props.history.push("/");
  };
  const renderSpacesForInput = (BoardScale) => {
    console.log("rende", spaces_info);
    let i;
    let repeat = BoardScale * BoardScale;
    let lst = [];
    for (i = 0; i < repeat; i++) {
      lst.push(
        <BingoSpaceForInput
          key={i}
          index={i}
          boardScale={BoardScale}
          updateFocusSpace={updateFocusSpace}
          focusSpace={focusSpace}
          lineColor={globalInfo.lineColor}
          info={spaces_info[i]}
        />
      );
    }
    return lst;
  };

  return (
    spaces_info && (
      <div
        style={{
          margin: "30px 30px",
        }}
      >
        <Form>
          <Row gutter={[16, 16]}>
            <Col lg={8} md={24}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title level={3} style={{ textAlign: "left" }}>
                    ??????
                  </Title>
                </Col>
                <Col span={6}>
                  <Text>??????</Text>
                </Col>
                <Col span={12}>
                  <Slider
                    value={basicInfo.BoardScale}
                    name="BoardScale"
                    onChange={onBoardScaleChange}
                    marks={marks}
                    min={2}
                    max={maxScale}
                  />
                </Col>
                <Col span={6}>
                  <Select
                    name="BoardScale"
                    value={basicInfo.BoardScale}
                    onChange={onBoardScaleChange}
                    style={{ width: "100%" }}
                  >
                    {renderOption()}
                  </Select>
                </Col>
                <Col span={7}>
                  <Text>??? ??????</Text>
                </Col>
                <Col span={17}>
                  <input
                    type="color"
                    name="lineColor"
                    onChange={onGlobalChange}
                    value={globalInfo.lineColor}
                  ></input>
                </Col>
                <Col span={24}>
                  <Title level={3} style={{ textAlign: "left" }}>
                    ??????
                  </Title>
                </Col>
                <Col span={6}>
                  <Text level={5}>?????????</Text>
                </Col>
                <Col span={18}>
                  <Input
                    required
                    onChange={onBasicInfoChange}
                    name="Creator"
                    value={basicInfo.Creator}
                  />
                </Col>

                <Col span={6}>
                  <Text>?????????</Text>
                </Col>
                <Col span={18}>
                  <Input
                    type="file"
                    accept={"image/*"}
                    onChange={onFileChange}
                  />
                  {basicInfo.ThumnailFile && (
                    <div>
                      <img
                        src={basicInfo.ThumnailFile}
                        alt="img"
                        width={"50px"}
                        height={"50px"}
                      />
                      <button onClick={onClearThumnail}>??????</button>
                    </div>
                  )}
                </Col>
                <Col span={6}>
                  <Text level={5}>??????</Text>
                </Col>
                <Col span={18}>
                  <Input
                    required
                    onChange={onBasicInfoChange}
                    name="BingoTitle"
                    value={basicInfo.BingoTitle}
                  />
                </Col>
                <Col span={6}>
                  <Text level={5}>?????? ??????</Text>
                </Col>
                <Col span={18}>
                  <Input
                    required
                    onChange={onBasicInfoChange}
                    name="BriefDesc"
                    value={basicInfo.BriefDesc}
                  />
                </Col>
                <Col span={6}>
                  <Text required level={5}>
                    ?????? ??????
                  </Text>
                </Col>
                <Col span={18}>
                  <TextArea
                    rows="10"
                    onChange={onBasicInfoChange}
                    name="Description"
                    value={basicInfo.Description}
                    style={{ resize: "none" }}
                  />
                </Col>
                <Col span={24}>
                  {/* <Input type='reset' /> */}
                  <Button onClick={onSubmit} style={{ marginTop: "10px" }}>
                    ?????????
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg={14} xs={24}>
              <Title level={3}>??????</Title>
              <Text>????????? ????????? ?????? ??? ?????? ?????? ?????? ?????????.</Text>
              <div
                id="BingoBoard"
                style={{ backgroundColor: globalInfo.lineColor }}
              >
                {renderSpacesForInput(basicInfo.BoardScale)}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    )
  );
}

export default BingoCreatePage;

// const spaces = spaceInfos.slice(
//   0,
//   basicInfo.BoardScale * basicInfo.BoardScale
// );
// const config = {
//   header: { "content-type": "multipart/form-data" },
// };
// const formData = new FormData();
// ////append data////
// console.log(basicInfo);
// for (let key in basicInfo) {
//   formData.append(key, basicInfo[key]);
//   console.log("basicInfo", key, formData.get("basicInfo." + key));
// }
// formData.append("globalInfo", JSON.stringify(globalInfo));
// for (let i = 0; i < spaces.length; i++) {
//   for (let key in spaces[i]) {
//     formData.append("spaces[" + i + "]." + key, spaces[i][key]);
//     //console.log(spaces[i][key]);
//     console.log("space", key, formData.get("spaces[" + i + "]." + key));
//   }
// }
// console.log(formData.get("spaces[0]"));
// ///////////////////
// Axios.post("http://localhost:5000/api/bingo/upload", formData, config).then(
//   (response) => {
//     if (response.data.success) {
//       message.success("????????? ??????!");
//       props.history.push("/");
//     } else {
//       alert("???????????? ??????????????????.");
//     }
//   }
// );
