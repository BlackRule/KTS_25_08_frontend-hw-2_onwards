import cn from 'classnames'
import styles from './PageNumbers.module.scss'

type PageNumbersProps= {
    currentPage:number,
    onChange:(currentPage: number) => void,
    totalPages:number
}

const PageNumbers = ({currentPage,totalPages,onChange}:PageNumbersProps) => {
  return (
    <div className={styles.pageNumbers}>{[...Array(totalPages+1).keys()].slice(1).map(
      (i)=>
        <div key={i} onClick={()=>onChange(i-1)} className={
          cn(styles.pageNumber,{[styles.selected]:i-1===currentPage})
        }>{i}</div>
    )}</div>
  )
}
export default PageNumbers