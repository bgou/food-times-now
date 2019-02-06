import { createStore } from 'redux'
import rootReducer from './rootReducer'

const configureStore = () => {
  const store = createStore(rootReducer)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store
}

export default configureStore
