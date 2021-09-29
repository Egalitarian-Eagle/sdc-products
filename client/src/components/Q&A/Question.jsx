import React, { useState }from 'react';
import styled from 'styled-components';
import QuestionHelpful from './QuestionHelpful';
import Answer from './Answer';
import AddAnswerModal from './AddAnswerModal';
import Modal from '../Modal';

const MoreAnswerBtn = styled.div`
  text-decoration: underline;
  cursor: pointer;
  padding-left: 10px;
  margin: 10px;
  opacity: 0.7;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const QContainer = styled.div`
  color: #7F7C82;
  font-size: 14px;
  margin: 5px;
  float: right;
`;

const addAnswerStyle =  {
  margin: "5px",
  cursor: "pointer",
  float: "right",
}


const Question = ({ question }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [QHelpfulness, setQHelpfulness] = useState(question.question_helpfulness);
  const [answerCounter, setAnswserCounter] = useState(2)

  const answerKey = Object.keys(question.answers);
  const answerList = answerKey.map(key => question.answers[key]);

  return (
    <div role="question-obj" className={question}>
      <QContainer>
        <QuestionHelpful
          questionId={question.question_id}
          helpfulness={QHelpfulness}
        />
        <button style={addAnswerStyle} onClick={() => setIsModalOpen(true)}>add answer</button>
      </QContainer>
      <h3>
        Q: {question.question_body}
      </h3>
      <div className="answer-list" data-testid="answer-list">
        {answerList
          .sort((a, b) => (b.helpfulness - a.helpfulness))
          .slice(0, answerCounter)
          .map(answer => (
            <Answer
            answerObj={answer}
            key={answer.id}
            />
            ))}
      </div>
      {answerList.length > 2 && answerList.length > answerCounter
      ? <MoreAnswerBtn
          role="more-answer-btn"
          className="load-more-answer-btn"
          onClick={() => {setAnswserCounter( answerCounter + 2)}}
        >
        <strong>more answers</strong>
        </MoreAnswerBtn>
      : answerList.length <= answerCounter && answerList.length > 2
      ?
        <MoreAnswerBtn
        role="more-answer-btn"
        className="load-more-answer-btn"
        onClick={() => {setAnswserCounter(2)}}
        >
          <strong>collapse answers</strong>
        </MoreAnswerBtn>
      : null }
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <AddAnswerModal
            questionId={question.question_id}
            isPopup={isModalOpen}
            onClose={() => {setIsModalOpen(false)}}
          />
        </Modal>
      )}
    </div>

  )
}

export default Question;