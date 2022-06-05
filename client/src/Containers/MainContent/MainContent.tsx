import React from 'react';

import { AsideNav } from 'Components';

import GoogleAuth from 'Modules/Google/GoogleAuth';

import { Statistics, Dashboard, Orders, Products, Product, Login } from 'Pages';
import NavigationContainer from 'Containers/Navigation';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from 'ProtectedRoute';

import styles from './MainContent.module.scss';
import { useAppSelector } from 'redux/hooks';

const MainContent: React.FC = () => {
  const { container, mainContainer } = styles;
  const isAuthenticated = useAppSelector((state) => state.auth.isLogged);

  return (
    <>
      {isAuthenticated ? <NavigationContainer /> : ''}

      <div className={container}>
        {isAuthenticated ? <AsideNav /> : ''}
        <main className={`${mainContainer} page__style`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  {' '}
                  <Products />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>
              }
            />

            <Route path="/google" element={<GoogleAuth />} />

            <Route
              path="product/:id"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </>
  );
};

export default MainContent;
