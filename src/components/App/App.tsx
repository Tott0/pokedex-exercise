// tslint:disable-next-line:no-implicit-dependencies
import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { BrowserRouter as Link, Route, Router } from "react-router-dom";

import "./App.scss";

import Header from "../../components/header/Header";
import Index from "../../scenes/Index/Index";

const customHistory = createBrowserHistory();

// asd
/** asdasd */
class App extends Component {
  public render() {
    return (
      <Router history={customHistory}>
        <div className="App">
          <Header />
          <Route exact path="/" component={Index} />
        </div>
      </Router>
    );
  }
}

export default App;
