import React, { useState } from "react";
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
      {/* Search, view, load QIBs into table */}
      <GridView />
    </Route>
    <Route path="/plot">
      {/* Visualize QIBs */}
      <PlotView />
    </Route>
    <Route path="/database">
      {/* View and edit various metadata entities */}
      <DBView />
    </Route>
    <Route path="/">
      {/* Default */}
      <GridView />
    </Route>
  </Switch>
);
function App() {
  const savedTheme = localStorage.getItem("theme");
  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(
    savedTheme === "dark" ? true : false
  );
  const theme = darkmode === true ? themeDark : themeLight;
  return (
    <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Router>
          <div className="App" style={{ backgroundColor: theme.background }}>
            <NavigationBar />
            {switches}
          </div>
        </Router>
      </LoadingContext.Provider>
    </DarkmodeContext.Provider>
  );
}

export default App;
