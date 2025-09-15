import cn from 'classnames'
import * as React from 'react'
import CheckIcon from '../icons/CheckIcon'
import styles from './Checkbox.module.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({onChange, ...props
}) => {
  return <label className={cn(props.className, styles.checkbox, {[styles.disabled]: props.disabled})}>
    <input {...props} type="checkbox" onClick={() => onChange(!props.checked)}/>
    <CheckIcon color={props.disabled ? 'secondary' : 'accent'} width={40} height={40}/>
  </label>
}

export default CheckBox
