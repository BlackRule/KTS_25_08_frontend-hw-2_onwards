import {action, computed, makeObservable, observable, reaction, runInAction} from 'mobx'
import {fromPromise} from 'mobx-utils'
import {Category, getProducts, Product} from 'api'
import {ELEMENTS_PER_PAGE} from '../config/config'
import {log} from '../utils/console'
import {LoadingState} from '../utils/loadingState'
import {ILocalStore} from '../utils/useLocalStore'
import rootStore from './RootStore'

export default class ProductsStore implements ILocalStore {
  //fullList->categoriesFilteredList->searchFilteredList->pagedList

  state: LoadingState = LoadingState.initial
  list: Product[] = []
  query = ''
  pageNumber = 0
  totalPages = 0
  selectedCategories: string[] = []

  constructor() {
    makeObservable<ProductsStore>(this, {
      categoryFilteredList: computed,
      getProductsList: action,
      list: observable.ref,
      pageNumber: observable,
      pagedList: computed,
      query: observable,
      searchFilteredList: computed,
      selectedCategories: observable,
      state: observable,
      totalPages: observable,
    })
  }

  destroy(): void {
    // this._qReaction()
    // this._pReaction()
    // this._recalculateTotalPagesReaction()
    // this._scReaction()
  }

  get categoryFilteredList() {
    if (this.selectedCategories.length === 0) {
      return this.list
    }
    return this.list.filter((v) =>
      this.selectedCategories.includes(`${v.category.id}`)
    )
  }

  get searchFilteredList() {
    const list = this.categoryFilteredList
    if (this.query === '') {
      return list
    }
    function includesLC(what: string, inclWhat: string) {
      return what.toLowerCase().includes(inclWhat.toLowerCase())
    }
    return list.filter((v) =>
      [v.title, v.description, v.category.name].some((v) =>
        includesLC(v, this.query)
      )
    )
  }

  private readonly _recalculateTotalPagesReaction = reaction(
    () => this.searchFilteredList,
    (list) => {
      if (!list) {
        this.totalPages = 0
        return
      }
      this.totalPages = Math.ceil(list.length / ELEMENTS_PER_PAGE)
      if (this.totalPages > 0 && this.pageNumber >= this.totalPages) {
        this.pageNumber = this.totalPages - 1
      }
    }
  )

  get pagedList() {
    const list = this.searchFilteredList
    const pn = this.pageNumber
    if (!list) {
      return list
    }
    return list.slice(
      pn * ELEMENTS_PER_PAGE,
      pn * ELEMENTS_PER_PAGE + ELEMENTS_PER_PAGE
    )
  }

  private readonly _scReaction = reaction(
    () => rootStore.query.getParam('sc'),
    (sc) => {
      this.selectedCategories = (sc as string[]) || []
    }
  )

  private readonly _qReaction = reaction(
    () => rootStore.query.getParam('q'),
    (q) => {
      this.query = (q as string) || ''
    }
  )
  private readonly _pReaction = reaction(
    () => rootStore.query.getParam('p'),
    (pp) => {
      const p = parseInt(pp as string) - 1
      this.pageNumber = p >= 0 ? p : 0
    }
  )

  async getProductsList(): Promise<void> {
    this.state = LoadingState.loading
    this.list = []
    try {
      const products = await getProducts()
      runInAction(() => {
        this.list = products
        this.state = LoadingState.success
      })
    } catch (e) {
      log(e)
      runInAction(() => {
        this.state = LoadingState.error
        this.list = []
      })
    }
    
  }

}