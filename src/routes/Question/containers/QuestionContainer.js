import { connect } from 'react-redux'
import { fetchQuestion, reply, fetchReplies } from '../modules/Question'

import Question from '../components/Question'

const mapActionCreators = {
  fetchQuestion,
  fetchReplies,
  reply
}

const mapStateToProps = (state) => ({
  question: state.question
})

export default connect(mapStateToProps, mapActionCreators)(Question)
