import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  font-weight: bold;
  font-size: 120%
`

export default function SortForm({setSortBy}) {

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  return (
    <Form>
    <label>sort by </label>
    <select onChange= {e => handleSortChange(e)}>
      <option value="relevant">relevance</option>
      <option value="newest">newest</option>
      <option value="helpful">helpfulness</option>
    </select>
    </Form>
  )
}
