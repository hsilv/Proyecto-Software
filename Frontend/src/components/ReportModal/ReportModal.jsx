import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import styles from "./ReportModal.module.scss";
import AnyButton from "../AnyButton/AnyButton";
import { useRef } from "react";

function ReportModal({ setCloseModal, show }) {
  const formRef = useRef(null);

  const sendReport = () => {
    console.log("Mandar reporte");
  };

  const reportTypes = [
    "Mal vocabulario",
    "Comentario Irrespetuoso",
    "Opinión fuera de contexto",
  ];

  return (
    <Modal
      title="Reportar Comentario"
      setCloseState={setCloseModal}
      show={show}
    >
      <form className={styles.modalBody} ref={formRef} onSubmit={sendReport}>
        <div className={styles.caseList}>
          {reportTypes.map((value, index) => {
            return (
              <div className={styles.caseItem} key={value + "reportDiv"}>
                <input
                  name={`checkbox${index}`}
                  type="checkbox"
                  key={value + "report"}
                  className={styles.reportInput}
                />
                {value}
              </div>
            );
          })}
        </div>
        <span>¿Deseas dejar alguna observación?</span>
        <textarea
          name="observation"
          id="obsrecipe"
          cols="30"
          rows="10"
          className={styles.observation}
        ></textarea>
        <AnyButton classes={[styles.sendReportButton]} buttonType="submit">
          Enviar
        </AnyButton>
      </form>
    </Modal>
  );
}

ReportModal.propTypes = {
  setCloseModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

ReportModal.defaultProps = {
  show: false,
};

export default ReportModal;
