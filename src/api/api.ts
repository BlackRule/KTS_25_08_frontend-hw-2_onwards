import axios from 'axios'
import * as qs from 'qs'

const instance = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api'
})

export type APIResponse<T> = {
  data: T
}

export type CategoryFromAPI = {
  id: number,
  title: string
}
export type ImageFromAPI = {
  url: string
}
export type ProductFromAPI = {
  description: string,
  documentId: string,
  images: ImageFromAPI[],
  price: number,
  productCategory: CategoryFromAPI,
  title: string
}

export type Category = {
  id: number,
  name: string
}

export type Product = {
  category: Category,
  description: string,
  id: string,
  images: string[],
  price: number,
  title: string
}

function convertAPIProductToProduct(product: ProductFromAPI): Product {
  return {
    ...product,
    category: {
      id: product.productCategory.id,
      name: product.productCategory.title
    },
    id: product.documentId,
    images: product.images.map(img => img.url)
  }
}

function convertAPICategoryToCategory(category: CategoryFromAPI): Category {
  return {
    id: category.id,
    name: category.title
  }
}

export async function getProducts(category_id?: Category['id'], limit = -1) {
  let url = `/products?${qs.stringify({ populate: ['images', 'productCategory'] })}`
  if (category_id !== undefined)
    url += `&${qs.stringify({ filters: { productCategory: { id: { $eq: category_id } } } })}`
  if (limit !== -1) url += `&${qs.stringify({ pagination: { limit: limit } })}`
  const response = await instance.get<APIResponse<ProductFromAPI[]>>(
    url
  )

  return response.data.data.map(convertAPIProductToProduct)
}

export async function getProduct(id: string) {
  const response = await instance.get<APIResponse<ProductFromAPI>>(
    `/products/${id}?${qs.stringify({ populate: ['images', 'productCategory'] })}`
  )
  return convertAPIProductToProduct(response.data.data)
}

export async function getCategories() {
  const response = await instance.get<APIResponse<CategoryFromAPI[]>>('/product-categories')
  return response.data.data.map(convertAPICategoryToCategory)
}
