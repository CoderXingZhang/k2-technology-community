import { connect } from 'react-redux'
import { fetchQuestion, reply, fetchReplies, updateLikes } from '../modules/Question'

import Question from '../components/Question'

const mapActionCreators = {
  fetchQuestion,
  fetchReplies,
  reply,
  updateLikes
}

const mapStateToProps = (state) => ({
  question: state.question
})

export default connect(mapStateToProps, mapActionCreators)(Question)
