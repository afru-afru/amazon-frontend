
import Header from '../Header/Header'
import PropTypes from 'prop-types';
function LayOut({children}) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}
// PropTypes validation
LayOut.propTypes = {
    children: PropTypes.node.isRequired, // 'children' can be any renderable node
  };


export default LayOut
