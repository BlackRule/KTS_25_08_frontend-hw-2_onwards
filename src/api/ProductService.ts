import qs from 'qs';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api'
})

export type APIResponse<T> = {
  data:T
}

export type CategoryFromAPI = {
  id:number,
  title:string
}
export type ImageFromAPI = {
  url:string
}
export type ProductFromAPI = {
  'productCategory': CategoryFromAPI,
  'description': string,
  'documentId': string,
  'images': ImageFromAPI[],
  'price': number,
  'title': string
}

export type Category = {
  id:number,
  name:string
}

export type Product = {
    'category': Category,
    'description': string,
    'id': string,
    'images': string[],
    'price': number,
    'title': string
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
  };
}

export async function getProductsResponse(category_id?: Category['id'], limit = -1) {
  let url = `/products?${qs.stringify({ populate: ['images', 'productCategory'] })}`;
  if (category_id!==undefined)
    url+=`&${qs.stringify({filters:{productCategory: { id: { '$eq': category_id } }}})}`
  if(limit!==-1) url+=`&${qs.stringify({pagination:{limit:limit}})}`
  const response = await instance.get<APIResponse<ProductFromAPI[]>>(
    url
  );

  const products = response.data.data;

  return {
    ...response,
    data: products.map((product) => ({
      ...product,
      ...convertAPIProductToProduct(product),
    })),
  };
}
export async function getProductResponse(id: string) {
  const response = await instance.get<APIResponse<ProductFromAPI>>(
    `/products/${id}?${qs.stringify({ populate: ['images', 'productCategory'] })}`
  );

  const product = response.data.data;

  return {
    ...response,
    data: {
      ...product,
      ...convertAPIProductToProduct(product),
    },
  };
}
export async function getCategoriesResponse() {
  const response = await instance.get<APIResponse<CategoryFromAPI[]>>('/product-categories');

  const categories = response.data.data;

  return {
    ...response,
    data: categories.map((category) => ({
      id: category.id,
      name: category.title,
    })),
  };
}
