import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Loader from './components/Loader';
import Search from './components/Search';
import Spotify from './components/Spotify';
import LoaderV2 from './components/LoaderV2';

const API_URL = process.env.REACT_APP_API_URL



function App() {

  // let { code } = useParams();
  console.log(`API: ${process.env.REACT_APP_API_URL}`)

  return (
    
      <Router>
        <Switch>
            <Route path='/login/' component={Spotify} />
            <Route path=''>
              {/* <LoaderV2></LoaderV2> */}
              {/* <Loader></Loader> */}
              <Search className="App"> API_URL={API_URL}></Search>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
