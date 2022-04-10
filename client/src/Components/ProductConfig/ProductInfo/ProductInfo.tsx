import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  Fragment,
  useEffect,
  useState
} from 'react';

import ShadowContainer from 'Components/Interface/ShadowContainer/ShadowContainer';
import InputMain from 'Components/Inputs/InputMain/InputMain';
import Textarea from 'Components/Inputs/Textarea/Textarea';

import styles from './ProductInfo.module.scss';
import { useAppSelector } from 'redux/hooks';
import { imageError } from 'Utils/imageError';

interface ProductInfo {
  inputHandler: ChangeEventHandler;
  addPhoto?: any;
}

const ProductInfo: FC<ProductInfo> = ({ inputHandler, addPhoto }) => {
  const productItem = useAppSelector((state) => state.products.product);

  const { brand, description, availableOptions, image, name } = productItem;

  const [preview, setPreview] = useState(['']);

  useEffect(() => {
    setPreview([...image]);
  }, [image]);

  const getPhoto = (event: ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    if (image.length < 3) {
      if (target.files) {
        const url = Array.from(target.files).forEach((file) => {
          const url = URL.createObjectURL(file);
          if (preview.length + target.files!.length < 5) {
            setPreview((state) => [...state, url]);
            addPhoto((state: any) => [...state, file]);
          } else {
            console.log('za duzo zdjec');
          }
        });
      }
    }
  };

  return (
    <ShadowContainer size="big" layout={'flex flex-mobile-column flex-60'}>
      <Fragment>
        <div className={styles.product__info}>
          <InputMain
            name="name"
            placeholder=""
            title="Nazwa produktu"
            type="text"
            value={name}
            handler={inputHandler}
          />
          <Textarea
            title="Opis produktu"
            name="description"
            rows={4}
            cols={30}
            defaultValue={description}
            handler={inputHandler}
            label="Opis produktu"
          />
          <div className={styles.product__info_params}>
            <h4>Parametry:</h4>
            {availableOptions
              ? availableOptions.map((param) => {
                  return <span key={param.size}>Ilość: {param.size}</span>;
                })
              : ''}
            <span>Dodaj parametr +</span>
          </div>
          <h4>Produkty powiązane:</h4>
          <span>Dodaj produkt +</span>
        </div>
        <div className={styles.product__photos}>
          {preview
            ? preview.map((src, index) => {
                if (src)
                  return (
                    <img
                      alt={`${name}-${index}`}
                      onError={(event) => imageError(event)}
                      key={src + index}
                      src={src}
                    />
                  );
                return;
              })
            : ''}
          {preview.length <= 3 ? (
            <label htmlFor="image" className="btn --outline">
              Dodaj zdjęcie +
            </label>
          ) : (
            ''
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/svg"
            multiple
            onChange={(e) => getPhoto(e)}
          />
        </div>
      </Fragment>
    </ShadowContainer>
  );
};

export default ProductInfo;
