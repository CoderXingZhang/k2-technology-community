import React from 'react'
import './Console.scss'

export class Console extends React.Component {
  constructor (props) {
    super(props)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.deleteTags = this.deleteTags.bind(this)
  }

  deleteQuestion (id) {
    return () => {
      this.props.deleteQuestion(id)
    }
  }

  deleteTags (id) {
    return () => {
      this.props.deleteTags(id)
    }
  }

  componentWillMount () {
    this.props.getQuestion()
    this.props.getTags()
  }

  render () {
    return (
      <div className='Console'>
        <p>Tags</p>
        {
          this.props.console.tags && this.props.console.tags.hits.hits.map((q, i) => {
            return (
              <span className='console-tags' key={i}>
                {q._source.tag}
                <span className='console-delete' onClick={this.deleteTags(q._id)}>x</span>
              </span>
            )
          })
        }
        <hr />
        <p>Question</p>
        {
          this.props.console.ql && this.props.console.ql.hits.hits.map((q, i) => {
            return (
              <li key={i}>
                <strong>{q._source.title}</strong>
                <em><small> - {q._source.author} </small></em>
                <span className='console-delete' onClick={this.deleteQuestion(q._id)}>删除</span>
              </li>
            )
          })
        }
      </div>
    )
  }
}

Console.propTypes = {
  console: React.PropTypes.object.isRequired,
  getQuestion: React.PropTypes.func.isRequired,
  deleteQuestion: React.PropTypes.func.isRequired,
  getTags: React.PropTypes.func.isRequired,
  deleteTags: React.PropTypes.func.isRequired
}

export default Console
