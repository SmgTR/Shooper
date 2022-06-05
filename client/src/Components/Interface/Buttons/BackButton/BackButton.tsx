import { FC } from 'react';

import styles from './BackButton.module.scss';

const BackButton: FC<{ link: string; text?: string }> = ({ link, text }) => {
  text = text ?? 'Powrót';
  return (
    <a className={styles.back} href={link}>
      <i className="fa-solid fa-chevron-left"></i>
      <button title={text} className={styles.back__button}>
        {text}
      </button>
    </a>
  );
};

export default BackButton;
