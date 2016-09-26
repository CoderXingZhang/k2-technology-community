import React from 'react'
import classes from './Input.scss'

type Props = {
  id: String,
  type: String,
  label: String,
  metric: String,
  min: Number,
  max: Number,
  description: String,
  defaultValue: String
};
export class Input extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.autoFocus = this.autoFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  autoFocus () {
    this.refs.textFields.focus()
  }

  handleFocus () {
    if (this.props.description) {
      this.refs.bubble.style.opacity = '1'
      this.refs.bubble.style.zIndex = '1'
    }
    this.refs.label.style.marginTop = '-20px'
    this.refs.label.style.color = '#666'
    this.refs.label.style.fontSize = '.7em'
  }

  handleBlur () {
    if (this.props.description) {
      this.refs.bubble.style.opacity = '0'
      this.refs.bubble.style.zIndex = '-1'
    }
    if (!this.refs.textFields.value) {
      this.refs.label.style.marginTop = 0
      this.refs.label.style.color = '#aaa'
      this.refs.label.style.fontSize = '1em'
    }
  }

  handleChange () {
    let currentValue = parseInt(this.refs.textFields.value)
    currentValue < this.props.min && (this.refs.textFields.value = this.props.min)
    currentValue > this.props.max && (this.refs.textFields.value = this.props.max)
  }

  componentDidMount () {
    if (this.props.defaultValue) {
      this.refs.label.style.marginTop = '-20px'
      this.refs.label.style.color = '#666'
      this.refs.label.style.fontSize = '.7em'
    }
  }

  render () {
    return (
      <div className={classes['container']}>
        <div ref='label' className={classes['label']} onClick={this.autoFocus}>
          {this.props.label}
        </div>
        <input id={this.props.id} type={this.props.type} ref='textFields' className={classes['text-fields']}
          onFocus={this.handleFocus} onBlur={this.handleBlur} defaultValue={this.props.defaultValue}
          onChange={this.handleChange} />
        <span className={classes.metric}>{this.props.metric}</span>
        <div ref='bubble' className={classes.bubble}>{this.props.description}</div>
      </div>
    )
  }
}

export default Input
