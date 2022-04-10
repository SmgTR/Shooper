import React from 'react';
import styles from './Credentials.module.scss';

const Credentials: React.FC=()=> {
  const { Creds } = styles;
  return(
    <div className={Creds}>
      <p>Customer</p>
      <p>Products</p>
      <p>Date</p>
      <p>Status</p>
    </div>
  );
};
export default Credentials;