import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  font-size: 20px;
  box-sizing: border-box;
  width: 70%;
  border: solid #000000 2px;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 10px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &:focus{
    outline: none;
  }
`;

const Search = ({ searchInput, handleSearchInput }) => {
  return (
    <div className="qa-search" style={{ textAlign: 'center' }}>
      <form
        onChange={e => handleSearchInput(e.target.value)}
        className="qa-search-form"
      >
        <Input
          className="qa-search-bar"
          placeholder="Search Your Question Here"
          results="0"
        />
      </form>
    </div>
  );
};

export default Search;