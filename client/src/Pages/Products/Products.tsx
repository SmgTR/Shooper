import { Button, ProductInList } from 'Components';
import ProductListItem from 'Components/Interface/ProductsLists/ProductListItem';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllProducts } from 'redux/services/products';
import { setPageTitle } from 'redux/slices/pagenav-slice';

import styles from './Products.module.scss';

const Products: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(setPageTitle('Produkty'));
    document.title = 'SHOOPER- Produkty';
  }, []);
  const { products } = useAppSelector((state) => state.products);

  if (products) {
    return (
      <div>
        <div className={styles.products_manage}>
          <div className={styles.products_manage__add}>
            <Button text="Dodaj produkt +" title="Dodaj produkt" btnClass="--main" />
            <Button
              text="Dodaj kategorie +"
              title="Dodaj kategorie"
              btnClass="--secondary"
            />
          </div>
          <div className={styles.products_manage__sort}>
            <Button text="Sortuj" title="Sortuj" btnClass="--secondary" />
            <Button text="Kategorie" title="Kategorie" btnClass="--secondary" />
          </div>
        </div>
        <section id={styles.products__list}>
          {products.map((product: ProductInList) => {
            return <ProductListItem {...product} key={product.productId} />;
          })}
        </section>
      </div>
    );
  } else return <div>Coś poszło nie tak, spróbuj ponownie</div>;
};

export default Products;
