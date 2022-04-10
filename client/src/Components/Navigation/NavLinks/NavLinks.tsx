import React, { Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import { navLinkActive, NavLinksProps } from 'Components';

import styles from './NavLinks.module.scss';

const NavLinks: React.FC<NavLinksProps> = ({ mobile, close }) => {
  const { active, noActive, btn, title, mobileActive, mobileNoActive } = styles;

  const activeHandler = (navData: navLinkActive) => {
    if (!mobile) {
      return navData.isActive ? active : noActive;
    }
    return navData.isActive ? mobileActive : mobileNoActive;
  };

  const closeModal = () => {
    if (close !== undefined) {
      close();
    }
  };

  const titles = {
    home: 'Home',
    orders: 'Zamówienia',
    products: 'Produkty',
    statistics: 'Statystyki'
  };

  return (
    <Fragment>
      <button className={btn} title="Home">
        <NavLink to="/" className={(link) => activeHandler(link)}>
          {mobile ? (
            <h3 className={title} onClick={closeModal}>
              {titles.home}
            </h3>
          ) : (
            <i className="fas fa-home" />
          )}
        </NavLink>
      </button>
      <button className={btn} title="Orders">
        <NavLink to="orders" className={(link) => activeHandler(link)}>
          {mobile ? (
            <h3 className={title} onClick={closeModal}>
              {titles.orders}
            </h3>
          ) : (
            <i className="fas fa-list" />
          )}
        </NavLink>
      </button>
      <button className={btn} title="Products">
        <NavLink to="products" className={(link) => activeHandler(link)}>
          {mobile ? (
            <h3 className={title} onClick={closeModal}>
              {titles.products}
            </h3>
          ) : (
            <i className="fa-solid fa-prescription-bottle" />
          )}
        </NavLink>
      </button>
      <button className={btn} title="Statistics">
        <NavLink to="statistics" className={(link) => activeHandler(link)}>
          {mobile ? (
            <h3 className={title} onClick={closeModal}>
              {titles.statistics}
            </h3>
          ) : (
            <i className="far fa-chart-bar"></i>
          )}
        </NavLink>
      </button>
    </Fragment>
  );
};

export default NavLinks;
