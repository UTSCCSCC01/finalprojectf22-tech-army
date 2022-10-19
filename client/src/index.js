import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import ProfileInfo from './Components/ProfileInfo';
import EditProfile from './Pages/EditProfile';
import Events from './Pages/Events';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Market from './Pages/Market';
import Message from './Pages/Message';
import Signup from './Pages/Signup';
import PostEvent from './Pages/PostEvent';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Login />}/>
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/editProfile" element={<EditProfile/>} />
      <Route path="/signup" exact element={<Signup />}/>
      <Route path="/profile" exact element={<ProfileInfo />}/>
      <Route path="/market" exact element={<Market />}/>
      <Route path="/events" exact element={<Events />}/>
      <Route path="/events/postevent" exact element={<PostEvent />}/>
      <Route path="/message" exact element={<Message />}/>
    </Routes>
  </BrowserRouter>
);