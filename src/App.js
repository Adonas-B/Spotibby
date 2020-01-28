import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter,
  useLocation
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Loader from './components/Loader';
import Search from './components/Search';
import Spotify from './components/Spotify';

const API_URL = process.env.REACT_APP_API_URL



function App() {

  // let { code } = useParams();
  console.log(`API: ${process.env.REACT_APP_API_URL}`)

  return (
    
      <Router>
        <Switch>
            <Route path='/login/' component={Spotify}>
                {/* <h1 style={{color:'white'}}>Hello</h1> */}
            </Route>
            {/* <Route path='/authorise/:code'> */}
            <Route path='/authorise/' component={Spotify}>
                {/* <h1 style={{color:'white'}}>Hello</h1> */}
            </Route>
            <Route path=''>
            
              {/* <Loader></Loader> */}
              <Search className="App"> API_URL={API_URL}></Search>
            
            </Route>
        </Switch>
      </Router>
  );
}

function Test() {
  let { code } = useParams();
  let { query_params } = useLocation();
  // console.log(this.props.location.search)
  console.log(query_params)
  console.log(code)
  return<h1 style={{color:'white'}}>{code}</h1>;
}

export default App;
