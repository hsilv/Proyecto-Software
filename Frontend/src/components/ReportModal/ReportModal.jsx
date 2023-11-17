import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'

function ReportModal({ setCloseModal, show }) {
  return (
    <Modal title="Reportar Comentario" setCloseState={setCloseModal} show={show} >
        Hola
    </Modal>
  )
}

ReportModal.propTypes = {
    setCloseModal: PropTypes.func.isRequired,
    show: PropTypes.func.bool,
}

ReportModal.defaultProps = {
    show: false,
}

export default ReportModal
