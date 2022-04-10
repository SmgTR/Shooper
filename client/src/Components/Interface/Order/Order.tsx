import React from 'react';
import styles from './Order.module.scss';

const Order: React.FC<{ customer: string, products: string,date: string, status: string }> = ({ customer, products, date, status })=> {
  const { OrderStyle }= styles;
  return(
    <div className={OrderStyle}>
      <p>{ customer }</p>
      <p>{ products }</p>
      <p>{ date }</p>
      <p>{ status }</p>
    </div>
  );
};
export default Order;
