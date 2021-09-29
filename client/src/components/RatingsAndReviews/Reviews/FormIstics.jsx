import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Characteristic = styled.div`
`

export default function FormIstics({istics, onChange}) {

  const attributes = {
    Fit: ['Too small', 'Small', 'Perfect', 'Large', 'Too large'],
    Length: ['Too short', 'Short', 'Perfect', 'Long', 'Too long'],
    Comfort: ['Poor', 'Below Average', 'Okay', 'Above average', 'Perfect'],
    Quality: ['Poor', 'Below average', 'Okay', 'Above average', 'Perfect'],
    Size: ['Too small', 'Small', 'Perfect', 'Large', 'Too large'],
    Width: ['Too narrow', 'Narrow', 'Perfect', 'Wide', 'Too wide']
  }

  return (
    <div>
    {Object.keys(istics).map(istic => (
      <Characteristic key={istics[istic].id}>
        <label htmlFor="istic">
          {istic}:
        </label>
        <select onChange={onChange} id={istics[istic].id} name={istic} defaultValue="empty" required>
          <option id ="empty" value="" isdisabled="true">
            Select your option
          </option>
          {attributes[istic].map((attr, idx) => (
            <option id={idx} key={attr} value={idx}>
              {attr}
            </option>
          ))}
        </select>
      </Characteristic>
    ))}
    </div>
  )
}