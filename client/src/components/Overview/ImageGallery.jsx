import React, { useState } from "react";
import styled from "styled-components";
import {
  Gallery,
  Carousel,
  Arrow,
  Thumbnails,
  ActiveThumbnail,
  Thumbnail,
} from "./ImageGalleryStyles";
import Modal from "../Modal.jsx";
import ExpandedView from "./ExpandedView";
import './Arrows.styles.css';

export default function ImageGallery({ photos }) {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(() => false);

  const nextPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current + 1);
  };

  const prevPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current - 1);
  };

  const handleThumbnail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(parseInt(e.target.id));
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Gallery
      className="card"
      style={{ marginRight: "50px" }}
      onClick={toggleModal}
      src={photos[current]}
      id="Gallery"
    >
      {isModalOpen ? (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <ExpandedView image={photos[current]} />
        </Modal>
      ) : null}
      <Carousel id="Carousel">
        {current !== 0 ? (
          <span className="arrowbtn arrowbtn-left" onClick={(e) => prevPhoto(e)} />
        ) : (
          <Arrow />
        )}
        <Thumbnails>
          {photos.map((url, index) =>
            index === current ? (
              <ActiveThumbnail key={index} id={index} src={url} />
            ) : (
              <Thumbnail
                key={index}
                id={index}
                src={url}
                onClick={(e) => handleThumbnail(e)}
              />
            )
          )}
        </Thumbnails>
        {current !== photos.length - 1 ? (
          <span className="arrowbtn arrowbtn-right" onClick={(e) => nextPhoto(e)} />
        ) : (
          <Arrow />
        )}
      </Carousel>
    </Gallery>
  );
}
