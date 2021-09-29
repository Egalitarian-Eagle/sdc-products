import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

const StyledLogo = styled.img`
  height: 15vh;
  opacity: 1;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`

const Logo = () => (
  <StyledLogo src='https://i.imgur.com/aFFGxsf.gif' />
)

export default Logo;
