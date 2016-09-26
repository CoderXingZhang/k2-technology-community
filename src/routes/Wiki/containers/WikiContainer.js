import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/Wiki'

import Wiki from '../components/Wiki'

const mapActionCreators = {
  increment: () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect(mapStateToProps, mapActionCreators)(Wiki)
