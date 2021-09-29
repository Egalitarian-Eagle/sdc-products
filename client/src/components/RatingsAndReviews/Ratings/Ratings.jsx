import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RatingStar from './RatingStar';
import ChartRating from './ChartRating';
import Characteristics from './Characteristics'

const Wrapper = styled.div`
  padding-right: 40px;
`

export default function Ratings({id}) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    axios.get(`/reviews/meta?product_id=${id}`)
      .then(res => setMeta(res.data))
      .catch(err => console.log(err));
  }, [id])

  function getRecommended(meta) {
    let t = Number(meta.recommended.true);
    let f = Number(meta.recommended.false);
    return Math.round(((t / (t + f)) * 100));
  }

  return (
    meta !== null && Object.keys(meta.ratings).length !== 0)
      ? <Wrapper>
          <RatingStar ratings={meta.ratings}/>
          <br></br>
          <div>
            <strong>{getRecommended(meta)}%</strong>
            <span> of reviews recommend this product</span>
          </div>
          <br></br>
          <ChartRating ratings={meta.ratings}/>
          <Characteristics characteristics={meta.characteristics}/>
        </Wrapper>
      : null;
}
