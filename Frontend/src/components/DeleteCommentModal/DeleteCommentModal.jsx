/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import styles from "./DeleteCommentModal.module.scss";
import { useEffect, useState } from "react";
import { useRecipeComments } from "../../hooks/api/useComments";

function DeleteCommentModal({ setCloseModal, show, idRecipe, onDelete }) {
  const [onDeleteComm, setOnDeleteComm] = useState(false);
  const [triggerToggle, setTriggerToggle] = useState(false);

  const {
    deleteRecipeOwnComment,
    loadingRecipeComments,
    resultRecipeComments,
  } = useRecipeComments();

  const handleDelete = () => {
    deleteRecipeOwnComment({ id_recipe: idRecipe });
    setOnDeleteComm(true);
  };

  useEffect(() => {
    if (onDeleteComm && !loadingRecipeComments && resultRecipeComments) {
      setTriggerToggle(true);
      onDelete();
    }
  }, [onDeleteComm, loadingRecipeComments, resultRecipeComments]);

  return (
    <Modal title="Borrar Comentario" setCloseState={setCloseModal} show={show} triggerToggle={triggerToggle}>
      <h4 className={styles.adv}>¿En serio quieres borrar este comentario?</h4>
      <span className={styles.tooltip}>
        Recuerda, esta acción es irreversible
      </span>
      <button className={styles.send} onClick={handleDelete}>
        {loadingRecipeComments ? (
          <div className={styles.loadingHolder}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : <span>Estoy seguro</span>}
      </button>
    </Modal>
  );
}

DeleteCommentModal.propTypes = {
  setCloseModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
  idRecipe: PropTypes.number.isRequired || PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DeleteCommentModal.defaultProps = {
  show: false,
};

export default DeleteCommentModal;
