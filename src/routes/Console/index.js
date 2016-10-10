import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'console',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Console = require('./containers/ConsoleContainer').default
      const reducer = require('./modules/Console').default

      injectReducer(store, { key: 'console', reducer })
      cb(null, Console)
    }, 'Console')
  }
})
