import {makeAutoObservable} from 'mobx'
import {IPromiseBasedObservable,fromPromise} from 'mobx-utils'
import {Category, getCategories, getProduct, getProducts, Product} from 'api'
import {ILocalStore} from '../utils/useLocalStore'

export class CategoriesStore implements ILocalStore {
  categories?:IPromiseBasedObservable<Category[]>
  constructor(){
    makeAutoObservable(this)
  }

  destroy(): void {
        
  }
  get(){
    this.categories=fromPromise(getCategories())
  }

}

export class ProductStore implements ILocalStore {
  product?:IPromiseBasedObservable<Product>
  constructor(){
    makeAutoObservable(this)
  }

  destroy(): void {
        
  }
  get(id:string) {
    this.product=fromPromise(getProduct(id))
  }

}

export class RelatedItemsStore implements ILocalStore {
  list?:IPromiseBasedObservable<Product[]>
  constructor(){
    makeAutoObservable(this)
  }

  destroy(): void {
        
  }
  get(product:Product) {
    this.list=fromPromise(getProducts(product.category.id,3).then(
      (v)=>v.filter((v) => v.id !== product.id))
    )
  }

}

