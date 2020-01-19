import React from 'react';
import logo from './logo.svg';
import './App.css';
import Loader from './components/Loader';
import Search from './components/Search';

const API_URL = process.env.REACT_APP_API_URL

function App() {
  return (
    <div className="App">
      {/* <Loader></Loader> */}
      <Search API_URL={API_URL}></Search>
    </div>
  );
}

export default App;
