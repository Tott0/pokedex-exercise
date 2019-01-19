// tslint:disable-next-line:no-implicit-dependencies
import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { BrowserRouter as Link, Route, Router } from "react-router-dom";

import "./App.scss";

import Header from "../../components/header/Header";
import PokedexIndex from "../../scenes/PokedexIndex/PokedexIndex";
import PokedexDetail from "../../scenes/PokedexDetail/PokedexDetail";

const customHistory = createBrowserHistory();

// asd
/** asdasd */
class App extends Component {
  public render() {
    return (
      <Router history={customHistory}>
        <div className="App">
          <Header />
          <Route exact path="/" component={PokedexIndex} />
          <Route path="/pokemon/:name" component={PokedexDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
