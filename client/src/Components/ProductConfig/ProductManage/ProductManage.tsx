import { FC, useState } from 'react';

import ShadowContainer from 'Components/Interface/ShadowContainer/ShadowContainer';

import styles from './ProductManage.module.scss';
import Categories from 'Components/Interface/Categories/Categories';
import Button from 'Components/Interface/Buttons/Button';
import { useAppSelector } from 'redux/hooks';

import InputMain from 'Components/Inputs/InputMain/InputMain';
import ProductInfo from '../ProductInfo/ProductInfo';

const ProductManage: FC<ProductInfo> = ({ inputHandler }) => {
  const [showCategories, setShowCategories] = useState(false);
  const { categories, tax, price, priceWithTax, priceWithoutTax, quantity, ean } =
    useAppSelector((state) => state.products.product);

  const hidePopupOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('close')) {
      setShowCategories(false);
    }
  };

  const hidePopup = () => {
    setShowCategories(false);
  };

  return (
    <div className={styles.product__manage_container}>
      <ShadowContainer size="big" layout="fullHeight">
        <div className={styles.product__manage}>
          <div className={styles.product__manage_category}>
            <h4>
              Kategoria: <span>{categories.name ? categories.name : ''}</span>
            </h4>
            <Button
              event={() => setShowCategories(true)}
              text="Wybierz kategorię"
              title="Wybierz kategorię"
            />
            {showCategories ? (
              <Categories hideClick={hidePopupOnClick} hide={hidePopup} />
            ) : (
              ''
            )}
          </div>
          <div className={styles.product__manage_brand}>
            <h4>Producent</h4>
            <Button
              event={() => setShowCategories(true)}
              text="Wybierz producenta"
              title="Wybierz producenta"
            />
          </div>
          <div className={styles.product__manage_ref}>
            <h4>Referencja</h4>
            <InputMain
              title="EAN"
              name="ean"
              type="text"
              placeholder=""
              value={ean}
              handler={inputHandler}
            />
          </div>
          <div className={styles.product__manage_tax}>
            <h4>Stawka VAT</h4>

            <input
              type="number"
              title="Podatek"
              name="tax"
              value={tax}
              onChange={inputHandler}
            />
            <span>%</span>
          </div>
          <div className={styles.product__manage_quantity}>
            <h4>Ilość</h4>
            <input
              type="number"
              title="Ilość"
              name="quantity"
              value={quantity}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.product__manage_prices}>
            <h4>Cena</h4>
            <div className={styles.product__manage_prices_content}>
              <label htmlFor="netto">Netto:</label>
              <input
                type="number"
                title="netto"
                name="priceWithoutTax"
                value={priceWithoutTax}
                onChange={inputHandler}
              />
              <label htmlFor="brutto">Brutto:</label>
              <input
                type="number"
                title="brutto"
                name="priceWithTax"
                value={priceWithTax}
                onChange={inputHandler}
              />
              <label htmlFor="sell">Cena sprzedazy:</label>
              <input
                type="number"
                title="sell"
                name="price"
                value={price}
                onChange={inputHandler}
              />
            </div>
          </div>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default ProductManage;
