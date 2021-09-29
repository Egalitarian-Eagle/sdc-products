import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import Logo from './Logo';

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const typing = keyframes`
  from {
    width: 0
  }
`

const blink = keyframes`
  50% {
    border-color: transparent
  }
`

const StyledTyping = styled.div`
  width: 16ch;
  animation: ${typing} 2s steps(16), ${blink} .5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 4vh;
  transition: 0.3s;

  &:hover {
    color: pink;
    cursor: pointer;
  }
`

const Title = () => {
  return (
    <StyledWrapper>
      <span style={{ color: 'pink', fontFamily: 'monospace', fontSize: '4vh' }}>[</span> <StyledTyping> project catwalk. </StyledTyping><span style={{ color: 'pink', fontFamily: 'monospace', fontSize: '4vh' }}>]</span><Logo /><br/>
    </StyledWrapper>
  )
}

export default Title;