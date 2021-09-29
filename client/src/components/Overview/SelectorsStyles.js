import styled from 'styled-components';

const Thumbnails = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2%;
`;

const ActiveThumbnail = styled.div`
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
  border: solid pink 4px;
  opacity: 1;
  transition: 0.3s;
`;

const Thumbnail = styled.div`
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
  border: solid 2px;
  opacity: 0.7;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const CartForm = styled.div`
  display: flex;
  gap: 2%;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const Select = styled.select`
  width: 30%;
  height: 35px;
  background: white;
  padding-left: 5px;
  font-size: 14px;
`;

const CartBtn = styled.button`
  text-align: center;
  padding: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

export { Thumbnails, ActiveThumbnail, Thumbnail, CartForm, Select, CartBtn };