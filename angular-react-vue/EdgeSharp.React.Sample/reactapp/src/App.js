import React from "react";
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import TmdbMovies from './components/TmdbMovies'

export default function App() {
  const ipcHostObject  = 'hostobject';
  const ipcHttpClient  = 'httpclient';
  const ipcPostMessage = 'postmessage';

  const [ipcoption, setIpcoption] = useState('');

  const changeIpcOption = (ipcoption) => {
    console.log(ipcoption);
    window.$ipcoption = ipcoption;
    setIpcoption(window.$ipcoption); 
  };

  useEffect(() => {
    setIpcoption(window.$ipcoption); 
  }, []);

  return (
    <Router>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container">
                  <a className="navbar-brand" href="#">EdgeSharp</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to={'/'} className="nav-link">home</Link></li>
                        <li className="nav-item"><Link to={'/tmdbmovies'} className="nav-link">tmdb movies</Link></li>
                        <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">ipc options</a>
                              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#" onClick={() => changeIpcOption(ipcHostObject)}><input name="ipcoption" type="radio" checked={ipcoption === 'hostobject'} /><span> host object</span></a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => changeIpcOption(ipcHttpClient)}><input name="ipcoption" type="radio" checked={ipcoption === 'httpclient'} /><span> http client</span></a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => changeIpcOption(ipcPostMessage)}><input name="ipcoption" type="radio" checked={ipcoption === 'postmessage'} /><span> post message</span></a></li>
                              </ul>
                          </li>
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">exit</a>
                              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                  <li><a className="dropdown-item" href="http://edgesharp.com/reload">reload</a></li>
                                   <li><a className="dropdown-item" href="http://edgesharp.com/exit">exit</a></li>
                              </ul>
                      </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </header>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tmdbmovies">
            <TmdbMovies />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
