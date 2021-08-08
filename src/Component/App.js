import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./View/NavBar/Navber";

import MainPage from "./View/Main/MainPage";
import CreatePage from "./View/Create/CreatePage";
import BingoPage from "./View/Bingo/BingoPage";
//import CreatePage from "./View/Main/";

function App() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/create" component={CreatePage} />
          <Route exact path="/update/:number" component={CreatePage} />
          <Route exact path="/bingo/:number" component={BingoPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
