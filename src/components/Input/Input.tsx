import cn from 'classnames'
import * as React from 'react'
import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Значение поля */
  value: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({onChange,afterSlot,className,onClick,...props},ref) => <div onClick={onClick} className={cn(className,styles.input)}>
    <input {...props} type="text" onChange={(e)=>onChange(e.target.value)} ref={ref}/>
    {afterSlot}
  </div>)

export default Input
