/* eslint-disable no-unused-vars */
import styles from "./Comment.module.scss";
import { NavLink } from "react-router-dom";
import { TbFlag } from "react-icons/tb";
import { useEffect, useState, useContext, useRef } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { SessionContext } from "../../context/sessionContext";
import CherryRating from "../CherryRating/CherryRating";
import ReportModal from "../ReportModal/ReportModal";
import DeleteCommentModal from "../DeleteCommentModal";

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

function Comment({ comment, setOnDelete }) {

  const { userInfo } = useContext(SessionContext);
  const [isOwned, setOwned] = useState(false);
  const [date, setDate] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onFlagClick = () => {
    setShowReport(true);
  };

  const onDelete = () => {
    setDeleted(true);
    setOnDelete(true);
  }

  const onDeleteClick = () => {
    setShowDelete(true);
  };

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

  useEffect(() => {
    if (comment) {
      if (comment.fecha) {
        let date = comment.fecha.slice(0, 10).split("-");

        const year = date[0];
        const month = months[parseInt(date[1] - 1)];
        const day = date[2];

        setDate(`${day} de ${month} de ${year}`);
      }
    }
  }, [comment]);

  return (
    <>
      {!deleted && <div className={styles.container}>
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
            <span className={styles.nameSpan} /* onClick={onUserClick} */>
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
              <div className={styles.delete} onClick={onDeleteClick}>
                <AiTwotoneDelete />
              </div>
            )}
          </div>
        </div>
        <span className={styles.commentSpan}>
          {comment ? comment.comentario : "..."}
        </span>
      </div>}
      <ReportModal setCloseModal={setShowReport} show={showReport}/>
      <DeleteCommentModal setCloseModal={setShowDelete} show={showDelete} idRecipe={comment.receta_id} onDelete={onDelete}/>
    </>
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
  setOnDelete: PropTypes.func,
};

Comment.defaultProps = {
  setOnDelete: () => {},
};

export default Comment;
