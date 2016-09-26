import { injectReducer } from '../../store/reducers'

import HomeView from '../Home/components/HomeView'

export default (store) => ({
  // path: 'wiki',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Wiki = require('./containers/WikiContainer').default
      const reducer = require('./modules/Wiki').default

      injectReducer(store, { key: 'Wiki', reducer })
      cb(null, Wiki)
    }, 'Wiki')
  }
})
