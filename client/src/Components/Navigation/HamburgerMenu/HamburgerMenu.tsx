import React, { useState } from 'react';

import styles from './HamburgerMenu.module.scss';

import { Modal, NavLinks } from 'Components';

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState<null | boolean>(false);
  const [animateClose, setAnimateClose] = useState(false);

  const { hamburgerContainer, menu, hamburgerMenu, menuClose, linksContainer, closeIcon } = styles;

  const closeHandler = () => {
    setAnimateClose(true);

    setTimeout(() => {
      setOpen(false);
      setAnimateClose(false);
    }, 400);
  };

  const openHandler = () => {
    setOpen(true);
  };

  return (
    <div className={hamburgerContainer}>
      <div className={menu} onClick={openHandler}>
        <div className={hamburgerMenu}></div>
      </div>
      {open ? (
        <Modal>
          <div className={`menuOpen ${animateClose ? menuClose : ''}`}>
            <h1 onClick={closeHandler} className={closeIcon}>
              x
            </h1>
            <div className={linksContainer}>
              <NavLinks mobile close={closeHandler} />
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

export default HamburgerMenu;
