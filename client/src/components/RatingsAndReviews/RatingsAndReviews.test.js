import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';
import {sampleReviews, sampleReview} from './sampleReviews';
import sampleRatings from './sampleRatings'
import RatingsAndReviews from './RatingsAndReviews'
import Reviews from './Reviews/Reviews';
import Ratings from './Ratings/Ratings';
import Helpful from './Reviews/Helpful';
import ChartRating from './Ratings/ChartRating'
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('Ratings And Reviews', () => {

  afterEach(cleanup);

  it('should render Ratings and Reviews component', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<RatingsAndReviews id={48444}/>, div)
  });

  it('should render Reviews component', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Reviews id={48444}/>, div)
  });

  it('should render Ratings component', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Ratings id={48444}/>, div)
  });

  it('should render helpful in reviews', async () => {
    const { getByText } = render(<Helpful review={sampleReview}/>);
    expect(getByText(/Helpful?/i)).toBeInTheDocument();
  });

  it('should render stars in chart ratings', async () => {
    const { getByText } = render(<ChartRating ratings={sampleRatings}/>);
    expect(getByText(/5 Stars/i)).toBeInTheDocument();
  });
});



