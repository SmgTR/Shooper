import React, { useEffect } from 'react';

const Orders: React.FC = () => {
  useEffect(() => {
    document.title = 'SHOOPER- Zamówienia';
  }, []);

  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
