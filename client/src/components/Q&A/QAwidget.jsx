import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Search from './Search';
import QuestionList from './QuestionList';
import Modal from '../Modal';
import AddQuestionModal from './AddQuestionModal';

const buttonStyle = {
  textAlign:"center",
  padding: "10px",
  cursor: "pointer",
  marginTop: "10px",
  marginRight: "10px",
  marginBottom: "15px",
}

const QuestionAndAnswer = styled.div`
`;

const Buttons = styled.div`
  padding-bottom: 10px;
`;


const QAwidget = ( { product_id } ) => {

  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [questionCounter, setQuestionCounter] = useState(2);
  const [questionsToView, setQuestionsToView] = useState([])
  const [isAddQModalOpen, setIsAddQModalOpen] = useState(false);


  useEffect(() => {
    axios.get(`/qa/questions?product_id=${product_id}&page=1&count=99`)
      .then((response) => {
        setQuestions(response.data.results.sort((a, b) => (a.helpness - b.helpness)))
        setQuestionsToView(response.data.results.sort((a, b) => (a.helpness - b.helpness)))
      })
      .catch(console.log)
  }, [product_id])

  // handle search input
  const handleSearchInput = (searchInput) => {
    if (searchInput.length >= 3) {
      setSearchInput(searchInput);

    } else {
      setSearchInput('')
    }
    filterQList(searchInput);
  }

  // filter qustion list
  const filterQList = (searchInput) => {
    if (searchInput) {
      const newQlist = questions.filter( qObj => {
        if (qObj.question_body.toLowerCase().includes(searchInput.toLowerCase())) {
          return qObj
        };
      });
      setQuestionsToView(newQlist);
    } else {
      setQuestionsToView(questions)
      setQuestionCounter(2)
    }
  }

  // Add-question modal on submit
  const handleQModalSubmit = () => {
    setAddQuestion(false)
  }

  // handle "SHOW MORE QUESTIONS" button
  const handleQuestionBtn = (e) => {
    if (questionCounter === questions.length) {
      setQuestionCounter(2)
    } else {
      setQuestionCounter(questionCounter + 2)
    }
  }



  return (
    <QuestionAndAnswer>
      <div>
        <Search
          handleSearchInput={handleSearchInput}
          searchInput={searchInput}
        />
      </div>
      <QuestionList
        product_id={product_id}
        searchInput={searchInput}
        questions={questionsToView}
        questionCounter={questionCounter}
      />
      <Buttons style={{ textAlign: 'center' }}>
        {questionCounter >= questions.length
          ? <button
              style={buttonStyle}
              data-testid="more-questions-btn"
              className="load-more-questions-btn"
              onClick={() => {setQuestionCounter(2)}}
            >
              <strong>collapse questions</strong>
            </button>
          : <button
              style={buttonStyle}
              data-testid="more-questions-btn"
              className="load-more-questions-btn"
              onClick={() => {handleQuestionBtn()}}
            >
              <strong>more questions</strong>
            </button>
        }
        <button
          style={buttonStyle}
          className="add-question-btn"
          onClick={(e) => setIsAddQModalOpen(true)}
        >
          <strong>
            add a question +
          </strong>
        </button>
      </Buttons>
      {isAddQModalOpen && (
        <Modal isModalOpen={isAddQModalOpen} setIsModalOpen={setIsAddQModalOpen}>
          <AddQuestionModal
            product_id={product_id}
            open={isAddQModalOpen}
            onClose={() => {setIsAddQModalOpen(false)}}
          />
        </Modal>
      )}
    </QuestionAndAnswer>

  )
}

export default QAwidget;