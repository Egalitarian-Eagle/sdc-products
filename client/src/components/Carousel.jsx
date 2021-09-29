import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

const StyledCarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledCarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`

const StyledCarouselContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const StyledCarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: calc(100% / 4);

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }
`

const arrowStyle = {
  width: '40px',
  height: '40px',
  cursor: 'pointer'
};

const Carousel = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => 0);
  const isOutfit = props.mode === 'Outfit';

  const next = () => {
    if (currentIndex < (isOutfit ? props.products.length - 3 : props.products.length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  }

  return (
    <StyledCarouselContainer>
      <StyledCarouselWrapper>
        {currentIndex > 0 &&
        <span className="arrowbtn arrowbtn-left" style={arrowStyle} onClick={prev} />}
          <StyledCarouselContentWrapper>
            <StyledCarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {props.children}
            </StyledCarouselContent>
          </StyledCarouselContentWrapper>
        {currentIndex < (isOutfit ? props.products.length + 1 : props.products.length) - 4 &&
        <span className="arrowbtn arrowbtn-right" style={arrowStyle} onClick={next} />}
      </StyledCarouselWrapper>
    </StyledCarouselContainer>
  );
}

export default Carousel;