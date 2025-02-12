import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow,
  ModalDialog,
} from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';

export const BaseModal = ({
  isOpen,
  close,
  title,
  children,
  headerComponent,
  confirmAction,
  footerAction,
  size,
  isFullscreenScroll,
  bodyStyle,
}) => (
  <ModalDialog
    isOpen={isOpen}
    onClose={close}
    size={size}
    variant="default"
    hasCloseButton
    isFullscreenOnMobile
    isFullscreenScroll={isFullscreenScroll}
  >
    <ModalDialog.Header style={{ zIndex: 10000 }}>
      <ModalDialog.Title>
        {title}
      </ModalDialog.Title>
      {headerComponent}
    </ModalDialog.Header>
    <ModalDialog.Body style={bodyStyle}>
      {children}
    </ModalDialog.Body>
    <ModalDialog.Footer>
      <ActionRow>
        {footerAction}
        <ActionRow.Spacer />
        <ModalDialog.CloseButton variant="tertiary" onClick={close}>
          <FormattedMessage {...messages.cancelButtonLabel} />
        </ModalDialog.CloseButton>
        {confirmAction}
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
);

BaseModal.defaultProps = {
  footerAction: null,
  headerComponent: null,
  size: 'lg',
  isFullscreenScroll: true,
  bodyStyle: null,
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  confirmAction: PropTypes.node.isRequired,
  footerAction: PropTypes.node,
  headerComponent: PropTypes.node,
  size: PropTypes.string,
  isFullscreenScroll: PropTypes.bool,
  bodyStyle: PropTypes.shape({}),
};

export default BaseModal;
