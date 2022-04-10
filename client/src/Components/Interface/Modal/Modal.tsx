import React, { Fragment } from 'react';

import ReactDOM from 'react-dom';

const ModalContent: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <div>{children}</div>;
};

const Modal: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const modalContainer = document.getElementById('mobileNav') as HTMLElement;
  return (
    <Fragment>
      {ReactDOM.createPortal(<ModalContent>{children}</ModalContent>, modalContainer)}
    </Fragment>
  );
};

export default Modal;
