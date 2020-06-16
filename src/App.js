import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import QIBView from "./views/QIBView";
import DBView from "./views/DBView";
import GridView from "./views/GridView";
import { LoadingContext } from "./shared/LoadingContext";
const switches = (
  <Switch>
    <Route path="/qib">
      <QIBView />
    </Route>
    <Route path="/database">
      <DBView />
    </Route>
    <Route path="/grid">
      <GridView />
    </Route>
    <Route path="/">
      <QIBView />
    </Route>
  </Switch>
);
function App() {
  const [loading, setLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <Router>
        <div className="App">
          <NavigationBar />
          {switches}
        </div>
      </Router>
    </LoadingContext.Provider>
  );
}

export default App;
