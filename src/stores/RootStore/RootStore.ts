import QueryParamsStore from './QueryParamsStore'
import AuthStore from '../AuthStore'
import CartStore from '../CartStore'
export default class RootStore {
  readonly query = new QueryParamsStore()
  readonly auth = new AuthStore()
  readonly cart = new CartStore()
}
