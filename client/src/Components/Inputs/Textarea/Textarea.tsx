import { ChangeEventHandler, FC, Fragment } from 'react';

interface Textarea {
  title: string;
  name: string;
  rows: number;
  cols: number;
  defaultValue: string;
  handler: ChangeEventHandler;
  label: string;
}

import styles from './Textarea.module.scss';

const Textarea: FC<Textarea> = ({ title, name, rows, cols, defaultValue, handler, label }) => {
  return (
    <Fragment>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        title={title}
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
        className={styles.textarea}
        onChange={handler}
      />
    </Fragment>
  );
};

export default Textarea;
