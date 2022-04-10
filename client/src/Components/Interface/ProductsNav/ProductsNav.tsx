import React from 'react';
import styles from './ProductsNav.module.scss';
import { NavLink } from 'react-router-dom';
import { navLinkActive, NavLinksProps } from 'Components';

const ProductsNav: React.FC<NavLinksProps> = () => {
  const { ProductsNavigation, NavItem, active, noActive } = styles;
  const handleActive = (navData: navLinkActive) => {
    return navData.isActive ? active : noActive;
  };
  return (
    <div className={ProductsNavigation}>
      <div className={NavItem}>
        <NavLink className={(link) => handleActive(link)} to="#Orders">
          recent orders
        </NavLink>
      </div>
      <div className={NavItem}>
        <NavLink className={(link) => handleActive(link)} to="#MostViewed">
          Most Viewed
        </NavLink>
      </div>
    </div>
  );
};
export default ProductsNav;
