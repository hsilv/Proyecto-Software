import Comment from "../Comment/Comment";
import styles from "./CommentBlock.module.scss";

function CommentBlock({comments, loading}) {
  return (
    <>
      <div className={styles.title}>
        <h1>Comentarios</h1>
      </div>
      <div className={styles.commentBlock}>
        {comments? comments.map((value, index) => {
          return <Comment key={value+index} comment={value}/>
        }): (loading ? <div className={styles.loadingHolder}>...</div> : <div className={styles.emptyBlock}>Vaya! Parece que nadie ha agregado un comentario aún...</div>)}
      </div>
    </>
  );
}

export default CommentBlock;
