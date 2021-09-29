import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Button = styled.button`
  font-size: 10px;
  margin: 5px;
  padding; 0px;
`

const SmallFont = styled.div`
  font-size: 14px;
  padding-bottom: 15px;
`

export default function helpful({review}) {

  const [helpfulCount, setCount] = useState(review.helpfulness)

  function handleClick(e) {
    axios.put(`/reviews/${review.review_id}/helpful`, null)
      .then(() => setCount(helpfulCount => helpfulCount + 1))
      .catch(err => console.log(err));
  }

  function handleReport(e) {
    axios.put(`/reviews/${review.review_id}/report`, null)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  return (
    <SmallFont>
      <span>helpful?
        <Button onClick={handleClick}>yes ({helpfulCount})</Button>
        <Button onClick={handleReport}>report</Button>
      </span>
    </SmallFont>
  )
}