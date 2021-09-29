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


const AddAnswerModal = ({ isPopup, onClose, questionId }) => {
  const [answerBody, setAnswerBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const photolinks = photoUrl.split(',').map(link => link.trim()) || []
    if (validationCheck()) {
      const newAnswer = {
        body: answerBody,
        name: nickname,
        email: email,
        photos: photolinks
      };
      axios.post(`/qa/questions/${questionId}/answers`, newAnswer)
      .then((res) => {
        console.log('new answer was sent to API:', res.data)
      })
      .catch(console.log)
      onClose();
    }
  }

  // check validation before submit
  const validationCheck = () => {
    if (!answerBody) {
      alert('Please Provide Your Answer');
      return false;
    } else if (!nickname) {
      alert('Please Provide Your Nickname')
      return false;
    } else if (!email) {
      alert('Please Provide Your Email')
      return false
    } else {
      return true;
    }
  }

  if (!isPopup) return null;
  return (
    <div>
      <div className="add-answer-modal">
        <h1 className="form-header" style={{textAlign: "center"}}>
          submit your answer
        </h1>
        <form
          className="add-answer-form"
          onSubmit={handleFormSubmit}
        >
          <SmallHeader className="answer-text">
            <strong>Your Answer</strong><span className="req-star">*</span>
          </SmallHeader>
          <StyledTextarea
            className="answer-body"
            value={answerBody}
            maxLength="1000"
            onChange={(e) => setAnswerBody(e.target.value)}
            placeholder="Put your answer here"
          >
          </StyledTextarea>
          <SmallHeader className="nickname-text">
            <strong>Your Nickname</strong><span className="req-star">*</span>
          </SmallHeader>
          <Input
              className="nickname-body"
              type="text"
              vlaue={nickname}
              placeholder="Example:jackson11!"
              onChange={(e) => {setNickname(e.target.value)}}
            />
          <SmallHeader className="email-text">
            <strong>Your Email</strong><span className="req-star">*</span>
          </SmallHeader>
          <Input
              className="email-body"
              type="text"
              vlaue={email}
              placeholder="Why did you like the product or not"
              onChange={(e) => {setEmail(e.target.value)}}
            />
          <SmallHeader className="photo-text">
            <strong>Your Photos</strong>
          </SmallHeader>
          <StyledTextarea
            className="photo-body"
            type="text"
            vlaue={photoUrl}
            placeholder="Add photo links here and separate links with ','"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <div>
            <Button role="add-answer-btn" type="submit">Submit Answer</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnswerModal;
