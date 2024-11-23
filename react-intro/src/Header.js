import React from 'react'
import './App.css';
import logo from './Logo.webp';
import profile_button from './Profile_button.png';
import {TfiWrite, TfiUser} from 'react-icons/tfi'

const Header =() => (
    <header className="App-header">
      <div className="main-div-block">
        <div className="inner">
           <div className="logo-group">
            <a href="/">
             <img src={logo} className="App-logo" alt="logo" />
            </a>
            <div className="logo-subgroup">
                <a className="sitename" href="/">
                    <b>Student News</b>
                </a>
                <div className="slogan">Все о чем боялись спросить и не только</div>
                </div>
            </div>
            <div>
                <a href="/drafts">
                 <TfiWrite className="header-button-icon"/>
                </a>
                <a href="/profile">
                 <TfiUser className="header-button-icon"/>
                </a>
            </div>
        </div>
      </div>   
      </header>
);
export default Header;