import React from 'react';
import styled from 'styled-components';
import Istic from './Istic';

export default function Characteristics({characteristics}) {
  return (
    Object.keys(characteristics).map(char => {
      return <Istic key={characteristics[char].id} type={char} value={characteristics[char].value}/>
    })
  );
}