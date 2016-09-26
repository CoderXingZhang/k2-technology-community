import React from 'react'
import './Wiki.scss'

export const Wiki = () => (
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
      search_content
    </div>
  </div>
)

export default Wiki
