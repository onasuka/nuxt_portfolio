import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
// import headlines from '~/store/headlines'

/* eslint import/no-mutable-exports: 0 */
// let authStore: headlines

function initialiseStores(store: Store<any>): void {
  // authStore = getModule(headlines, store)
}

export {
  initialiseStores,
  // authStore
}