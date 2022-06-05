import React, { useEffect, useState } from 'react';
import { Logo, ShadowContainer, HamburgerMenu, NavAvatar, SearchBar } from 'Components';

import styles from './NavTop.module.scss';
import { useAppSelector } from 'redux/hooks';

const NavContainer: React.FC = () => {
  const { title } = useAppSelector((state) => state.pageNav);

  const { container, nav, searchBarContainer, topMenu } = styles;
  return (
    <header className={`${container} rowCenterVertical`}>
      <Logo />
      <h4 className={styles.title}>{title}</h4>
      <aside className={`${nav} rowCenterVertical`}>
        <div className={topMenu}>
          <ShadowContainer size="small">
            <HamburgerMenu />
          </ShadowContainer>
        </div>
        <ShadowContainer size="small">
          <i className="far fa-bell"></i>
        </ShadowContainer>
        <ShadowContainer size="small">
          <NavAvatar />
        </ShadowContainer>
      </aside>
      <div className={searchBarContainer}>
        <SearchBar />
      </div>
    </header>
  );
};
export default NavContainer;
