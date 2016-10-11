import React from 'react'
import './Tags.scss'

type Props = {
  tags: Array,
  data: Array,
  handleTags: Function
};
export class Tags extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.addTags = this.addTags.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.unique = this.unique.bind(this)
  }

  unique (arr) {
    let hash = {}
    let newArr = []
    arr.map((t) => {
      if (!hash[t]) {
        hash[t] = 1
        newArr.push(t)
      }
    })
    return newArr
  }

  addTags (e) {
    if (e.target.innerText === '+') {
      if (this.refs.input.value) {
        this.props.tags.push(this.refs.input.value)
        this.props.handleTags(this.unique(this.props.tags))
        this.refs.input.value = ''
      } else {
        this.refs.input.focus()
      }
    } else {
      this.props.tags.push(e.target.innerText)
      this.props.handleTags(this.unique(this.props.tags))
    }
  }

  removeTag (tag) {
    return () => {
      this.props.handleTags(this.props.tags.filter((t) => t !== tag))
    }
  }

  render () {
    return (
      <div className='Tags'>
        <section className='tags-label-container'>
          {
            this.props.tags.map((t, i) => {
              return (
                <div key={i} className='tags-label' onClick={this.removeTag(t)}>{t}</div>
              )
            })
          }
        </section>
        <input ref='input' className='tags-input' />
        <button className='tags-add-btn' onClick={this.addTags}>+</button>
        {
          this.props.data.map((t, i) => {
            return (
              <label key={i} className='tags-options' onClick={this.addTags}>{t._source.tag}</label>
            )
          })
        }
      </div>
    )
  }
}

export default Tags
