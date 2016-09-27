import React from 'react'
import QL from 'components/QuestionList'
import './Wiki.scss'

export const Wiki = (props) => (
  <div >
    <div className='Wiki_component'>
      <section className='container'>
        <input className='search_input' placeholder='搜索' />
        <button className='search_submit_btn'>搜索</button>
        {' 或 '}
        <button className='search_answer_btn'>提问</button>
      </section>
    </div>
    <div className='col-xs-3 search_filter'>
      search_filter
    </div>
    <div className='col-xs-9 search_content'>
      {console.log(props.wiki)}
      <QL getQuestion={props.getQuestion} data={props.wiki} />
    </div>
  </div>
)

Wiki.propTypes = {
  wiki: React.PropTypes.object.isRequired,
  getQuestion: React.PropTypes.func.isRequired
}

export default Wiki
