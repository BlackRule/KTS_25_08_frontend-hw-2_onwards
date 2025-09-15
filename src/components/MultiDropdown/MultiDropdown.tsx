import cn from 'classnames'
import {RefObject, useEffect, useRef, useState} from 'react'
import Input from '../Input'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import styles from './MultiDropdown.module.scss'

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void) => {
  useEffect(() => {
    const element = ref?.current

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}

export type Option = {
  key: string;
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  generateValueElement: (value: Option[]) => string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
};

export const MultiDropdown = ({
  options,
  value,
  onChange,
  generateValueElement,
  disabled = false,
  ...props
}: MultiDropdownProps) => {
  const [text, setText] = useState('')
  const visibleOptions=options.filter((v)=>v.value.includes(text))
  const [isOpen, setIsOpen] = useState(false)

  function includes(opts: Option[], opt: Option) {
    return opts.some((o) => opt.key === o.key)
  }

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setIsOpen(false))
  useEffect( () => {
    disabled && setIsOpen(false)
  },[disabled])
  return (
    <div ref={ref}
      {...props}
      className={cn('multiDropdown', styles.multiDropdown, props.className,
        {[styles.isOpen]:isOpen})}
      onClick={(e) => !disabled&&setIsOpen(true)} >
      <Input
        placeholder={generateValueElement(value)}
        value={isOpen&&text!=='' ? text : (value.length===0?'':generateValueElement(value))}
        onChange={setText} afterSlot={<ArrowDownIcon color={'secondary'}/>}
      />
      {isOpen ? (
        <div className={cn(styles.optionsParent)}>
          {visibleOptions.map(
            (option) =>
              (<div
                key={option.key}
                className={cn(styles.option, {
                  [styles.selected]: includes(value, option),
                })}
                onClick={() =>
                  !includes(value, option) ? onChange([...value, option])
                    : onChange(value.filter((o) => o.key !== option.key))}
              >
                {option.value}
              </div>)
          )}
        </div>
      ) : null}
    </div>
  )
}
export default MultiDropdown