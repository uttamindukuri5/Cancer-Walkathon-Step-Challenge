import React from 'react';

import Navbar from './components/Header/header';
import Register from './components/Register/register';
import RegisterMile from './components/RegisterMile/registerMile';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <section id="content">
        <Register />
        <RegisterMile />
      </section>
    </div>
  );
}

export default App;
