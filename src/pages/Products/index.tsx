import {observer} from 'mobx-react-lite'
import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'
import Loader from 'components/Loader'
import {Option} from 'components/MultiDropdown'
import PagePadding from 'components/PagePadding'
import Text from 'components/Text'
import {ProductsStore} from 'stores'
import rootStore from 'stores/RootStore'
import {getNewURLWithUpdatedParamValue} from 'utils/getNewURLWithUpdatedParamValue'
import {LoadingState} from 'utils/loadingState'
import {useLocalStore} from 'utils/useLocalStore'
import {ProductModelToCardProps} from '../common'
import Filter from './components/Filter'
import PageNumbers from './components/PageNumbers'
import SearchBar from './components/SearchBar/SearchBar'
import styles from './index.module.scss'



const Products = ()=>{
  const navigate = useNavigate()
  const productsStore = useLocalStore(() => new ProductsStore())
  useEffect(() => {
    productsStore.getProductsList()
  }, [productsStore])
  const optionsToStrings = (v: Option): string => v.key
  const stringsToOptions = (k: string): Option => ({ key: k, value: k })
  const params = rootStore.query.getParams()
  const pagedList = productsStore.pagedList
  const selectedCategories = productsStore.selectedCategories
  const searchFilteredListLength = 
    productsStore.searchFilteredList.length
  const productsStoreState = productsStore.state
  const currentPage = productsStore.pageNumber
  const { totalPages } = productsStore
  return (
    <PagePadding className={styles.pagePadding}>
      <div className={styles.products}>
        <Text className={styles.products} tag={'h1'} view={'title'}>Products</Text>
        <Text className={styles.p1} tag={'p'} color='secondary' view={'p-20'}>We display products based on the latest
          products we have, if you want
          to see our old products please enter the name of the item</Text>
        <SearchBar handleSearch={(v) => navigate(getNewURLWithUpdatedParamValue('q', v, params))}/>

        <Filter
          className={styles.filter}
          selectedOptions={selectedCategories.map(stringsToOptions)}
          onChange={(opts) => {
            navigate(getNewURLWithUpdatedParamValue('sc', opts.map(optionsToStrings), params))
          }}
        />
        <div className={styles.totalProducts}>
          <span className={styles.totalProducts__txt}>Total Products</span>
          <span className={styles.totalProducts__count}>{searchFilteredListLength}</span>
        </div>
        {productsStoreState === LoadingState.loading ? (
          <Loader />
        ) : (
          <div className={styles.productsGrid}>
            {pagedList.map((product) =>
              (<Link key={product.id} to={`/product/${product.id}`}>
                <Card {...ProductModelToCardProps(product)} actionSlot={<Button>Add to Cart</Button>}/>
              </Link>)
            ) }
          </div>
        )}
        <PageNumbers 
          paramName={'p'}
          totalPages={totalPages}
          curParams={params}
          currentPage={currentPage}
        />
      </div>
    </PagePadding>
  )
}
export default observer(Products)