import React from 'react';

import { AsideNav } from 'Components';

import { Route, Routes } from 'react-router';

import GoogleAuth from 'Modules/Google/GoogleAuth';

import { Statistics, Dashboard, Orders, Products, Product } from 'Pages';

import styles from './MainContent.module.scss';

const MainContent: React.FC = () => {
  const { container, mainContainer } = styles;
  return (
    <div className={container}>
      <AsideNav />
      <main className={`${mainContainer} page__style`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/statistics" element={<Statistics />} />

          <Route path="/google" element={<GoogleAuth />} />

          <Route path="/products" element={<Products />} />

          <Route path="product/:id" element={<Product />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainContent;
