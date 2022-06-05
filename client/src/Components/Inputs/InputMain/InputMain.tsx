import { ChangeEventHandler, FC } from 'react';

interface Input {
  title: string;
  name: string;
  handler: ChangeEventHandler;
  placeholder?: string;
  value: string;
  type: string;
}

import styles from './InputMain.module.scss';

const InputMain: FC<Input> = ({ title, name, handler, placeholder, value, type }) => {
  const isEmpty = value === '' ? true : false;

  return (
    <div className={styles.input__container}>
      <input
        name={name}
        id={name}
        placeholder={placeholder ? placeholder : ''}
        title={title}
        type={type}
        className={`${styles.input__main} ${isEmpty ? styles._empty : ''}`}
        value={value}
        onChange={(event) => handler(event)}
        maxLength={80}
        autoComplete="off"
      />
      <label htmlFor={name} className={isEmpty ? styles.label : ''}>
        {title}
      </label>
    </div>
  );
};

export default InputMain;
