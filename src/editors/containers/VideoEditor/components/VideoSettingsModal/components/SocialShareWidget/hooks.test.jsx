import { actions } from '../../../../../../data/redux/app';
import * as hooks from './hooks';

jest.mock('../../../../../../data/redux', () => ({
    actions: {
      video: {
        updateField: jest.fn(args => ({ updateField: args })).mockName('actions.video.updateField'),
      },
    },
    selectors: {
        app: {
            analytics: jest.fn((state) => ({ analytics: state })),
        },
        video: {
            allowVideoSharing: jest.fn((args) => ({ allowVideoSharing: state })),
        },
    },
}));  

// describe('SocialShareWidget hooks', () => {
//     describe('handleSocialSharingCheckboxChange onClick emits event and updates state when', () => {
//       var onClick;
//       beforeEach(() => {
//         jest.resetAllMocks()
//         onClick = hooks.handleSocialSharingCheckboxChange();
//         expect(typeof onClick).toBe('function');
//       });
//       it('box is checked', () => {
//         onClick({target: {checked: true}});
//         .toEqual(dispatch(actions.video.updateField));
//         });
//           });
    