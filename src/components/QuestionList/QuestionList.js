import React from 'react'
import QI from 'components/QuestionItem'

type Props = {
  data: Object
};
export class QuestionList extends React.Component {
  props: Props;

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
