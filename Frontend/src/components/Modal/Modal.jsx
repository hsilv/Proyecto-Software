import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export default function Modal({show, children}) {

  return (
    <>
        {
            show && createPortal(
                <>{
                    children
                }</>, 
                document.body
            )
        }
    </>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
}

Modal.defaultProps = {
  show: false,
  children: '',
}
