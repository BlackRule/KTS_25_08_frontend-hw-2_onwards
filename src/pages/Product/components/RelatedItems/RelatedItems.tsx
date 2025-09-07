import {HTMLAttributes, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import * as PostService from 'api/ProductService'
import {Product} from 'api/ProductService'
import Button from 'components/Button'
import Card from 'components/Card'
import {ProductModelToCardProps} from '../../../common.ts'
import styles from './RelatedItems.module.scss'

type RelatedItemsProps = React.PropsWithChildren<{
    category:Product['category']
}> & HTMLAttributes<HTMLDivElement>;

const RelatedItems=({category}:RelatedItemsProps)=>{
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    PostService.getProductsResponse(category.id,3).then((response)=>setProducts(response.data))
  }, [])
  return (
    <section className={styles.RelatedItems}>
      <div className={styles.txt}>Related Items</div>
      <div className={styles.grid}>
        {products?
          products.map((product) =>
            (<Link key={product.id} to={`/product/${product.id}`}>
              <Card {...ProductModelToCardProps(product)} actionSlot={<Button>Add to Cart</Button>}/>
            </Link>)
          ):null
        }
      </div>
    </section>
  )
}

export default RelatedItems