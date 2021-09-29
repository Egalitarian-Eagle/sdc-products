import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import AnswerPhotos from './AnswerPhotos';

const beforeClickedStyle = {
  textDecoration: "underline",
  cursor: "pointer"
}

const afterClickedStyle = {
  fontWeight: "bold",
  cursor: "pointer"
}

const AContainer = styled.div`
  font-size: 14px;
  color: #7F7C82
`;

const Answer = ({ answerObj }) => {
  const [aHelpfulness, setAHelpfulness] = useState(answerObj.helpfulness);
  const [helpfulSubmit, setHelpfulSubmit] = useState(false);

  const handAHelpfulClick = (e) => {
    if (!helpfulSubmit) {
      axios.put(`/qa/answers/${answerObj.id}/helpful`)
      .then(setAHelpfulness(aHelpfulness + 1))
      .catch(console.log)
    }
    setHelpfulSubmit(true);
  }

  return (
    <div  data-testid="answer" className="answer-item">
      <h4>
        <strong>A: </strong>{answerObj.body}
      </h4>
      <AContainer>
      <span >by {answerObj.answerer_name},  {moment(answerObj.date).utc().format('MMMM D, YYYY')} <span> | </span></span>
      <span> helpful? </span>
      {helpfulSubmit
        ? <span className="answer-helpfulness" style={afterClickedStyle} onClick={handAHelpfulClick}> yes({aHelpfulness})</span>
        : <span className="answer-helpfulness" style={beforeClickedStyle} onClick={handAHelpfulClick}> yes({aHelpfulness}) </span>}
      {answerObj.photos.length ? <AnswerPhotos answer={answerObj}/> : null}
      </AContainer>
    </div>
  );
};


export default Answer;