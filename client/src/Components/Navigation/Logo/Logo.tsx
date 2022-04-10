import React, { Fragment } from 'react';

import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  const { logo } = styles;
  return (
    <Fragment>
      <h1 className={logo}>Shopper</h1>
    </Fragment>
  );
};

export default Logo;
