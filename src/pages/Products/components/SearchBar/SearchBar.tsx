import {HTMLAttributes, useState} from 'react'
import Button from 'components/Button'
import Input from 'components/Input'
import useWindowSize from 'hooks/useWindowSize'
import styles from './SearchBar.module.scss'

const SearchBar = ({
  handleSearch,
  ...props
}: HTMLAttributes<HTMLDivElement> & { handleSearch: (v: string) => void }) => {
  const {width}=useWindowSize()
  const [value, setValue] = useState('')
  return <div className={styles.searchBar}>
    <Input 
      value={value}
      placeholder={'Search product'} 
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