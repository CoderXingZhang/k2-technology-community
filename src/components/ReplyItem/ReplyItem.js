import React from 'react'
import './ReplyItem.scss'

type Props = {
  r: Object
};
export class ReplyItem extends React.Component {
  props: Props;

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
      </div>
    )
  }
}

export default ReplyItem
