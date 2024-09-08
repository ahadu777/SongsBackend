import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import styled from 'styled-components';
import { BrowserRouter, NavLink } from 'react-router-dom';

const Nav = styled.div`
  position: relative;
  top: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e1;
  left: 0;
  border-radius: 25px;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black; // Default link color

  &.active {
    font-weight: bold; // Style for active link
    color: blue; // Active link color
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Nav>
        <StyledNavLink to="/" end>Dashboard</StyledNavLink>
        <StyledNavLink to="/addsong">Songs</StyledNavLink>
      </Nav>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
