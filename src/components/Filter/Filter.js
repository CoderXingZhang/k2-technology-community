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
    this.handleTagsFilter = this.handleTagsFilter.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.state = {
      sort: 'likes'
    }
  }

  handleSort (sort) {
    return (e) => {
      this.setState({ sort })
      this.props.filter({
        'sort': [{ [sort]: 'desc' }],
        'query': { 'match_all': {} },
        'from': 0,
        'size': 100
      })
    }
  }

  handleTagsFilter (tag) {
    return () => {
      this.props.filter({
        'sort': [{ 'createdTime': 'desc' }],
        'query': { 'match': { 'tags': `${tag}` } },
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
        <div className='filter-header'>排序方式</div>
        <section className='filter-module'>
          <label ref='likes' className={this.state.sort === 'likes' ? 'filter-ratio-active' : 'filter-ratio'}
            onClick={this.handleSort('likes')}>关注度</label>
          <label ref='replies' className={this.state.sort === 'replies' ? 'filter-ratio-active' : 'filter-ratio'}
            onClick={this.handleSort('replies')}>回复量</label>
          <label ref='createdTime'
            className={this.state.sort === 'createdTime' ? 'filter-ratio-active' : 'filter-ratio'}
            onClick={this.handleSort('createdTime')}>发布时间</label>
        </section>
        <div className='filter-header'>标签</div>
        <section className='filter-module'>
          {
            this.props.tags && this.props.tags.map((t, i) => {
              return (
                <div key={i} className='filter-tag-label' onClick={this.handleTagsFilter(t._source.tag)}>
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
