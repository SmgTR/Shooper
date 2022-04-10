import React, { Fragment } from 'react';

import defaultAvatar from '../../../Assets/defaultAvatar.jpg';

import styles from './UserAvatar.module.scss';

const UserAvatar: React.FC = () => {
  return (
    <Fragment>
      <img src={defaultAvatar} alt="user avatar" className={styles.contain} />
    </Fragment>
  );
};

export default UserAvatar;
