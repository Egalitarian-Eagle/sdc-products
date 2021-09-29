import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sample from './SampleData.js';
import Search from '../Search.jsx';
import QAwidget from '../QAwidget.jsx';
import Answer from '../Answer.jsx';
import Question from '../Question.jsx';
import QuestionList from '../QuestionList.jsx';
import AddQuestionModal from '../AddQuestionModal.jsx';
import AddAnswerModal from '../AddAnswerModal.jsx';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { SharedContext } from '../../../contexts/SharedContext';

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <NameContext.Provider {...providerProps}>{ui}</NameContext.Provider>,
    renderOptions,
  )
}


describe('Questions&Answers', () => {

  afterEach(cleanup);

  test('should render Q&A component', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<QAwidget product_id={sample.questions.product_id}/>, div)
  });

  test('should render Search component by placeholder text', async () => {
    const { getByPlaceholderText } = render(<Search />);
    expect(getByPlaceholderText(/Search Your Question Here/i)).toBeInTheDocument();
  });

  test('should render AddQuestionModal component with expected text', async () => {
    const { getByText } = render(<AddQuestionModal open={true} />);
    expect(getByText(/Ask Your Question/i)).toBeInTheDocument();
  });

  test('should render AddAnswerModal component with expected text', async () => {
    const { getByText } = render(<AddAnswerModal isPopup={true} />);
    expect(getByText(/Submit Your Answer/i)).toBeInTheDocument();
  });

  test('should render Question component with expected role', async () => {
    const { getByRole } = render(<Question question={sample.questions.results[0]} />);
    expect(getByRole(/question-Obj/i)).toBeInTheDocument();
  });

  xit('should render AddAnaswer component with expected button text ', async () => {
    render (<AddAnswer isPopup={true} onClose={false} />);
    userEvent.type(screen.getByPlaceholderText(/Put your answer here/i), 'Yes');
    userEvent.type(screen.getByPlaceholderText(/Example:jackson11!/i), 'nickname1');
    userEvent.type(screen.getByPlaceholderText(/Why did you like the product or not/i), 'testemail@email.com');
    expect(await screen.getByRole(/add-answer-btn/i)).toBeInTheDocument();
  });

  test('should loads two answers for initializing render', async () => {
    const { getAllByTestId } = render(<Question question={sample.questions.results[0]} />);
    const answers = getAllByTestId('answer');
    expect(answers.length).toBe(2);
  });

  test('should loads additional questions when the MORE ANSWERED QUESTIONS button is clicked', async () => {
    const { getByText, getAllByTestId } = render((<Question question={sample.questions.results[0]} />));
    const loadMoreAnswerBtn = getByText(/SHOW MORE ANSWERS/i)
    fireEvent.click(loadMoreAnswerBtn);
    const answers = getAllByTestId("answer");
    expect(answers.length).toBe(4);
  });
});



