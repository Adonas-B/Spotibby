import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path=""
          render={({ location }) => (
            <Search className="App" location={location}></Search>
          )}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
