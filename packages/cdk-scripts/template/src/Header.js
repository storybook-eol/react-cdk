import React from 'react';
import logo from './logo.svg';
import './App.css';

const Header = ({title}) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">{title}</h1>
  </header>
);

export default Header;
