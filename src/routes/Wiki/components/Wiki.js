import React from 'react'
import QL from 'components/QuestionList'
import QS from 'components/QuestionSearch'
import './Wiki.scss'

export const Wiki = (props) => (
  <div >
    <div className='Wiki_component'>
      <QS getQuestion={props.getQuestion} />
    </div>
    <div className='col-xs-3 search_filter'>
      {}
    </div>
    <div className='col-xs-9 search_content'>
      <QL data={props.wiki} />
    </div>
  </div>
)

Wiki.propTypes = {
  wiki: React.PropTypes.object.isRequired,
  getQuestion: React.PropTypes.func.isRequired
}

export default Wiki
