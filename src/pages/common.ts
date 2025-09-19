import {Product} from 'api'
import {CardProps} from 'components/Card'

export function ProductModelToCardProps(product:Product): CardProps {
  return {
    captionSlot:product.category.name,
    contentSlot:`$${product.price}`,
    description:product.description,
    image:product.images[0],
    title:product.title,

  }
}