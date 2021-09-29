import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from 'styled-components';
import ReactDom from "react-dom";
import { MdClose } from 'react-icons/md';
import {useSpring, animated} from 'react-spring';

const modalRoot = document.getElementById("modal-root");

const Background = styled.div`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  max-height: 80vh;
  overflow: scroll;
  padding: 60px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #f0f0f0;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  background-image: url("https://i.imgur.com/z3S1BY4.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 10%;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  transition: 0.3s;

  &:hover {
    color: pink;
  }
`;

const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0%)` : `translateY(-100%)`
  });

  const handleClick = e => {
    e.stopPropagation();
    setIsModalOpen();
  };

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  };

  const keyPress = useCallback(e => {
    if (e.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [setIsModalOpen, isModalOpen])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return ReactDom.createPortal(
    <>
    {isModalOpen ? (
      <Background ref={modalRef} onClick={closeModal}>
        <animated.div style={animation}>
          <ModalWrapper isModalOpen={isModalOpen}>
            <ModalContent>
              {children}
            </ModalContent>
            <CloseModalButton aria-label='Close modal' onClick={() => setIsModalOpen(prevState => !prevState)} />
          </ModalWrapper>
        </animated.div>
      </Background>
    ) : null}
    </>,
    modalRoot
  );
}

export default Modal;
