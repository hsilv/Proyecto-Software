import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'

function DeleteCommentModal({ setCloseModal, show }) {
  return (
    <Modal title="Borrar Comentario" setCloseState={setCloseModal} show={show} >
        Hola
    </Modal>
  )
}

DeleteCommentModal.propTypes = {
    setCloseModal: PropTypes.func.isRequired,
    show: PropTypes.func.bool,
}

DeleteCommentModal.defaultProps = {
    show: false,
}

export default DeleteCommentModal