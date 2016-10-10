import React from 'react'
import classes from './Console.scss'

export class Console extends React.Component {
  constructor (props) {
    super(props)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }

  deleteQuestion (id) {
    return () => {
      this.props.deleteQuestion(id)
    }
  }

  componentWillMount () {
    this.props.getQuestion()
  }

  render () {
    return (
      <div className={classes['Console']}>
        <p>Console</p>
        {
          this.props.console.ql && this.props.console.ql.hits.hits.map((q, i) => {
            return (
              <li key={i}>
                <strong>{q._source.title}</strong>
                <em><small> - {q._source.author} </small></em>
                <small><button onClick={this.deleteQuestion(q._id)}>删除</button></small>
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
  deleteQuestion: React.PropTypes.func.isRequired
}

export default Console
