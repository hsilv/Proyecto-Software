import Comment from "../Comment/Comment";
import styles from "./CommentBlock.module.scss";
import PropTypes from "prop-types";

function CommentBlock({ comments, loading }) {
  return (
    <>
      <div className={styles.title}>
        <h1>Comentarios</h1>
      </div>
      <div className={styles.commentBlock}>
        {comments ? (
          comments.map((value, index) => {
            return <Comment key={value + index} comment={value} />;
          })
        ) : loading ? (
          <div className={styles.loadingHolder}>...</div>
        ) : (
          <div className={styles.emptyBlock}>
            Vaya! Parece que nadie ha agregado un comentario aún...
          </div>
        )}
      </div>
    </>
  );
}

CommentBlock.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      autor_id: PropTypes.number,
      calificacion: PropTypes.number,
      comentario: PropTypes.string,
      fecha: PropTypes.string,
      id: PropTypes.number,
      receta_id: PropTypes.number,
      usuario: PropTypes.shape({
        username: PropTypes.string,
      }),
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CommentBlock;
