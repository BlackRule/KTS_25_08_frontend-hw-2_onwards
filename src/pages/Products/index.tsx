import {useEffect, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import * as ProductService from 'api/ProductService'
import {Category, Product} from 'api/ProductService'
import Button from 'components/Button'
import Card from 'components/Card'
import Input from 'components/Input'
import Loader from 'components/Loader'
import {MultiDropdown, Option} from 'components/MultiDropdown'
import PagePadding from 'components/PagePadding'
import Text from 'components/Text'
import useWindowSize from 'hooks/useWindowSize'
import {ProductModelToCardProps} from '../common.ts'
import PageNumbers from './components/PageNumbers'
import styles from './index.module.scss'

const Products = ()=>{
  const [allProducts,setAllProducts]=useState<Product[]>()
  const [currentProducts,setCurrentProducts]=useState<Product[]>()
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const totalElements=allProducts?allProducts.length:0
  const elementsPerPage=9
  const totalPages=Math.ceil(totalElements/elementsPerPage)
  const [currentPage,setCurrentPage]=useState<number>(0)
  const [searchParams, setSearchParams] = useSearchParams()
  //TODO could be passed back and forth like /?p=1&c=a,b If I had time
  // console.log(Array.from(searchParams.entries()))
  useEffect(()=>{
    //TODO handle Error
    if(selectedCategories.length===0)
      ProductService.getProductsResponse().then((response)=>setAllProducts(response.data))
    else{
      Promise.all(
        selectedCategories.map((v)=>ProductService.getProductsResponse(Number(v)))
      ).then((rs)=>setAllProducts(
        rs.map((r)=>r.data).reduce(
          (allProducts,products)=>[...allProducts,...products],[])
      ))
    }
  },[selectedCategories])
  useEffect(()=>setCurrentProducts(allProducts?.
    slice(currentPage*elementsPerPage,currentPage*elementsPerPage+elementsPerPage)
  ),[currentPage,allProducts])
  const categoriesToOptions = (v:Category): Option => ({key: `${v.id}`, value: v.name})
  const optionsToStrings = (v:Option): string => v.value
  const {width,height:_}=useWindowSize()
  useEffect(() => {
    //TODO should fetch only when is opened first time, not when mounted...
    //TODO handle Error
    ProductService.getCategoriesResponse().then((categories) => {
      return setOptions(categories ?categories.data.map(categoriesToOptions) : [])
    }
    )

  },[])
  const [options, setOptions] = useState<Option[]>()
  return (
    <PagePadding className={styles.PagePadding}>
      <div className={styles.products}>
        <Text className={styles.products} tag={'h1'} view={'title'}>Products</Text>
        <Text className={styles.p1} tag={'p'} color='secondary' view={'p-20'}>We display products based on the latest products we have, if you want
                    to see our old products please enter the name of the item</Text>
        <div className={styles.searchBar}>
          <Input value='' onChange={() => {
          }} placeholder={'Search product'} className={styles.searchBar__input}/>
          <Button>{width > 1023 ? 'Find Now' : 'Search'}</Button>
        </div>
        <MultiDropdown generateValueElement={(value: Option[]) => {
          return 'Filter'
        }} options={options ? options : []} /*todo loading={!options}*/ value={selectedCategories.map(categoriesToOptions)}
        onChange={function (value: Option[]): void {
          throw new Error('Function not implemented.')
        }} className={styles.filter}/>
        <div className={styles.totalProducts}>
          <span className={styles.totalProducts__txt}>Total Products</span>
          <span className={styles.totalProducts__count}>{totalElements}</span>
        </div>
        <div className={styles.productsGrid}>
          {currentProducts?currentProducts.map((product) =>
            (<Link key={product.id} to={`/product/${product.id}`}>
              <Card {...ProductModelToCardProps(product)} actionSlot={<Button>Add to Cart</Button>}/>
            </Link>)
          ):<Loader/>}
        </div>
        <PageNumbers totalPages={totalPages} onChange={(cp)=>{
          setCurrentPage(cp)
        }} currentPage={currentPage}/>
      </div>
    </PagePadding>
  )
}
export default Products