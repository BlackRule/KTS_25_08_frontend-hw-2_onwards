import cn from 'classnames'
import * as qs from 'qs'
import { Link } from 'react-router-dom'
import { VISIBLE_PAGE_NUMBERS } from 'config/config'
import { getNewURLWithUpdatedParamValue } from 'utils/getNewURLWithUpdatedParamValue'
import styles from './PageNumbers.module.scss'

type PageNumbersProps= {
  curParams: qs.ParsedQs;
  currentPage:number,
  onChange?: (pageToGo: number) => void;
  paramName: string;
  totalPages:number
}

function jsxForPageLink(onClick:()=>void, paramName:PageNumbersProps['paramName'],
  i:number, curParams:PageNumbersProps['curParams'],
  currentPage:PageNumbersProps['currentPage']) {
  return (
    <Link
      onClick={onClick}
      to={getNewURLWithUpdatedParamValue(paramName, `${i + 1}`, curParams)}
      className={cn(styles.pageNumber, {
        [styles.selected]: i === currentPage,
      })}
      key={i}
    >
      {i + 1}
    </Link>
  )
}

function jsxForForwardBackLink(onChange:PageNumbersProps['onChange'], paramName:PageNumbersProps['paramName'], curParams:PageNumbersProps['curParams'],
  currentPage:PageNumbersProps['currentPage'],totalPages:PageNumbersProps['totalPages'],isForward=false) {
  const isDisabled=isForward?currentPage == totalPages - 1:currentPage == 0
  return (
    <Link
      onClick={() => onChange?.(currentPage + 1)}
      to={getNewURLWithUpdatedParamValue(
        paramName,
        `${currentPage + (isDisabled ? 0 : (isForward?+1:-1)) + 1}`,
        curParams
      )}
      className={cn(styles.pageNumber, {
        [styles.disabled]: isDisabled,
      }, styles[`${isForward?'right':'left'}-arrow`])}
      key={isForward?'Next':'Prev'}
    >
    </Link>
  )
}

const PageNumbers = ({
  paramName,
  currentPage,
  totalPages,
  onChange,
  curParams,
}: PageNumbersProps) => {
  const additionalPages=[...Array(totalPages).keys()].slice(VISIBLE_PAGE_NUMBERS-1,totalPages-1)
  return (
    <div className={styles.pageNumbers}>
      {jsxForForwardBackLink(onChange, paramName, curParams, currentPage,totalPages)}
      {[...Array(totalPages).keys()].slice(0,VISIBLE_PAGE_NUMBERS-1).map((i) =>
        jsxForPageLink(() => onChange?.(i),paramName,i,curParams,currentPage)
      )}
      {additionalPages.length>0?<div className={styles.additionalNumbers}>
        <input type='checkbox' id={styles.additionalNumbersToggle}/>
        <label htmlFor={styles.additionalNumbersToggle} className={styles.pageNumber}>...</label>
        <div className={styles.options}>{
          additionalPages.map(
            (i)=>jsxForPageLink(() => onChange?.(i),paramName,i,curParams,currentPage)
          )
        }
        </div>
      </div>:null}
      {totalPages>3?jsxForPageLink(() => onChange?.(totalPages-1),paramName,totalPages-1,curParams,currentPage):null}
      {jsxForForwardBackLink(onChange, paramName, curParams, currentPage,totalPages,true)}
    </div>
  )
}
export default PageNumbers