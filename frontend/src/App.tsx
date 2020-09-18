import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Header/header';
import Register from './components/Register/register';
import RegisterMile from './components/RegisterMile/registerMile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <header>
        <Navbar />
      </header>
      <section id="content">
        <Switch>
          <Route path='/register' component={ Register } />
          <Route path='/track' component={ RegisterMile } />
        </Switch>
      </section>
    </div>
    </Router>
  );
}

export default App;
