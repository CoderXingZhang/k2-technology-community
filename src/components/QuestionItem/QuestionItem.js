import React from 'react'
import './QuestionItem.scss'

type Props = {
  q: Object
};
export class QuestionItem extends React.Component {
  props: Props;

  componentDidMount () {
    var tmp = document.createElement('div')
    tmp.innerHTML = this.props.q._source.content
    // if (tmp.childNodes[0].innerText.length < 200) {
    //   this.refs.main.innerHTML = tmp.childNodes[0].innerText +
    //     [].slice.call(tmp.childNodes).find((n, i) => { return (i > 0 && n.innerText) }).innerText
    // } else {
    this.refs.main.innerHTML = tmp.childNodes[0].innerText
    // }
  }

  render () {
    return (
      <div className='QuestionItem'>
        <div className='q-icon'>
          :icon:
        </div>
        <div className='q-content'>
          <section>
            <span className='title'>{this.props.q._source.title}</span>
          </section>
          <section>
            <p ref='main' className='main-text' />
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
