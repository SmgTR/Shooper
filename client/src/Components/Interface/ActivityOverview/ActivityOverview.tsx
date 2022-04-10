import React from 'react';
import styles from './ActivityOverview.module.scss';
import { ShadowContainer } from 'Components';

const ActivityOverview: React.FC=()=> {
  const { Activity,ActivityOverviewContainer,imagePeople,imageCart,infos  } = styles;
  return (
    <div className={ActivityOverviewContainer}>
      <ShadowContainer size="high">
        <div className={Activity}>
          <div className={imagePeople}></div>
          <div className={infos}>
            <p>Online Visitors: <span>12</span></p>
            <p>New Customers: <span>5</span></p>
            <p>New Subscriptions: <span>8</span></p>
          </div>
        </div>
      </ShadowContainer>
      <ShadowContainer size="high">
        <div className={Activity}>
          <div className={imageCart}></div>
          <div className={infos}>
            <p>Online Visitors: <span>12</span></p>
            <p>New Customers: <span>5</span></p>
            <p>New Subscriptions: <span>8</span></p>
          </div>
        </div>
      </ShadowContainer>
    </div>
  );
};
export default ActivityOverview;