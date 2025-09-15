import cn from 'classnames'
import {HTMLAttributes} from 'react'
import styles from './PagePadding.module.scss'
const PagePadding = (props:HTMLAttributes<HTMLDivElement>)=>{
  return (<div {...props} className={cn(styles.pagePadding,props.className)}>
    {props.children}
  </div>)
}
export default PagePadding