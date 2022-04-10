import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getCategories, getCategory } from 'redux/services/categories';
import { bodyNoScroll, bodyScroll } from 'Utils/no_scroll';

import styles from './Categories.module.scss';

import Button from '../Buttons/Button';
import { updateProduct } from 'redux/slices/products-slice';

const Categories: FC<{ hideClick: any; hide: any }> = ({ hideClick, hide }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.category);

  const isInitialMount = useRef(true);

  useEffect(() => {
    dispatch(getCategories());
    bodyNoScroll();

    return () => {
      bodyScroll();
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(updateProduct({ categories: { ...category } }));
      hide();
    }
  }, [category]);

  interface Categories {
    _id: string;
    name: string;
    category: string;
    children: [];
  }

  const manageCategories = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.dataset.id) {
      dispatch(getCategory(target.dataset.id));
    }
  };

  const { categories } = useAppSelector((state) => state.categories);

  const categoriesList = categories.map((category: Categories) => {
    if (category) {
      const subCategory = category.children.map((child: Categories) => {
        return (
          <li key={child._id} data-parent-id={category._id} data-id={child._id}>
            {child.name}
            {child.children ? (
              <ul className={styles.categories__last}>
                {child.children.map((last: Categories) => {
                  return (
                    <li key={last._id} data-parent-id={child._id} data-id={last._id}>
                      {last.category}
                    </li>
                  );
                })}
                <li
                  key={child._id}
                  data-parent-id={category._id}
                  className={`${styles.categories__add}`}
                >
                  Dodaj <span>+</span>
                </li>
              </ul>
            ) : (
              ''
            )}
          </li>
        );
      });

      return (
        <li key={category._id} data-id={category._id}>
          {category.name}
          <ul className={styles.categories__sub}>
            {subCategory}
            <li data-parent-id={category._id} className={`${styles.categories__add}`}>
              Dodaj <span>+</span>
            </li>
          </ul>
        </li>
      );
    } else {
      return <li>Nie masz zadnych kategorii, dodaj kategorie</li>;
    }
  });

  return (
    <div className={`${styles.categories__container} close`} onClick={hideClick}>
      <div className={styles.categories}>
        <Button text="X" event={hideClick} btnClass="close" title="Zamknij" />

        <ul onClick={(e) => manageCategories(e)}>
          {categoriesList}
          <li className={`${styles.categories__add}`}>
            Dodaj <span>+</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
