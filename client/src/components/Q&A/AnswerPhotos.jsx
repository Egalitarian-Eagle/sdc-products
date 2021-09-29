import React, { useState } from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
  opacity: 0.7;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`

const AnswerPhotos = ( { answer } ) => {
  const [largerImage, setLargerImage] = useState(false);
  const [curImage, setCurImage] = useState(null);

  const handleImageClick = (e) => {
    setCurImage(e.target.src);
    setLargerImage(!largerImage);
  }

  const answerPhotoModal = (
    <div onClick={handleImageClick}>
      <img src={curImage} onClick={e => e.stopProgation()} />
    </div>
  );

  return (
    <div className="answer-photos">
      {answer.photos.map( (photo, index) => {
        return (
          <span className="photo" key={index}>
            <StyledImg
              onClick={handleImageClick}
              src={photo}
              style={{margin: "5px"}}
              height='75px'
            />
          </span>
        )
      })}
      {largerImage
      ? answerPhotoModal
      : null }
    </div>
  )
};

export default AnswerPhotos;