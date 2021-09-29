import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Helpful from './Helpful';
import StarsGraphic from './StarsGraphic';
import Images from './Images';

const Review = styled.div`
  // border-bottom: solid black 1px;
  padding-top: 15px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
`;

const PostInfo = styled.span`
  float: right;
  font-size: 80%;
`;

const Recommend = styled.div`
  font-size: 80%;
  text-align: right;
  font-weight: bold;
`

const Response = styled.div`
  padding: 3px 12px 3px 12px;
  margin: 5px 0px 20px 0px;
`;

export default function ReviewsList({sortBy, setSortBy, reviews}) {
  return (
    <>
    {reviews.map(review => (
      <Review className="card" key={review.review_id}>
        <div>
          <StarsGraphic review={review}/>
          <PostInfo>{review.reviewer_name}, {moment(review.date).utc().format('MMMM D, YYYY')}</PostInfo>
        </div>
        <h3>{review.summary}</h3>
        <p>{review.body}</p>
        <Images review={review} />
        {review.recommend
          ? <Recommend>✓ I recommend this product</Recommend>
          : null}
        {review.response
          ? <Response>
              <p><strong>Response:</strong></p>
              <p><em>{review.response}</em></p>
          </Response>
          : null }
          <Helpful review={review} />
      </Review>
    ))}
    </>
  )
}
