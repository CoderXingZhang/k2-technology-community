import React from 'react'
import { Link } from 'react-router'
import './QuestionItem.scss'

type Props = {
  q: Object
};
export class QuestionItem extends React.Component {
  props: Props;

  componentDidUpdate () {
    // var tmp = document.createElement('div')
    // tmp.innerHTML = this.props.q._source.content
    // if (tmp.childNodes[0].innerText.length < 200) {
    //   this.refs.main.innerHTML = tmp.childNodes[0].innerText +
    //     [].slice.call(tmp.childNodes).find((n, i) => { return (i > 0 && n.innerText) }).innerText
    // } else {
    //   this.refs.main.innerHTML = tmp.childNodes[0].innerText
    // }
    if (this.props.q.highlight) {
      this.refs.main.innerHTML = this.props.q.highlight['content']
      ? this.props.q.highlight.content[0]
      : this.props.q._source.content
    } else {
      var tmp = document.createElement('div')
      tmp.innerHTML = this.props.q._source.content
      this.refs.main.innerHTML = tmp.childNodes[0].innerText
    }
    // (tmp.childNodes[0].innerText.length < 200)
    // ? `${tmp.childNodes[0].innerText}<br />` +
    //   [].slice.call(tmp.childNodes).find((n, i) => { return (i > 0 && n.innerText) }).innerText
    // : tmp.childNodes[0].innerText
  }

  render () {
    var date = new Date(this.props.q._source.createdTime)
    return (
      <div className='QuestionItem'>
        <div className='q-icon'>
          :icon:
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
              赞同 :<span className='info-likes'> {this.props.q._source.likes}</span>
            </p>
            <p className='info'>
              <span>标签 :</span>
              {
                this.props.q._source.tags.map((t, i) => {
                  if (this.props.q.highlight && this.props.q.highlight.tags &&
                    this.props.q.highlight.tags[0].indexOf(t) > -1) {
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
