import { injectReducer } from '../../store/reducers'

export default (store) => ({
  // path: 'wiki',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Wiki = require('./containers/WikiContainer').default
      const reducer = require('./modules/Wiki').default

      injectReducer(store, { key: 'wiki', reducer })
      cb(null, Wiki)
    }, 'Wiki')
  }
})
