import React, { useEffect } from 'react';

const Statistic: React.FC = () => {
  useEffect(() => {
    document.title = 'SHOOPER- Statystyki';
  }, []);
  return (
    <div>
      <h1>Statistics</h1>
    </div>
  );
};

export default Statistic;
