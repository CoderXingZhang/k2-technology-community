import CoreLayout from '../layouts/CoreLayout/CoreLayout'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : require('./Wiki').default(store),
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./New').default(store)
      ])
    })
  }
})

export default createRoutes
