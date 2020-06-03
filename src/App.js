import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Spotibby from './components/Spotibby/Spotibby';

function App() {
  return (
      <Router>
        <Switch>
            <Route path='' render={({location}) => (
              <Spotibby className="App" location={location}></Spotibby>
            )
            }>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
