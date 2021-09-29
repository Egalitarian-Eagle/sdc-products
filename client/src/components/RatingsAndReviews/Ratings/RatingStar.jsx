import React from 'react';
import styled from 'styled-components';

const Rating = styled.div`
  font-size: 40px;
  display: inline;
`

const Total = styled.div`
  font-size: 80%;
  display: block;
`

const Filled = styled.span`
`

const Empty = styled.span`
`

export default function RatingStar({ratings, mode}) {
  function getAverage(ratings) {
    let total = 0;
    let count = 0;
    for (let k in ratings) {
      total += (Number(k) * Number(ratings[k]))
      count += Number(ratings[k])
    }
    return [total, total / count];
  }

  const [total, average] = getAverage(ratings);

  let isProductCard = mode === 'ProductCard';

  return (
    <>
      {isProductCard ?
        <span>
          <span className='filled'>{'★'.repeat(Math.round(average))}</span><span className='empty'>{'★'.repeat(5 - Math.round(average))}</span>
        </span>
      : <div>
        <Rating>{Math.round(average * 10) / 10}  </Rating>
        <span><span className='filled'>{'★'.repeat(Math.round(average))}</span><span className='empty'>{'★'.repeat(5 - Math.round(average))}</span>
        <Total><strong>{total}</strong> ratings</Total>
        </span>
      </div>}
    </>
  )
}