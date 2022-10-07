import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = (props) => {
  return (
    <>
      <Nav className='Navbar'>
        
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

