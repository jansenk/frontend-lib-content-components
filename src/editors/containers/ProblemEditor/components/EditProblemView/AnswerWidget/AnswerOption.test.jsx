import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from '../../../../../../testUtils';
import { selectors } from '../../../../../data/redux';
import { AnswerOption, mapStateToProps } from './AnswerOption';

jest.mock('../../../../../data/redux', () => ({
  selectors: {
    problem: {
      problemType: jest.fn(state => ({ problemType: state })),
    },
  },
}));

describe('AnswerOption', () => {
  const answerWithOnlyFeedback = {
    id: 'A',
    title: 'Answer 1',
    correct: true,
    selectedFeedback: 'some feedback',
  };
  const answerWithSelectedUnselectedFeedback = {
    id: 'A',
    title: 'Answer 1',
    correct: true,
    selectedFeedback: 'selected feedback',
    unselectedFeedback: 'unselected feedback',
  };

  const props = {
    hasSingleAnswer: false,
    answer: answerWithOnlyFeedback,
    // inject
    intl: { formatMessage },
    // redux
    problemType: 'multiplechoiceresponse',
  };
  describe('render', () => {
    test('snapshot: renders correct option with feedback', () => {
      expect(shallow(<AnswerOption {...props} />)).toMatchSnapshot();
    });
    test('snapshot: renders correct option with selected unselected feedback', () => {
      expect(shallow(<AnswerOption {...props} problemType="choiceresponse" answer={answerWithSelectedUnselectedFeedback} />)).toMatchSnapshot();
    });
  });
  describe('mapStateToProps', () => {
    const testState = { A: 'pple', B: 'anana', C: 'ucumber' };
    test('problemType from problem.problemType', () => {
      expect(
        mapStateToProps(testState).problemType,
      ).toEqual(selectors.problem.problemType(testState));
    });
  });
});