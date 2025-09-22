import axios from 'axios'
import * as qs from 'qs'

const instance = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api'
})

// Allow consumers to set/clear Authorization header
export function setAuthToken(jwt: string | null) {
  if (jwt) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
  } else {
    delete instance.defaults.headers.common['Authorization']
  }
}

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

export function postSignIn(email: string, password: string) {
  return instance.post('/auth/local', {
    identifier: email,
    password
  })
}

export function postSignUp(email: string, password: string) {
  return instance.post('/auth/local/register', {
    email,
    password,
    username: email.split('@')[0]
  })
}

// TODO test it and rename potentially
export function postForgotPassword(email: string) {
  return instance.post('/auth/forgot-password', {
    email
  })
}

// CART API
export type CartAPIItem = {
  id: number
  quantity: number
  product: any // server product shape; we'll convert to our Product
}

export async function getCart(): Promise<{ product: Product; qty: number; originalProductId?: number }[]> {
  const resp = await instance.get<CartAPIItem[]>(`/cart`)
  // resp.data is an array per probe results
  return resp.data.map((it) => ({
    product: convertAPIProductToProduct(it.product as ProductFromAPI),
    qty: it.quantity,
    originalProductId: (it as any).originalProductId,
  }))
}

export async function postCartAdd(params: { product: number; quantity?: number }) {
  const { product, quantity = 1 } = params
  return instance.post(`/cart/add`, { product, quantity })
}

export async function postCartRemove(params: { product: number; quantity?: number }) {
  const { product, quantity = 1 } = params
  return instance.post(`/cart/remove`, { product, quantity })
}

// Helper: resolve numeric product id by documentId (string)
export async function findProductNumericIdByDocumentId(documentId: string): Promise<number | null> {
  const query = qs.stringify({
    filters: { documentId: { $eq: documentId } },
    pagination: { limit: 1 },
  })
  const resp = await instance.get<any>(`/products?${query}`)
  const data = resp.data?.data
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0]
    if (first && typeof first.id === 'number') return first.id
  }
  return null
}