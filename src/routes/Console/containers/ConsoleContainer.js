import { connect } from 'react-redux'
import { getQuestion, deleteQuestion, getTags, deleteTags } from '../modules/Console'

import Console from '../components/Console'

const mapActionCreators = {
  getQuestion,
  deleteQuestion,
  getTags,
  deleteTags
}

const mapStateToProps = (state) => ({
  console: state.console
})

export default connect(mapStateToProps, mapActionCreators)(Console)
