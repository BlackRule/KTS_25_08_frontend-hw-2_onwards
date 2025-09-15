import {HTMLAttributes} from 'react'
import {Product as ProductModel} from 'api/ProductService'
import Button from 'components/Button'
import Text from 'components/Text'
import styles from './Product.module.scss'

type ProductProps = React.PropsWithChildren<{
    product:ProductModel
}> & HTMLAttributes<HTMLDivElement>;

const Product=({product}:ProductProps)=>{
  return (
    <section className={styles.Product}>
      <img src={product.images[0]} className={styles.img}/>
      <div>
        <Text view={'title'} className={styles.title}>{product.title}</Text>
        <Text view={'p-20'} color={'secondary'} className={styles.description}>
          {product.description}
        </Text>
        <Text className={styles.price} weight={'bold'} view={'title'}>${product.price}</Text>
        <Text className={styles.buttons}>
          <Button>Buy Now</Button>
          <Button skin={'secondary'}>Add to Chart</Button>
        </Text>
      </div>
    </section>
  )
}

export default Product