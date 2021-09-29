import React, { useState } from 'react';
import { Thumbnails, ActiveThumbnail, Thumbnail, CartForm, Select, CartBtn } from './SelectorsStyles.js';

function Selectors({thumbnails, setCurrStyle, style, currStyle}) {

  const [maxQuantity, setMaxQuantity] = useState(null);
  const [quantity, setQuantity] = useState('-');
  const [size, setSize] = useState(null);

  const handleSize = (e) => {
    e.preventDefault();
    let [s, q] = e.target.value.split(' ');
    if (parseInt(q) < 15) {
      q = Array.from(Array(parseInt(q) + 1).keys()).slice(1);
    } else {
      q = Array.from(Array(16).keys()).slice(1)
    }
    setMaxQuantity(q);
    setSize(s);
  }

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    setSize(null);
    setQuantity(null);
    setMaxQuantity(null);
    setCurrStyle(parseInt(e.target.id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //Add in add to cart functionality, need to talk to Crystal
  }

  return (
    <div id='Selectors'>
      {style.sale_price !== null ?
      (<p><strong style={{color: 'red'}}>${style.sale_price}</strong> <strike>${style.original_price}</strike></p>) :
      (<p>${style.original_price}</p>) }
       <p><strong>Style {'>'}</strong> {style.name}</p>
      <Thumbnails>
        {thumbnails.map((url, index) => (
          index === currStyle ?
          (<ActiveThumbnail key={index} id={index} src={url}/>) :
          (<Thumbnail key={index} id={index} src={url} onClick={(e) => handleThumbnailClick(e)}/>)
        ))}
      </Thumbnails>
      <CartForm onSubmit={(e) => handleSubmit(e)}>
        <Select id='sizeSelect' onChange={(e) => handleSize(e)} required>
          <option value="">select size</option>
          {Object.entries(style.skus).map(([k, sku]) =>
            <option value={sku.size + ' ' + sku.quantity} key={k}>{sku.size}</option>
          )}
        </Select>
        {size === null ?
        <Select><option>-</option></Select> :
        <Select onChange={(e) => setQuantity(e.target.value)} required>
          {maxQuantity.map((x, i) => {
            return(<option value={x} key={x}>{x}</option>);
          })}
        </Select>
        }
        <CartBtn type='submit'><strong>add to cart +</strong></CartBtn>
      </CartForm>
    </div>
  )
}

export default Selectors;
