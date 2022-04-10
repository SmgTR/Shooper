import React from 'react';
import { ShadowContainer } from 'Components';
import styles from './ProductSales.module.scss';
import Order from '../Order/Order';
import Credentials from '../Credentials/Credentials';
import ProductsNav from '../ProductsNav/ProductsNav';

const ProductSales: React.FC = () => {
  const { ProductsContainer, ProductsSale, Orders, MostViewed } = styles;
  return (
    <div className={ProductsContainer}>
      <ShadowContainer size="big">
        <div className={ProductsSale}>
          <ProductsNav></ProductsNav>
          <div className={Orders} id="Orders">
            <Credentials></Credentials>
            <Order
              customer="Adidas Van Persil"
              products="2"
              date="11/11/2011"
              status="canceled"
            ></Order>
            <Order
              customer="Nike Mike Dyson Pomelo"
              products="1"
              date="11/11/2011"
              status="payment failed"
            ></Order>
          </div>
          <div className={MostViewed} id="MostViewed"></div>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default ProductSales;
