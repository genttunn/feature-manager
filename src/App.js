import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import DBView from "./views/DBView";
import GridView from "./views/GridView";
import PlotView from "./views/PlotView";
import { LoadingContext } from "./shared/LoadingContext";
const switches = (
  <Switch>
    <Route path="/grid">
      <GridView />
    </Route>
    <Route path="/plot">
      <PlotView />
    </Route>
    <Route path="/database">
      <DBView />
    </Route>
    <Route path="/">
      <GridView />
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
