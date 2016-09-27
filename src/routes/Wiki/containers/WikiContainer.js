import { connect } from 'react-redux'
import { getQuestion } from '../modules/Wiki'

import Wiki from '../components/Wiki'

const mapActionCreators = {
  getQuestion
}

const mapStateToProps = (state) => ({
  wiki: state.wiki
})

export default connect(mapStateToProps, mapActionCreators)(Wiki)
