import React from 'react'
import QI from 'components/QuestionItem'

type Props = {
  data: Object,
  getQuestion: Function
};
export class QuestionList extends React.Component {
  props: Props;

  componentWillMount () {
    this.props.getQuestion({
      'sort': [{ 'createdTime': 'desc' }],
      'query': { 'match_all': {} },
      'from': 0,
      'size': 100
    })
  }

  render () {
    return (
      <div>
        {
          this.props.data.ql && this.props.data.ql.hits.hits.map((q, i) => {
            return (
              <QI q={q} key={i} />
            )
          })
        }
      </div>
    )
  }
}

export default QuestionList
