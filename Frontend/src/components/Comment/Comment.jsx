import styles from "./Comment.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { TbFlag } from "react-icons/tb";
import { useEffect, useState, useContext } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import Modal from "../Modal/Modal";
import { CgClose } from "react-icons/cg";
import AnyButton from "../AnyButton/AnyButton";
import PropTypes from "prop-types";
import { SessionContext } from "../../context/sessionContext";
import CherryRating from "../CherryRating/CherryRating";
import { useRecipeComments } from "../../hooks/api/useComments";

const reportTypes = [
  "Mal vocabulario",
  "Comentario Irrespetuoso",
  "Opinión fuera de contexto",
];
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function Comment({ comment }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(SessionContext);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isOwned, setOwned] = useState(false);
  const [transStyles, setTransStyles] = useState(false);
  const [date, setDate] = useState("");
  const {deleteRecipeOwnComment} = useRecipeComments();

  const onUserClick = () => {
    navigate(
      comment
        ? comment.usuario
          ? `/Profile/${comment.usuario.username}`
          : "/"
        : "/"
    );
  };

  const onFlagClick = () => {
    setShowReportModal(true);
  };

  const closeModal = () => {
    setShowReportModal(false);
    setShowDeleteModal(false);
    setTransStyles(false);
  };

  const sendReport = () => {
    console.log("This should send a report");
    closeModal();
  };

  const onDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const deleteComment = () => {
    console.log("This should delete a comment");
    deleteRecipeOwnComment({id_recipe: comment.receta_id});
    closeModal();
  }

  useEffect(() => {
    if (showReportModal || showDeleteModal) {
      setTimeout(() => setTransStyles(true), 50);
    }
  }, [showReportModal, showDeleteModal]);

  useEffect(() => {
    if (comment) {
      if (comment.fecha) {
        let date = comment.fecha.slice(0, 10).split("-");

        const year = date[0];
        const month = months[parseInt(date[1] - 1)];
        const day = date[2];

        setDate(`${day} de ${month} de ${year}`);
      }
      if (comment.usuario.username === userInfo.username) {
        setOwned(true);
      }
    }
  }, [comment, userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.profile}>
          <NavLink
            to={
              comment
                ? comment.usuario
                  ? `/Profile/${comment.usuario.username}`
                  : "/"
                : "/"
            }
          >
            <img
              src="https://fakeimg.pl/50x50/ffffff"
              alt="Imagen de muestra"
              className={styles.pfp}
            />
          </NavLink>
          <span className={styles.nameSpan} onClick={onUserClick}>
            {comment
              ? comment.usuario
                ? `@${comment.usuario.username}`
                : undefined
              : undefined}
          </span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.utils}>
          <div className={styles.qualification}>
            <CherryRating
              value={comment ? comment.calificacion : 0}
              readOnly={true}
              className={styles.cherries}
            />
          </div>
          {!isOwned && (
            <div className={styles.report} onClick={onFlagClick}>
              <TbFlag />
            </div>
          )}
          {isOwned && (
            <div className={styles.deleteOwn} onClick={onDeleteClick}>
              <AiTwotoneDelete />
            </div>
          )}
        </div>
      </div>
      <span className={styles.commentSpan}>
        {comment ? comment.comentario : "..."}
      </span>
      <Modal show={showReportModal}>
        <div
          className={
            styles.repModal + " " + (transStyles ? styles.repShowed : undefined)
          }
        >
          <div
            className={
              styles.reportBody +
              " " +
              (transStyles ? styles.repBodyShowed : undefined)
            }
          >
            <div className={styles.modalHeader}>
              <h3>Reporte un Abuso</h3>
              <CgClose onClick={closeModal} className={styles.closeIcon} />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.caseList}>
                {reportTypes.map((value) => {
                  return (
                    <div className={styles.caseItem} key={value + "reportDiv"}>
                      <input
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
                name="Observation"
                id="obsrecipe"
                cols="30"
                rows="10"
                className={styles.observation}
              ></textarea>
            </div>
            <div className={styles.modalFooter}>
              <AnyButton
                classes={[styles.sendReportButton]}
                onClick={sendReport}
              >
                Enviar
              </AnyButton>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={showDeleteModal}>
        <div
          className={
            styles.repModal + " " + (transStyles ? styles.repShowed : undefined)
          }
        >
          <div
            className={
              styles.reportBody +
              " " +
              (transStyles ? styles.repBodyShowed : undefined)
            }
          >
            <div className={styles.modalHeader}>
              <h3>Borrar Comentario</h3>
              <CgClose onClick={closeModal} className={styles.closeIcon} />
            </div>
            <div className={styles.modalBody}>
              <span className={styles.confirmMsg}>¿Estás seguro de borrar este comentario?</span>
              <span className={styles.tooltipMsg}>Recuerda, esta es una acción irreversible</span>
            </div>
            <div className={styles.modalFooter}>
              <AnyButton
                classes={[styles.sendReportButton]}
                onClick={deleteComment}
              >
                Estoy Seguro
              </AnyButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    autor_id: PropTypes.number,
    calificacion: PropTypes.number,
    comentario: PropTypes.string,
    fecha: PropTypes.string,
    id: PropTypes.number,
    receta_id: PropTypes.number,
    usuario: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

export default Comment;
