import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink>
          <img style={{ width: 160, height: 70 }} src={require('../images/logo.png')} alt="logo"/>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/market' activeStyle>
            Market
          </NavLink>
          <NavLink to='/events' activeStyle>
            Events
          </NavLink>
          <NavLink to='/message' activeStyle>
            Message
          </NavLink>
          <NavLink to='/settings' activeStyle>
            Settings
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/logout'>Log Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;

