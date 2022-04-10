import { FC } from 'react';

import styles from './Buttons.module.scss';

import { ButtonProps } from 'Components';

const Button: FC<ButtonProps> = ({ event, text, btnType, title, btnClass }) => {
  const buttonType = btnType ?? 'button';
  const buttonClasses = btnClass ? `btn ${btnClass}` : 'btn';
  return (
    <button type={buttonType} className={buttonClasses} title={title} onClick={event}>
      {text}
    </button>
  );
};

export default Button;
