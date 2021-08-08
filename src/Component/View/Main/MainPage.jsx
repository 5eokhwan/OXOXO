import React, { useState } from "react";
import { Col, Row, Pagination, Typography } from "antd";
import ACard from "./ACard";
import { useSelector } from "react-redux";

const pageSize = 4;

function MainPage(props) {
  const Bingos = useSelector((state) => state.bingos);
  const [CurrentPage, setCurrentPage] = useState(1);

  const renderCards = Bingos.slice(
    pageSize * (CurrentPage - 1),
    pageSize * CurrentPage
  ).map((bingo, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <ACard bingo={bingo} history={props.history} />
      </Col>
    );
  });

  const handleChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Row gutter={[8, 8]}>{renderCards}</Row>
        <br />
      </div>
      {Bingos.length ? (
        <Pagination
          pageSize={pageSize}
          current={CurrentPage}
          total={Bingos.length}
          onChange={handleChange}
          style={{ display: "flex", justifyContent: "center" }}
        />
      ) : (
        <Typography.Title style={{ display: "flex", justifyContent: "center" }}>
          Create a bingo!
        </Typography.Title>
      )}
    </>
  );
}

export default MainPage;
