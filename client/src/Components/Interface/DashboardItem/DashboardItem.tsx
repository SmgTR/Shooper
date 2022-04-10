import React from 'react';
import styles from './DashboardItem.module.scss';

const DashboardItem: React.FC<{ name: string,current: boolean }> =({ name,current })=> {
  const isCurrent=()=>{
    if(current){
      return styles.current;
    }else return styles.day;
  };
  const { infos,item, DashboardItems,revenue,smallText,views,aborted } = styles;
  return (
    <div className={DashboardItems} >
      <div className={item}>
        <p className={`${isCurrent()}`}>{name}</p>
        <div className={infos}>
          <p className={revenue}>$4800 <span className={smallText}>/24 orders</span></p>
          <p className={views}>Views: 24 000</p>
          <p className={aborted}>Aborted carts: 5</p>
        </div>
      </div>
    </div>
  );
};
export default DashboardItem;
