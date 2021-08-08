import React, { useEffect, useState } from "react";
import Space from "./Space";
import { Typography, Row, Col } from "antd";
const { Title } = Typography;

function BingoPage(props) {
  const [BasicInfo, setBasicInfo] = useState({});
  const [GlobalInfo, setGlobalInfo] = useState({});
  const [SpaceInfos, SetspaceInfos] = useState({});
  const [CheckStates, setCheckStates] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bingos")).filter(
      (v) => parseInt(props.match.params.number) === v.number
    )[0];
    setBasicInfo(data.basicInfo);
    setGlobalInfo(data.globalInfo);
    SetspaceInfos(data.spaceInfos);
    setCheckStates(
      Array.from(
        { length: Math.pow(data.basicInfo.BoardScale, 2) },
        () => false
      )
    );
  }, []);
  console.log(BasicInfo, GlobalInfo, SpaceInfos);

  const changeCheck = (idx, value) => {
    const arr = [...CheckStates];
    arr[idx] = value;
    setCheckStates(arr);
  };

  const checkBingoCount = (arr) => {
    let scale = Math.sqrt(arr.length);
    let RCD_bingo = Array.from({ length: scale * 2 + 2 }, () => true);
    const len = RCD_bingo.length;
    for (let i = 0; i < scale; i++) {
      //check dia
      if (RCD_bingo[len - 2] === true && !CheckStates[i * scale + i]) {
        RCD_bingo[len - 2] = false; //lrBingo check
      }
      if (
        RCD_bingo[len - 1] === true &&
        !CheckStates[i * scale + scale - i - 1]
      ) {
        RCD_bingo[len - 1] = false; //rlBingo check
      }
      for (let j = 0; j < scale; j++) {
        if (RCD_bingo[i] === true && !CheckStates[i * scale + j]) {
          RCD_bingo[i] = false; //첫번째로우 두번째도우 ../ 체크
        }
        if (RCD_bingo[i + scale] === true && !CheckStates[i + j * scale]) {
          RCD_bingo[i + scale] = false; //첫번째칼럼 두번째칼럼 .. 체크
        }
      }
    }
    console.log(scale, CheckStates, RCD_bingo);
    return RCD_bingo.filter((el) => el === true).length;
  };

  const renderSpaces = () => {
    let i;
    let lst = [];
    for (i = 0; i < SpaceInfos.length; i++) {
      lst.push(
        <Space
          key={i}
          index={i}
          boardScale={BasicInfo.BoardScale}
          lineColor={GlobalInfo.lineColor}
          info={SpaceInfos[i]}
          changeCheck={changeCheck}
        />
      );
    }
    return lst;
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Title level={2} style={{ margin: "10px" }}>
          {BasicInfo.BingoTitle}
        </Title>
        <Title type="secondary" level={4} style={{ margin: "5px" }}>
          {BasicInfo.BriefDesc}
        </Title>
      </div>
      <Row style={{ textAlign: "center" }}>
        <Col md={24} lg={6}>
          {BasicInfo.Creator && <div>BY {BasicInfo.Creator}</div>}
        </Col>
        <Col md={24} lg={12}>
          <div
            id="BingoBoard"
            style={{
              backgroundColor: GlobalInfo.lineColor,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {renderSpaces(GlobalInfo.BoardScale)}
          </div>
          <Title level={3}>{checkBingoCount(CheckStates)} Bingo</Title>
        </Col>
        <Col md={24} lg={6}>
          <div>{BasicInfo.Description}</div>
        </Col>
      </Row>
    </>
  );
}

export default BingoPage;
