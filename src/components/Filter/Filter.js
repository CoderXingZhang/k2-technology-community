import React from 'react'
import './Filter.scss'

type Props = {
  tags: Array,
  filter: Function
};
export class Filter extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter (tag) {
    return () => {
      this.props.filter({
        'sort': [{ 'createdTime': 'desc' }],
        'query':
          // 'bool': {
            // 'should': [
              { 'match': { 'tags': `${tag}` } },
              // { 'match': { 'title': `${this.refs.searchText.value}` } }
            // ]
        'highlight': {
          'fields': {
            'tags': {}
          }
        },
        'from': 0,
        'size': 100
      })
    }
  }

  render () {
    return (
      <div className='Filter'>
        <div className='filter-header'>标签</div>
        <section>
          {
            this.props.tags && this.props.tags.map((t, i) => {
              return (
                <div key={i} className='filter-tag-label' onClick={this.handleFilter(t._source.tag)}>
                  {t._source.tag}
                </div>
              )
            })
          }
        </section>
      </div>
    )
  }
}

export default Filter
