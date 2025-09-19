import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import Loader from 'components/Loader'
import PagePadding from 'components/PagePadding/PagePadding'
import {ProductStore} from 'stores'
import { useLocalStore } from 'utils/useLocalStore'
import Product from './components/Product/Product'
import RelatedItems from './components/RelatedItems/RelatedItems'
import icon from './img/left_black.svg'
import styles from './Product.module.scss'

const ProductPage = () => {
  const URLparams = useParams() as unknown as { id: string | undefined }
  const navigate = useNavigate()
  const productStore = useLocalStore(() => new ProductStore())
  const location = useLocation()
  useEffect(() => {
    if (typeof URLparams.id !== 'string') {
      navigate('/')
    } else {
      productStore.get(URLparams.id)
    }
  }, [productStore, location, URLparams.id, navigate])

  const { product } = productStore
  if(product===undefined||product.state=='rejected') return null
  return (
    <PagePadding>
      <Link to={'/'} className={styles.back}><img src={icon} alt=""/>Back</Link>
      {product.state === 'pending' ? (
        <Loader />
      ) : (
        <>
          <Product product={product.value} />
          <RelatedItems product={product.value} />
        </>
      )}
    </PagePadding>
  )
}
export default observer(ProductPage)
