import React, {useState} from 'react';
import styled from 'styled-components';
import NewReviewForm from './NewReviewForm'

const Wrapper = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 33.5%;
`

const Button = styled.button`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
`

const ReviewWrapper = styled.div`
  padding: 30px;
`

export default function({reviews, setReviews, moreReviews, sortBy, getMore, id}) {

  const [showForm, setShowForm] = useState(false);

  function moreReviewsClick(e) {
    getMore();
  }

  function toggleForm(e) {
    setShowForm(!showForm);
  }

  return (
    <>
    <Wrapper>
      {moreReviews
      ? <Button onClick={moreReviewsClick}><strong>more reviews</strong></Button>
      : null}
      <Button onClick={toggleForm} ><strong>add review +</strong></Button>
      {showForm
      ? <NewReviewForm id={id}/>
      : null}
    </Wrapper>
    </>
  )
}