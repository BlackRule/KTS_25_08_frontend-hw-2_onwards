import {HTMLAttributes} from 'react'
import {Carousel} from 'react-responsive-carousel'
import {Product as ProductModel} from 'api'
import Button from 'components/Button'
import Text from 'components/Text'
import styles from './Product.module.scss'

type ProductProps = React.PropsWithChildren<{
  product:ProductModel
}> & HTMLAttributes<HTMLDivElement>;

const Product=({product}:ProductProps)=>{
  return (
    <section className={styles.product}>
      <Carousel showArrows={true} swipeable useKeyboardArrows emulateTouch /*className={styles.img}*/>
        {product.images.map((img) =>
          <div key={img}>
            <img src={img}/>
          </div>
        )}
      </Carousel>
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