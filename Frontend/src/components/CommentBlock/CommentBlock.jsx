import Comment from "../Comment/Comment";
import styles from "./CommentBlock.module.scss";

function CommentBlock() {
  return (
    <>
      <div className={styles.title}>
        <h1>Comentarios</h1>
      </div>
      <div className={styles.commentBlock}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </>
  );
}

export default CommentBlock;
