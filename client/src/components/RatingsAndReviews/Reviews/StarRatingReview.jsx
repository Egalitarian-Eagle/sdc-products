import React from 'react';
import styled from 'styled-components';

export default function StarRatingReview({onChange}) {
  return (
    <>
      <label htmlFor="star">Rating: </label>
      <select onChange={(e) => onChange(Number(e.target.value))} id="star" name="rating" defaultValue="empty" required>
        <option id="empty" value='' isdisabled="true">#</option>
        <option value='5'>5</option>
        <option value='4'>4</option>
        <option value='3'>3</option>
        <option value='2'>2</option>
        <option value='1'>1</option>
      </select>
    </>
  )
}