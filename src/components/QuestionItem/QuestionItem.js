import React from 'react'
import { Link } from 'react-router'
import './QuestionItem.scss'
import 'font-awesome/css/font-awesome.css'

type Props = {
  q: Object
};
export class QuestionItem extends React.Component {
  props: Props;

  componentDidUpdate () {
    var parser = new DOMParser()
    if (this.props.q.highlight) {
      this.refs.main.innerHTML = this.props.q.highlight['content']
      ? this.props.q.highlight.content[0]
      : parser.parseFromString(this.props.q._source.content, 'text/html')
        .childNodes[0].childNodes[1].childNodes[0].innerText
    } else {
      var el = parser.parseFromString(this.props.q._source.content, 'text/html')
      this.refs.main.innerHTML = el.childNodes[0].childNodes[1].childNodes[0].innerText
    }
  }

  render () {
    var date = new Date(this.props.q._source.createdTime)
    return (
      <div className='QuestionItem'>
        <div className='q-icon'>
          { this.props.q._source.replies === 0
            ? <i className='icon-start fa fa-comment-o' />
            : <i className='icon-ing fa fa-comments-o' />
          }
        </div>
        <div ref='qContent' className='q-content'>
          <section>
            <Link to={`/question/${this.props.q._id}`} className='title'>
              {this.props.q._source.title}
            </Link>
          </section>
          <section>
            <p ref='main' className='main-text' />
            <p className='info'>
              由 {this.props.q._source.author} 创建于 {date.toLocaleString()}
            </p>
            <p className='info'>
              回复 :<span className='info-replies'> {this.props.q._source.replies}</span>
              关注 :<span className='info-likes'> {this.props.q._source.likes}</span>
            </p>
            <p className='info'>
              <span>标签 :</span>
              {
                this.props.q._source.tags.map((t, i) => {
                  if (this.props.q.highlight && this.props.q.highlight.tags &&
                    this.props.q.highlight.tags[0].replace(/<em>|<\/em>/g, '').indexOf(t) > -1) {
                    return (
                      <span className='info-tag' key={i}>
                        <em>{t}</em>
                      </span>
                    )
                  } else {
                    return (
                      <span className='info-tag' key={i}>{t}</span>
                    )
                  }
                })
              }
            </p>
          </section>
        </div>
      </div>
    )
  }
}

export default QuestionItem
