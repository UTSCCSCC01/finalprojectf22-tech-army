import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './login_pages/Signup';
import './index.css';
import Login from './login_pages/Login';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import About from './pages/about';
import Events from './pages/events';
import Market from './pages/market';
import Message from './pages/message';
import Settings from './pages/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/signup" exact element={<Signup />}/>
      <Route path="/about" exact element={<About />}/>
      <Route path="/market" exact element={<Market />}/>
      <Route path="/events" exact element={<Events />}/>
      <Route path="/message" exact element={<Message />}/>
      <Route path="/settings" exact element={<Settings />}/>
    </Routes>
  </BrowserRouter>
);
