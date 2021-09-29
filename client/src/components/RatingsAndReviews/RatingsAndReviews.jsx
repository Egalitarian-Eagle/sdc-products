import React from 'react';
import Ratings from './Ratings/Ratings';
import Reviews from './Reviews/Reviews';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 90%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    flex-direction: column
  }
`

const Title = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 25px;
  padding-left: 20px;
`

const RatingsDiv = styled.div`
  flex: 0 0 20em;
  padding-bottom: 30px;
`;

const ReviewsDiv = styled.div`
  flex: 1 1;
  padding-top: 10px;
`;

export default function RatingsAndReviews({id}) {
  return (
    <>
    <Wrapper id="RatingsAndReviews">
      <RatingsDiv>
        <Ratings id={id}/>
      </RatingsDiv>
      <ReviewsDiv>
        <Reviews id={id}/>
      </ReviewsDiv>
    </Wrapper>
    </>
  )
}