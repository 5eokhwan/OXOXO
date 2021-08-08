import React from "react";
import { Icon, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useDispatch } from "react-redux";
import { bingoRemove } from "../../../_reducer/Bingo";
function ACard(props) {
  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(bingoRemove(props.bingo.number));
  };

  const update = () => {
    props.history.push(`/update/${props.bingo.number}`);
  };

  const play = () => {
    props.history.push(`/bingo/${props.bingo.number}`);
  };

  return (
    <Card
      cover={
        <div onClick={play}>
          {props.bingo.basicInfo.ThumnailFile ? (
            <img
              src={props.bingo.basicInfo.ThumnailFile}
              style={{ width: "100%", maxHeight: "200px" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#f5f5f5",
                padding: "75px 0px",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                No image
              </h1>
            </div>
          )}
        </div>
      }
      actions={[
        <Icon onClick={play} type="play-circle" />,
        <Icon onClick={update} type="edit" key="edit" />,
        <Icon onClick={deleteCard} type="delete" key="delete" />,
      ]}
    >
      <Meta
        title={props.bingo.basicInfo.BingoTitle}
        description={`${props.bingo.basicInfo.BriefDesc}`}
      />
    </Card>
  );
}

export default ACard;
