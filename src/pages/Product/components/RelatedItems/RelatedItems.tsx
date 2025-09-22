import {observer} from 'mobx-react-lite'
import {HTMLAttributes, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Product} from 'api'

import Button from 'components/Button'
import Card from 'components/Card'
import Loader from 'components/Loader'
import {ProductModelToCardProps} from 'pages/common'
import {RelatedItemsStore} from 'stores'
import {useLocalStore} from 'utils/useLocalStore'
import {ROUTES} from '../../../../config/routes'
import styles from './RelatedItems.module.scss'
import rootStore from 'stores/RootStore'

type RelatedItemsProps = React.PropsWithChildren<{
  product:Product;
}> & HTMLAttributes<HTMLDivElement>;

const RelatedItems=({product}:RelatedItemsProps)=>{
  const relatedItemsStore = useLocalStore(() => new RelatedItemsStore())
  useEffect(() => {
    relatedItemsStore.get(product)
  }, [product, relatedItemsStore])
  const relatedItems = relatedItemsStore.list
  return (
    <section className={styles.relatedItems}>
      <div className={styles.txt}>Related Items</div>
      <div className={styles.grid}>
        {relatedItems?.state==='fulfilled'?
          relatedItems.value.map((product) =>
            (<Link key={product.id} to={ROUTES.product.get(product.id)}>
              <Card {...ProductModelToCardProps(product)} actionSlot={<Button onClick={(e)=>{e.preventDefault(); e.stopPropagation(); /* add to cart */ rootStore.cart.add(product);}}>Add to Cart</Button>}/>
            </Link>)
          ):<Loader/>
        }
      </div>
    </section>
  )
}

export default observer(RelatedItems)