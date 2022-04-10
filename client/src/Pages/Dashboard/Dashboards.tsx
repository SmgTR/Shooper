import React, { useEffect } from 'react';
import QuickStats from 'Components/Interface/QuickStats/QuickStats';
import ActivityOverview from 'Components/Interface/ActivityOverview/ActivityOverview';
import ProductSales from 'Components/Interface/ProductSales/ProductSales';
import { useAppDispatch } from 'redux/hooks';
import { setPageTitle } from 'redux/slices/pagenav-slice';

import styles from './Dashboard.module.scss';

const Dashboards: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageTitle('Dashboard'));
    document.title = 'SHOOPER- Dashboard';
  }, []);

  return (
    <div className={styles.dashboard_content}>
      <h1>Quick Stats</h1>
      <QuickStats></QuickStats>
      <h1>Activity Overview</h1>
      <ActivityOverview></ActivityOverview>
      <h1>Products & Sales</h1>
      <ProductSales></ProductSales>
    </div>
  );
};

export default Dashboards;
