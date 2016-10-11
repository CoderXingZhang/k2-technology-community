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
      question={props.question.question} cb={props.question.cb} reply={props.reply}
      replies={props.question.replies} doLike={props.updateLikes} />
    <RL getReplies={props.fetchReplies} replies={props.question.replies} id={props.routeParams.questionId}
      reply={props.reply} cb={props.question.cb} doLike={props.updateLikes} />
  </div>
)

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  fetchQuestion: React.PropTypes.func.isRequired,
  fetchReplies: React.PropTypes.func.isRequired,
  reply: React.PropTypes.func.isRequired,
  updateLikes: React.PropTypes.func.isRequired
}

export default Question
