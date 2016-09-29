import React from 'react'
import './Question.scss'
import Description from 'components/QuestionDescription'
import RL from 'components/ReplyList'

type Props = {
  routeParams: Object
}

export const Question = (props: Props) => (
  <div className='Question'>
    <Description id={props.routeParams.questionId} getDescription={props.fetchQuestion}
      question={props.question.question} cb={props.question.cb} reply={props.reply} />
    <RL getReplies={props.fetchReplies} replies={props.question.replies} id={props.routeParams.questionId} />
  </div>
)

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  fetchQuestion: React.PropTypes.func.isRequired,
  fetchReplies: React.PropTypes.func.isRequired,
  reply: React.PropTypes.func.isRequired
}

export default Question
