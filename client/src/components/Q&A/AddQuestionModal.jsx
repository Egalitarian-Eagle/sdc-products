import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SmallHeader = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 15px;
`;

const StyledTextarea = styled.textarea`
  display: block;
  margin-right: auto;
  margin-left: auto;
  font-size: 18px;
  width:500px;
  height: 180px;
  border-radius: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  margin-right: auto;
  margin-left: auto;
  font-size: 18px;
  width: 500px;
  height: 30px;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  display: block;
  margin-right: auto;
  margin-left: auto;
  width: 500px;
  height: 36px;
  font-size: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const AddQuestionModal = ({ open, onClose, product_id }) => {
  const [questionBody, setQuestionBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validationCheck()) {
      const newQObj = {
        body: questionBody,
        name: nickname,
        email: email,
        product_id: product_id
      };
      axios.post(`/qa/questions`, newQObj)
        .then((res) => {
          console.log(res)
        })
        .catch(console.log)
      onClose();
    }
  }

  // check validation before submit
  const validationCheck = () => {
    if (!questionBody) {
      alert('Please Provide Your Question');
    } else if (!nickname) {
      alert('Please Provide Your Nickname')
    } else if (!email) {
      alert('Please Provide Your Email')
    } else {
      return true;
    }
  }

  return (
    <div className="add-question-modal">
      <h1 className="form-header" style={{textAlign: "center"}}>
        Ask Your Question
      </h1>
      <form
        className="add-question-form"
        onSubmit={handleFormSubmit}
      >
        <SmallHeader className="question-text">
          <strong>Your Question</strong><span className="req-star">*</span>
        </SmallHeader>
        <StyledTextarea
          className="question-body"
          placeholder="Let us know what is your question..."
          value={questionBody}
          maxLength="1000"
          onChange={(e) => {setQuestionBody(e.target.value)}}
          >
        </StyledTextarea>
        <SmallHeader className="nickname-text">
          <strong>Your Nickname</strong><span className="req-star">*</span>
        </SmallHeader>
        <Input
          className="nickname-body"
          type="text"
          vlaue={nickname}
          placeholder="Exaple:jackson11!"
          onChange={(e) => setNickname(e.target.value)}
        />
        <SmallHeader className="email-text">
          <strong>Your Email</strong><span className="req-star">*</span>
        </SmallHeader>
        <Input
          className="email-body"
          type="text"
          vlaue={email}
          placeholder="Why did you like the product or not?"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
};

export default AddQuestionModal;