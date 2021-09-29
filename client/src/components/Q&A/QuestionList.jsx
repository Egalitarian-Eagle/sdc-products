import React, { useState } from 'react';
import styled from 'styled-components';
import Question from './Question';

const QuestionItem = styled.div`
  padding: 30px;
  margin-top: 15px
  margin-bottom: 15x;
  border-radius: 10px;
  margin: 20px;
`;

const QuestionList = ({ product_id, questions, searchInput, questionCounter }) => {
  // const [answerCounter, setAnswserCounter] = useState(2)

  return (
    <div className="question-list" role="question-list">
      <div>
        {questions.slice(0, questionCounter)
          .map((question, index) => (
            <QuestionItem className="question-item card" key={index}>
              <div>
                <Question
                  product_id={product_id}
                  question={question}
                  key={question.question_id}
                />
              </div>
            </QuestionItem>
          ))
        }
      </div>
    </div>

  );
}

export default QuestionList;