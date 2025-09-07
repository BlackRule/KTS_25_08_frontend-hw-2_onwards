import React from 'react';
import style from './Button.module.scss';
import Loader from "../Loader";
import classNames from "classnames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({children,loading,disabled, className,onClick,...props}) => {
  const disabledProp=disabled
  disabled||=loading
  return <button {...props} disabled={disabled} className={classNames(className, style.Button, {[style.loading]:loading},{[style.disabled]:disabledProp})}
                 onClick={(e) => !disabled && onClick && onClick(e)}>
    {loading && <Loader size={"s"}/>}{children}
  </button>;
};

export default Button;
