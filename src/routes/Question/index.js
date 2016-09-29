import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'question/:questionId',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Question = require('./containers/QuestionContainer').default
      const reducer = require('./modules/Question').default

      injectReducer(store, { key: 'question', reducer })
      cb(null, Question)
    }, 'Question')
  }
})
