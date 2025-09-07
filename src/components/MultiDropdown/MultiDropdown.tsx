import React, {RefObject, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import styles from './MultiDropdown.module.scss'
import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, fn: () => void) => {
  useEffect(() => {
    const element = ref?.current;

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        fn();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, fn]);
};

export type Option = {
  key: string;
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown = ({
                                options,
                                value,
                                onChange,
                                getTitle,
                                disabled = false,
                                ...props
                              }: MultiDropdownProps) => {
  const [text, setText] = useState('')
  const visibleOptions=options.filter((v)=>v.value.includes(text))
  const [isOpen, setIsOpen] = useState(false)

  function includes(opts: Option[], opt: Option) {
    return opts.some((o) => opt.key === o.key)
  }

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false))
  useEffect( () => {
    disabled && setIsOpen(false);
  },[disabled])
  return (
      <div ref={ref}
           {...props}
           className={classNames('multi-dropdown', styles['multi-dropdown'], props.className,
               {[styles.isOpen]:isOpen})}
      onClick={(e) => !disabled&&setIsOpen(true)} >
        <Input
            placeholder={getTitle(value)}
            value={isOpen&&text!=='' ? text : (value.length===0?'':getTitle(value))}
            onChange={(value)=> setText(value)} afterSlot={<ArrowDownIcon color={'secondary'}/>}
        />
        {isOpen ? (
            <div className={classNames(styles.optionsParent)}>
              {visibleOptions.map(
                  (option) =>
                  (<div
                      key={option.key}
                      className={classNames(styles.option, {
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