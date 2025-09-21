import cn from 'classnames'
import * as React from 'react'
import {CSSProperties, HTMLAttributes} from 'react'
import styles from './Text.module.scss'

export type TextProps = {
  /** Контент */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** Html-тег */
  tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
};

const Text: React.FC<TextProps> = (props) => {
  const attributes={} as HTMLAttributes<HTMLDivElement>
  const style=props.maxLines?{
    // height: `${1.25*props.maxLines}em`,
    WebkitLineClamp: props.maxLines
  }:{} as CSSProperties
  attributes.className=cn(styles.text,props.className,`v${props.view}`,`w${props.weight}`,`c${props.color}`)
  attributes.style=style
  const Element: React.ElementType = props.tag ?? 'p'
  return <Element {...attributes}>{props.children}</Element>
}

export default Text
