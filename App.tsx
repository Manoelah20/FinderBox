import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './shared/screens/Home.web';
import Tracking from './shared/screens/Tracking.web';
import About from './shared/screens/About.web';
import AddItem from './shared/screens/AddItem.web';
import Register from './shared/screens/Register.web';
import Login from './shared/screens/Login.web';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/about" element={<About />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
