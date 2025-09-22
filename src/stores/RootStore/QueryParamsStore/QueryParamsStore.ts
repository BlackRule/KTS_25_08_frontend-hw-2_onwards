import { action, makeObservable, observable } from 'mobx'
import * as qs from 'qs'

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {}
  private _search = ''

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    })
  }

  //TODO type this
  getParam(key: string) {
    return this._params[key]
  }

  getParams() {
    return this._params
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search
    if (this._search !== search) {
      this._search = search
      this._params = qs.parse(search)
    }
  }
}
