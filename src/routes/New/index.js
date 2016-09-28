import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const New = require('./containers/NewContainer').default
      const reducer = require('./modules/New').default

      injectReducer(store, { key: 'new', reducer })
      cb(null, New)
    }, 'New')
  }
})
