import React from 'react';

import styles from './AsideNav.module.scss';

import { NavLinks } from 'Components';

const AsideNav: React.FC = () => {
  const { container, content, verticalLine } = styles;

  return (
    <div className={container}>
      <div className={content}>
        <NavLinks mobile={false} />
      </div>
      <div className={verticalLine}></div>
    </div>
  );
};

export default AsideNav;
