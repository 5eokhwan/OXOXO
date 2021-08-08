import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
const LeftMenu = withRouter((props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="list">
        <a href="/">List</a>
      </Menu.Item>
      <Menu.Item key="create">
        <a href="/create">Create</a>
      </Menu.Item>
    </Menu>
  );
});

export default LeftMenu;
