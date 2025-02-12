import React from 'react';
import { shallow } from 'enzyme';
import VideoSelectorPage from './VideoSelectorPage';

const props = {
  courseId: 'course-v1:edX+DemoX+Demo_Course',
  lmsEndpointUrl: 'evenfakerurl.com',
  studioEndpointUrl: 'fakeurl.com',
};

jest.mock('react-redux', () => ({
  Provider: 'Provider',
  connect: (mapStateToProps, mapDispatchToProps) => (component) => ({
    mapStateToProps,
    mapDispatchToProps,
    component,
  }),
}));
jest.mock('./VideoSelector', () => 'VideoSelector');

describe('Video Selector Page', () => {
  describe('snapshots', () => {
    test('rendering correctly with expected Input', () => {
      expect(shallow(<VideoSelectorPage {...props} />)).toMatchSnapshot();
    });
    test('rendering with props to null', () => {
      expect(shallow(<VideoSelectorPage />)).toMatchSnapshot();
    });
  });
});
