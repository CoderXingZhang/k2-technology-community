import React from 'react'
import './ReplyItem.scss'
import Editor from 'components/LiteEditor'

type Props = {
  r: Object,
  cb: String,
  qId: String,
  reply: Function
};
export class ReplyItem extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleReplyState = this.handleReplyState.bind(this)
    this.state = {
      replyState: false
    }
  }

  handleReplyState () {
    this.setState({ replyState: !this.state.replyState })
  }

  componentDidMount () {
    this.refs.main.innerHTML = this.props.r._source.content
  }

  render () {
    var date = new Date(this.props.r._source.createdTime)
    return (
      <div>
        <section className='reply-info'>
          <div className='reply-author'>{this.props.r._source.author}</div>
          <div className='reply-time'>{date.toLocaleString()} 回复 {this.props.r._source.to}</div>
          <div className='reply-content' ref='main' />
          <button className='reply-submit-btn' onClick={this.handleReplyState}>回复</button>
          <button className='reply-agree-btn'>有用({this.props.r._source.likes})</button>
        </section>
        {
          this.state.replyState && (
            <section className='question-reply-editor'>
              <Editor to={this.props.r && this.props.r._source.author} cd={this.props.cb}
                reply={this.props.reply} cancel={this.handleReplyState}
                id={this.props.qId} />
            </section>
          )
        }
      </div>
    )
  }
}

export default ReplyItem
