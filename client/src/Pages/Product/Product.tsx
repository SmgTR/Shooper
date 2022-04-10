import BackButton from 'Components/Interface/Buttons/BackButton/BackButton';
import { FC, useEffect, ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProduct, uploadProductPhoto } from 'redux/services/products';
import { setPageTitle } from 'redux/slices/pagenav-slice';

import { ProductInfo, ProductManage, Button } from 'Components';

import styles from './Product.module.scss';
import { setProduct, updateProduct } from 'redux/slices/products-slice';

const Product: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const productItem = useAppSelector((state) => state.products.product);

  const { name, productId } = productItem;

  const [photo, setPhoto] = useState([]);

  const saveProduct = () => {
    if (photo) {
      photo.map((ph) => {
        dispatch(uploadProductPhoto(ph));
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id)).then((productItem) => {
        dispatch(setProduct(productItem));
      });
    }
  }, [id]);

  if (name) document.title = `SHOOPER- ${name}`;
  if (productId && productId !== id) {
    window.history.pushState('', '', productId);
  }

  useEffect(() => {
    if (productItem) {
      dispatch(setPageTitle(name));
    } else {
      dispatch(setPageTitle('Nowy produkt'));
    }
  }, [name]);

  const InputValueHandler = (event: ChangeEvent<Element>) => {
    const target = event.target as HTMLTextAreaElement;
    const field: string = target.getAttribute('name')!;
    dispatch(updateProduct({ [field]: target.value }));
  };

  return (
    <div className={styles.product__container}>
      <div className={styles.product__navigation}>
        <BackButton link="/products" />
        <Button
          text="Zapisz zmiany"
          title="zapisz"
          btnClass="--main"
          event={saveProduct}
        />
      </div>
      <div className={styles.product__content}>
        <ProductInfo inputHandler={InputValueHandler} addPhoto={setPhoto} />
        <ProductManage inputHandler={InputValueHandler} />
      </div>
    </div>
  );
};

export default Product;
