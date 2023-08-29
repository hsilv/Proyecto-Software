import Comment from '../Comment/Comment';
import styles from './CommentBlock.module.scss'

function CommentBlock() {
    return(
        <div className={styles.commentBlock}>
            <h1 className={styles.title}>Comentarios</h1>
            <Comment />
        </div>
    );
}

export default CommentBlock;