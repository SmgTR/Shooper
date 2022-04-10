import React from 'react';

import styles from './ShadowContainer.module.scss';

const ShadowContainer: React.FC<{
  children: JSX.Element;
  size: 'small' | 'medium' | 'large' | 'high' | 'big';
  layout?: string;
}> = ({ children, size, layout }) => {
  const containerSize = () => {
    if (size === 'small') {
      return styles.containerSmall;
    } else if (size === 'medium') {
      return styles.containerMedium;
    } else if (size === 'large') {
      return styles.containerLarge;
    } else if (size === 'high') {
      return styles.containerHigh;
    } else if (size === 'big') {
      return styles.containerBig;
    }
    return;
  };
  return <div className={`${styles.container} ${containerSize()} ${layout}`}>{children}</div>;
};

export default ShadowContainer;
