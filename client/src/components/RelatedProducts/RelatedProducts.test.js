import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from './RelatedProducts';
import { SharedContext } from '../../contexts/SharedContext';

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <SharedContext.Provider {...providerProps}>{ui}</SharedContext.Provider>,
    renderOptions,
  )
}

describe('RelatedProducts', () => {

  afterEach(cleanup);

  it('should render with expected text', () => {
    const { getByText } = render(<RelatedProducts />);
    expect(getByText(/Related Products/i)).toBeInTheDocument();
  });
});