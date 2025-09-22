import { configure } from 'mobx'

configure({
  computedRequiresReaction: true,
  observableRequiresReaction: true,
  reactionRequiresObservable: true,
  useProxies: 'ifavailable',
})
