import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import styled from 'styled-components';
import { BrowserRouter,Link } from 'react-router-dom';

const Nav=styled.div`
position: relative;
top: 0;
height: 80px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #e2e2e1;
left:0;
border-radius:25px;
gap:20px;
`

ReactDOM.render(
  <Provider store={store}>
    <Nav>
      <BrowserRouter>
      <Link to={'/'}>Dashboard</Link>
      <Link to={'/addsong'}>Songs</Link>
      </BrowserRouter>
    </Nav>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
