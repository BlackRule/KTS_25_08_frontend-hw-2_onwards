import { observer } from 'mobx-react-lite'
import {useEffect} from 'react'
import { MultiDropdown, MultiDropdownProps, Option } from 'components/MultiDropdown'
import {CategoriesStore} from 'stores'
import {categoriesToOptions} from 'utils/getNewURLWithUpdatedParamValue'
import { useLocalStore } from 'utils/useLocalStore'

type FilterProps = Omit<MultiDropdownProps,'value'|'options'|'generateValueElement'|'loading'>
  &{selectedOptions:Option[]}
const Filter = ({ selectedOptions, onChange, ...props }: FilterProps) => {
  const categoriesStore = useLocalStore(() => new CategoriesStore())
  useEffect(()=>categoriesStore.get(),[categoriesStore])

  return (
    <MultiDropdown
      onChange={(v) => {
        onChange(v)
      }}
      options={(categoriesStore.categories?.state==='fulfilled'?categoriesStore.categories.value:[]).map(categoriesToOptions)}
      value={selectedOptions}

      {...props}
      loading={categoriesStore.categories?.state==='pending'}
      generateValueElement={()=>'Filter'}
    />
  )
}
export default observer(Filter)
