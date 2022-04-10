import React, { Fragment } from 'react';

import NavTop from './NavTop';

import styles from './NavigationContainer.module.scss';

const NavigationContainer: React.FC = () => {
  return (
    <Fragment>
      <NavTop />
      <div className={styles.horizontalLine}></div>
    </Fragment>
  );
};

export default NavigationContainer;
