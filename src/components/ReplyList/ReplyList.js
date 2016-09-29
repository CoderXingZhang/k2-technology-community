import React from 'react'
import RI from 'components/ReplyItem'

type Props = {
  id: String,
  replies: Object,
  getReplies: Function
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
              <RI key={i} r={r} />
            )
          })
        }
      </div>
    )
  }
}

export default ReplyList
