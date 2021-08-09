import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
const LeftMenu = withRouter((props) => {
  console.log(props.location.pathname);
  return (
    <Menu mode={props.mode} selectedKeys={[props.location.pathname]}>
      <Menu.Item key="/">
        <a onClick={() => props.history.push("/")}>List</a>
      </Menu.Item>
      <Menu.Item key="/create">
        <a onClick={() => props.history.push("/create")}>Create</a>
      </Menu.Item>
    </Menu>
  );
});

export default LeftMenu;
