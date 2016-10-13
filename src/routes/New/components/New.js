import React from 'react'
import './New.scss'
import Form from 'components/NewForm'

export class New extends React.Component {

  render () {
    return (
      <div className='New'>
        <section className='new-header'>
          <h2 className='new-question'>新讨论</h2>
          <span>发起一波新的讨论，可以是各种疑难杂症的质问，也可以是建议或改进，又或者是技术积累和头脑风暴，甚至是吐槽。</span>
        </section>
        <Form publish={this.props.publish} new={this.props.new} />
      </div>
    )
  }
}

New.propTypes = {
  new: React.PropTypes.object.isRequired,
  publish: React.PropTypes.func.isRequired
}

export default New
