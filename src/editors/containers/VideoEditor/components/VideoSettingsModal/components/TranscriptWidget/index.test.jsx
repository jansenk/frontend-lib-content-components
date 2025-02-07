import React from 'react';
import { shallow } from 'enzyme';

import { RequestKeys } from '../../../../../../data/constants/requests';

import { formatMessage } from '../../../../../../../testUtils';
import { actions, selectors } from '../../../../../../data/redux';
import * as module from './index';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => ({ transcripts: ['error.transcripts', jest.fn().mockName('error.setTranscripts')] })),
}));

jest.mock('../../../../../../data/redux', () => ({
  actions: {
    video: {
      updateField: jest.fn().mockName('actions.video.updateField'),
    },
  },
  thunkActions: {
    video: {
      deleteTranscript: jest.fn().mockName('thunkActions.video.deleteTranscript'),
    },
  },

  selectors: {
    video: {
      transcripts: jest.fn(state => ({ transcripts: state })),
      allowTranscriptDownloads: jest.fn(state => ({ allowTranscriptDownloads: state })),
      showTranscriptByDefault: jest.fn(state => ({ showTranscriptByDefault: state })),
      allowTranscriptImport: jest.fn(state => ({ allowTranscriptImport: state })),
    },
    requests: {
      isFailed: jest.fn(state => ({ isFailed: state })),
    },
  },
}));
jest.mock('../CollapsibleFormWidget', () => 'CollapsibleFormWidget');
jest.mock('./Transcript', () => 'Transcript');

describe('TranscriptWidget', () => {
  describe('hooks', () => {
    describe('transcriptLanguages', () => {
      test('empty list of transcripts returns ', () => {
        expect(module.hooks.transcriptLanguages([])).toEqual('None');
      });
      test('unset gives none', () => {
        expect(module.hooks.transcriptLanguages(['', ''])).toEqual('');
      });
      test('en gives English', () => {
        expect(module.hooks.transcriptLanguages(['en'])).toEqual('English');
      });
      test('en, FR gives English, French', () => {
        expect(module.hooks.transcriptLanguages(['en', 'fr'])).toEqual('English, French');
      });
    });
    describe('hasTranscripts', () => {
      test('null returns false ', () => {
        expect(module.hooks.hasTranscripts(null)).toEqual(false);
      });
      test('empty list returns false', () => {
        expect(module.hooks.hasTranscripts([])).toEqual(false);
      });
      test('content returns true', () => {
        expect(module.hooks.hasTranscripts(['en'])).toEqual(true);
      });
    });
    describe('onAddNewTranscript', () => {
      const mockUpdateField = jest.fn();
      test('null returns [empty string] ', () => {
        module.hooks.onAddNewTranscript({ transcripts: null, updateField: mockUpdateField });
        expect(mockUpdateField).toHaveBeenCalledWith({ transcripts: [''] });
      });
      test(' transcripts return list with blank added', () => {
        const mocklist = ['en', 'fr', 3];
        module.hooks.onAddNewTranscript({ transcripts: mocklist, updateField: mockUpdateField });

        expect(mockUpdateField).toHaveBeenCalledWith({ transcripts: ['en', 'fr', 3, ''] });
      });
    });
  });

  describe('component', () => {
    const props = {
      error: {},
      subtitle: 'SuBTItle',
      title: 'tiTLE',
      intl: { formatMessage },
      transcripts: [],
      allowTranscriptDownloads: false,
      showTranscriptByDefault: false,
      allowTranscriptImport: false,
      updateField: jest.fn().mockName('args.updateField'),
      isUploadError: false,
      isDeleteError: false,
    };

    describe('snapshots', () => {
      test('snapshots: renders as expected with default props', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} />),
        ).toMatchSnapshot();
      });
      test('snapshots: renders as expected with allowTranscriptImport true', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} allowTranscriptImport />),
        ).toMatchSnapshot();
      });
      test('snapshots: renders as expected with transcripts', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} transcripts={['en']} />),
        ).toMatchSnapshot();
      });
      test('snapshots: renders as expected with allowTranscriptDownloads true', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} allowTranscriptDownloads transcripts={['en']} />),
        ).toMatchSnapshot();
      });
      test('snapshots: renders as expected with showTranscriptByDefault true', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} showTranscriptByDefault transcripts={['en']} />),
        ).toMatchSnapshot();
      });
      test('snapshot: renders ErrorAlert with upload error message', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} isUploadError transcripts={['en', 'fr']} />),
        ).toMatchSnapshot();
      });
      test('snapshot: renders ErrorAlert with delete error message', () => {
        expect(
          shallow(<module.TranscriptWidget {...props} isDeleteError transcripts={['en']} />),
        ).toMatchSnapshot();
      });
    });
    describe('mapStateToProps', () => {
      const testState = { A: 'pple', B: 'anana', C: 'ucumber' };
      test('transcripts from video.transcript', () => {
        expect(
          module.mapStateToProps(testState).transcripts,
        ).toEqual(selectors.video.transcripts(testState));
      });
      test('allowTranscriptDownloads from video.allowTranscriptDownloads', () => {
        expect(
          module.mapStateToProps(testState).allowTranscriptDownloads,
        ).toEqual(selectors.video.allowTranscriptDownloads(testState));
      });
      test('showTranscriptByDefault from video.showTranscriptByDefault', () => {
        expect(
          module.mapStateToProps(testState).showTranscriptByDefault,
        ).toEqual(selectors.video.showTranscriptByDefault(testState));
      });
      test('allowTranscriptImport from video.allowTranscriptImport', () => {
        expect(
          module.mapStateToProps(testState).allowTranscriptImport,
        ).toEqual(selectors.video.allowTranscriptImport(testState));
      });
      test('isUploadError from requests.isFinished', () => {
        expect(
          module.mapStateToProps(testState).isUploadError,
        ).toEqual(selectors.requests.isFailed(testState, { requestKey: RequestKeys.uploadTranscript }));
      });
      test('isDeleteError from requests.isFinished', () => {
        expect(
          module.mapStateToProps(testState).isDeleteError,
        ).toEqual(selectors.requests.isFailed(testState, { requestKey: RequestKeys.deleteTranscript }));
      });
    });
    describe('mapDispatchToProps', () => {
      const dispatch = jest.fn();
      test('updateField from actions.video.updateField', () => {
        expect(module.mapDispatchToProps.updateField).toEqual(dispatch(actions.video.updateField));
      });
    });
  });
});
