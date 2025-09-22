import cn from 'classnames'
import * as React from 'react'
import Loader from '../Loader'
import style from './Button.module.scss'



export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Состояние загрузки */
  loading?: boolean;
  skin?: 'primary'|'secondary';
};

const Button: React.FC<ButtonProps> = ({children,skin = 'primary',loading,disabled, className,onClick,...props}) => {
  const disabledProp=disabled
  disabled||=loading
  return <button {...props} disabled={disabled} className={cn(className, style.button,style[`buttonSkin_${skin}`], {[style.loading]:loading},{[style.disabled]:disabledProp})}
    onClick={(e) => !disabled && onClick && onClick(e)}>
    {loading && <Loader size={'s'}/>}{children}
  </button>
}

export default Button
