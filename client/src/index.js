import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './Signup';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import ProfileInfo from './Components/profileInfo';
import Events from './Pages/events';
import Market from './Pages/market';
import Message from './Pages/message';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/" exact element={<Login />}/>
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/signup" exact element={<Signup />}/>
      <Route path="/profile" exact element={<ProfileInfo />}/>
      <Route path="/market" exact element={<Market />}/>
      <Route path="/events" exact element={<Events />}/>
      <Route path="/message" exact element={<Message />}/>
    </Routes>
  </BrowserRouter>
);
