import { connect } from 'react-redux'
import { getQuestion, deleteQuestion } from '../modules/Console'

import Console from '../components/Console'

const mapActionCreators = {
  getQuestion,
  deleteQuestion
}

const mapStateToProps = (state) => ({
  console: state.console
})

export default connect(mapStateToProps, mapActionCreators)(Console)
