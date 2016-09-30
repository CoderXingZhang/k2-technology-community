import React from 'react'
import RI from 'components/ReplyItem'

type Props = {
  id: String,
  cb: String,
  replies: Object,
  getReplies: Function,
  reply: Function
};
export class ReplyList extends React.Component {
  props: Props;

  componentWillMount () {
    this.props.getReplies(this.props.id)
  }

  render () {
    return (
      <div>
        {
          this.props.replies && this.props.replies.hits.hits.map((r, i) => {
            return (
              <RI key={i} r={r} cb={this.props.cb} reply={this.props.reply} qId={this.props.id} />
            )
          })
        }
      </div>
    )
  }
}

export default ReplyList
