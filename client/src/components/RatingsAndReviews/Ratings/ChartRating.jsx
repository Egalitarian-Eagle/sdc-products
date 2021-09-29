import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 10px;
`

const OuterBar = styled.div`
  width: 100%;
  /* background-color: #dedede; */
`;

const InnerBar = styled.div`
  padding-top: 3px;
  padding-bottom: 3px;
  width: ${props => props.size};
  /* background-color: black; */
`;

export default function ChartRating({ratings}) {

  function getPercent(ratings, rate) {
    let max = 0;
    for (let k in ratings) {
      let count = Number(ratings[k])
      if (count > max) {
        max = count
      }
    }
    return String(Math.round((ratings[rate] || 0) / max * 100)) + '%'
  }

  return (
      ['5', '4', '3', '2', '1'].map(star => (
        <Container key={star}>
        {star} Stars
          <OuterBar className= 'outer'>
            <InnerBar className='inner' size={getPercent(ratings, star)}></InnerBar>
          </OuterBar>
        </Container>
      ))
  )
}
