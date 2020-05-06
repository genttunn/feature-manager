import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import QIBView from "./views/QIBView";
import DBView from "./views/DBView";
const switches = (
  <Switch>
    <Route path="/qib">
      <QIBView />
    </Route>
    <Route path="/database">
      <DBView />
    </Route>
    <Route path="/">
      <QIBView />
    </Route>
  </Switch>
);
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        {switches}
      </div>
    </Router>
  );
}

export default App;
