import React from 'react';

import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  const { container, searchBar, icon, label } = styles;
  return (
    <div className={container}>
      <label className={label}>
        <input type="text" name="search" placeholder="Search" className={searchBar} />{' '}
        <i className={`${icon} fas fa-search`}></i>
      </label>
    </div>
  );
};

export default SearchBar;
