import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Logo from './Logo';
import Toggle from "react-toggle";

import './Search.styles.css';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  z-index: 12;
  align-items: center;
  padding: 1%;
  position: sticky;
	top: 0;
`;

const StyledMonkey = styled.div`
  font-size: 5vh;
  cursor: pointer;
  transition: 0.3s;
  text-align: right;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

function Navbar({ theme, toggleTheme, searchFunc }) {

  const [search, setSearch] = useState('');

  const searchProduct = async () => {
    const prod = await axios.get(`/products/${search}`);
    if (typeof prod.data === 'string') {
      alert('Invalid Product_id!');
      return;
    }
    searchFunc(search);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('search').value = '';
      searchProduct();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const isDarkTheme = theme === 'dark';

  return (
    <Nav>
      <Title />
      {isDarkTheme ? <StyledMonkey onClick={toggleTheme}>🐵</StyledMonkey> : <StyledMonkey onClick={toggleTheme}>🙈</StyledMonkey>}
        <div className="box">
          <input type="text" className="input" name="txt" id="search" placeholder="enter id..."
          onMouseOut={() => document.getElementById('search').value = ''} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
          <i className="fas fa-search"></i>
        </div>
    </Nav>
  );
}

export default Navbar