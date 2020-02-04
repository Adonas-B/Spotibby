import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Search from './components/Search';

const API_URL = process.env.REACT_APP_API_URL



function App() {

  // let { code } = useParams();
  console.log(`API: ${process.env.REACT_APP_API_URL}`)

  return (
    
      <Router>
        <Switch>
            <Route path='/login/' />
            <Route path=''>
              <Search className="App"> API_URL={API_URL}></Search>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
