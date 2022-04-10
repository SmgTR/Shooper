import { FC, useState } from 'react';

import { ProductInList } from 'Components';

import styles from './ProductListItem.module.scss';
import capitalize from 'Utils/capitalize';

import defaultAvatar from 'Assets/default-placeholder.png';

const ProductListItem: FC<ProductInList> = ({
  productId,
  name,
  description,
  createdAt,
  image,
  price,
  brand,
  quantity,
  status,
  categories,
  ean
}) => {
  const category = capitalize(categories.category.replace('/', ''));

  const [imageUrl, setImageUrl] = useState(image);

  const productClass = (mobile?: boolean) => {
    if (mobile && quantity <= 0) {
      return '--not_available--mobile';
    } else if (!mobile && quantity <= 0) {
      return '--not_available';
    } else if (!mobile && quantity < 10) {
      return '--availability_alert';
    } else if (mobile && quantity < 10) {
      return '--availability_alert--mobile';
    }
    return '';
  };

  return (
    <article className={`${styles.product} ${productClass(true)}`} data-product-id={productId}>
      <label className={styles.product__label}>
        <input title={productId} type="checkbox" name="select-product" id="" />
      </label>
      <a href={`product/${productId}`}>
        <img
          src={imageUrl}
          onError={() => setImageUrl(defaultAvatar)}
          alt={name}
          className={styles.product__img}
        />
      </a>
      <div className={styles.product__info}>
        <h3>
          <a href={`product/${productId}`}>{name}</a>
        </h3>
        <p className={styles.product__description}>{description}</p>
        <div className={styles.product__category}>
          <span>{categories ? category : ''}</span>
        </div>
        <div className={styles.product__prices_info}>
          <h4 className="price">
            Cena: <span>{price}</span>
          </h4>
          <h4>
            Ilość: <span>{quantity}</span>
          </h4>
          <h4>
            EAN: <span>{ean}</span>
          </h4>
        </div>
      </div>
      <div className={styles.product__status}>
        <h4 className={productClass()}> {quantity > 0 ? 'dostępny' : 'niedostępny'}</h4>
      </div>
      <div className={styles.product__options}>
        <a href={`product/${productId}`}>
          <i className="fa-solid fa-pencil"></i>
        </a>
        <span className={styles.product__options__more}>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
      </div>
    </article>
  );
};

export default ProductListItem;
