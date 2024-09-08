import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import styled from 'styled-components';
import { BrowserRouter, NavLink } from 'react-router-dom';

const Nav = styled.div`
  position: fixed;
  margin:10px;
  top: 0;
  height: 80px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: blue;
  left: 0;
  border-radius: 5px;
  color: white;
  gap: 20px;
  z-index:999;
`;

const Logo = styled.img`
  height: 60px; 
  margin-right: 20px; 
  position: fixed;
  margin-left:20px;
  left: 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white; // Default link color

  &.active {
    font-weight: bold; // Style for active link
    color: yellow; // Active link color
  }
`;

const Body = styled.div`
position: relative;
margin-top:80px;

`

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Nav>
        <Logo src={'https://upload.wikimedia.org/wikipedia/commons/4/4d/Music_logo.png'} alt="Logo" />
        <StyledNavLink to="/" end>Dashboard</StyledNavLink>
        <StyledNavLink to="/addsong">Songs</StyledNavLink>
      </Nav>
      <Body>
      <App />
      </Body>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
