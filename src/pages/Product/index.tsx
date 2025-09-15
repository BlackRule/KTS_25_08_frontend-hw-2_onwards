import {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import * as PostService from 'api/ProductService'
import {Product as ProductModel} from 'api/ProductService'
import PagePadding from 'components/PagePadding'
import Product from './components/Product'
import RelatedItems from './components/RelatedItems'
import Loader from '../../components/Loader';

const ProductPage = () => {
  const URLparams = useParams() as { id: string | undefined }
  const [product, setProduct] = useState<ProductModel|null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (URLparams.id===undefined) navigate('/')
    else
      PostService.getProductResponse(URLparams.id).then((response)=> {
        setProduct(response.data);
      })

  },[location])
  return (
    <PagePadding>
      {product ?<>
        <Product product={product}/>
        <RelatedItems category={product.category}/>
      </>: <Loader/>}
    </PagePadding>
  )
}
export default ProductPage