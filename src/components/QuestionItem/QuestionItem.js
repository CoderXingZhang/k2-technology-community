import React from 'react'
import './QuestionItem.scss'

type Props = {
  q: Object
};
export class QuestionItem extends React.Component {
  props: Props;

  render () {
    return (
      <div className='QuestionItem'>
        <div className='q-icon'>
          :ison:
        </div>
        <div className='q-content'>
          <section>
            <span className='title'>{this.props.q._source.title}</span>
          </section>
          <section>
            <p className='main-text'>
              {this.props.q._source.content}
            </p>
            <p className='info'>
              由 {this.props.q._source.author} 创建于 {this.props.q._source.createdTime}
            </p>
            <p className='info'>
              <span className='info-replies'>回复: {this.props.q._source.replies}</span>
              <span className='info-likes'>赞同: {this.props.q._source.likes}</span>
            </p>
          </section>
        </div>
      </div>
    )
  }
}

export default QuestionItem
