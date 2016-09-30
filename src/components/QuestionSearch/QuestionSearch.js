import React from 'react'
import { Link } from 'react-router'
import './QuestionSearch.scss'

type Props = {
  getQuestion: Function
};
export class QuestionSearch extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch () {
    if (this.refs.searchText.value === '') {
      this.props.getQuestion({
        'sort': [{ 'createdTime': 'desc' }],
        'query': { 'match_all': {} },
        'from': 0,
        'size': 100
      })
    } else {
      this.props.getQuestion({
        'sort': [{ 'createdTime': 'desc' }],
        'query': {
          'bool': {
            'should': [
              { 'match': { 'content': `${this.refs.searchText.value}` } },
              { 'match': { 'title': `${this.refs.searchText.value}` } }
            ]
          }
        },
        'highlight': {
          'fields': {
            'content': {}
          }
        },
        'from': 0,
        'size': 100
      })
    }
  }

  componentWillMount () {
    this.props.getQuestion({
      'sort': [{ 'createdTime': 'desc' }],
      'query': { 'match_all': {} },
      'from': 0,
      'size': 100
    })
  }

  render () {
    return (
      <section className='container'>
        <input ref='searchText' className='search_input' placeholder='搜索' />
        <button type='submit' className='search_submit_btn' onClick={this.handleSearch}>搜索</button>
        {' 或 '}
        <Link to='/new'>
          <button className='search_answer_btn'>发起讨论</button>
        </Link>
      </section>
    )
  }
}

export default QuestionSearch
