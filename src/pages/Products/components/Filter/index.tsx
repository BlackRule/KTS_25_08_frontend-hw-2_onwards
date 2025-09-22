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

  const options = (categoriesStore.categories?.state==='fulfilled' ? categoriesStore.categories.value : []).map(categoriesToOptions)
  const displaySelected = selectedOptions.map((opt) => options.find(o => o.key === opt.key) || opt)
  return (
    <MultiDropdown
      onChange={(v) => {
        onChange(v)
      }}
      options={options}
      value={displaySelected}

      {...props}
      loading={categoriesStore.categories?.state==='pending'}
      generateValueElement={(vals)=> vals.length ? vals.map(v=>v.value).join(', ') : 'Filter'}
    />
  )
}
export default observer(Filter)
