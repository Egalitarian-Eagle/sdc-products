import React, { useState, useEffect, useContext } from 'react';
import { SharedContext } from '../../contexts/SharedContext';
import styled from 'styled-components';
import axios from 'axios';
import Carousel from '../Carousel';
import ProductCard from '../ProductCard';

const Outfit = () => {
  const { productId, setProductId, currentOutfit, setCurrentOutfit } = useContext(SharedContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => 0);

  const next = () => {
    if (currentIndex < (currentOutfit.length - 4)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  }

  useEffect(() => {
    setCurrentIndex(0);
    setIsLoaded(true);
  }, [currentOutfit]);

  return (
    <div>
      {isLoaded ? <Carousel products={currentOutfit} mode='Outfit'>
        <ProductCard product_id='addToOutfit' mode='Outfit'/>
        {currentOutfit.map((product) => (
          <ProductCard key={product} product_id={product} mode='Outfit'/>
        ))}
      </Carousel> : <img src='https://i.imgur.com/7sMnF66.gif' />}
    </div>
  )
}

export default Outfit;