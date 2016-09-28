import { connect } from 'react-redux'
import New from '../components/New'
import { publish } from '../modules/New'

const mapActionCreators = {
  publish
}

const mapStateToProps = (state) => ({
  new: state.new
})

export default connect(mapStateToProps, mapActionCreators)(New)
