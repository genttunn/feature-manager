import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import DBView from "./views/DBView";
import GridView from "./views/GridView";
import PlotView from "./views/PlotView";
import { LoadingContext } from "./shared/LoadingContext";
import { DarkmodeContext } from "./shared/DarkmodeContext";
import { themeDark, themeLight } from "./styles/globalStyles";
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
  const [darkmode, setDarkmode] = useState(false);
  const [globalTheme, setGlobalTheme] = useState(themeLight);
  useEffect(() => {
    if (darkmode === true) {
      setGlobalTheme(themeDark);
    } else if (darkmode === false) {
      setGlobalTheme(themeLight);
    }
  }, [darkmode]);
  return (
    <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Router>
          <div className="App" style={{ backgroundColor: globalTheme.background }}>
            <NavigationBar />
            {switches}
          </div>
        </Router>
      </LoadingContext.Provider>
    </DarkmodeContext.Provider>
  );
}

export default App;
