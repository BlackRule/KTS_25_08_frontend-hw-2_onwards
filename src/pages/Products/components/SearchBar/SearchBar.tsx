import {HTMLAttributes, useMemo, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Button from 'components/Button'
import Input from 'components/Input'
import useWindowSize from 'hooks/useWindowSize'
import { QUERY_PARAMS } from 'config/config'
import styles from './SearchBar.module.scss'

const SearchBar = ({
  handleSearch,
  ...props
}: HTMLAttributes<HTMLDivElement> & { handleSearch: (v: string) => void }) => {
  const {width}=useWindowSize()
  const location = useLocation()
  const urlPlaceholder = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get(QUERY_PARAMS.query)
    return q && q.length > 0 ? q : 'Search product'
  }, [location.search])
  const [value, setValue] = useState('')
  return <div className={styles.searchBar}>
    <Input 
      value={value}
      placeholder={urlPlaceholder}
      className={styles.searchBar__input}
      onChange={(v) => setValue(v)}
      onKeyDown={(e) => {
        if (e.code === 'Enter') {
          handleSearch(value)
        }
      }}
    />
    <Button onClick={() => handleSearch(value)}>
      {width > 1023 ? 'Find Now' : '🔍'}
    </Button>
  </div>
}

export default SearchBar