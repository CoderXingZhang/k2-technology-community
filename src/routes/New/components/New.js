import React from 'react'
import './New.scss'
import Form from 'components/NewForm'

export const New = (props) => (
  <div className='New'>
    <section className='new-header'>
      <h2 className='new-question'>问题</h2>
      <span>请提出你的疑问。</span>
    </section>
    <Form publish={props.publish} cb={props.new} />
  </div>
)

New.propTypes = {
  new: React.PropTypes.object.isRequired,
  publish: React.PropTypes.func.isRequired
}

export default New
