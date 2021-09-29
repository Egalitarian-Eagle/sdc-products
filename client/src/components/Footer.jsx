import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const typing = keyframes`
  from {
    width: 0
  }
`

const StyledTyping = styled.a`
  width: 20ch;
  animation: ${typing} 2s steps(20);
  white-space: nowrap;
  overflow: hidden;
  font-family: monospace;
  font-size: 2vh;
  transition: 0.3s;
  opacity: 1;

  &:hover {
    color: pink;
    cursor: pointer;
  }
`

const Footer = () => {
  return (
    <StyledWrapper>
      <span style={{ color: 'pink', fontFamily: 'monospace', fontSize: '4vh' }}>[</span> <StyledTyping href='https://github.com/marvelous-maitake'>© marvelous maitake.</StyledTyping><span style={{ color: 'pink', fontFamily: 'monospace', fontSize: '4vh' }}>]</span>
    </StyledWrapper>
  )
}

export default Footer;