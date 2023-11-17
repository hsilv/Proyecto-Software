/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./CommentBlock.module.scss";
import PropTypes from "prop-types";
import { useRecipeComments } from "../../hooks/api/useComments";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import NewComment from "../NewComment/NewComment";

function CommentSkeleton() {
  return (
    <div className={styles.commentSkeleton}>
      <div className={styles.headingSkeleton}>
        <div className={styles.userInfoSkeleton}>
          <div className={styles.pfpSkeleton}></div>
          <div className={styles.usernameSkeleton}></div>
        </div>
        <div className={styles.toolsSkeleton}>
          <div className={styles.ratingSkeleton}></div>
          <div className={styles.buttonsSkeleton}></div>
        </div>
      </div>
      <div className={styles.bodySkeleton}></div>
    </div>
  );
}

function CommentBlock({ idRecipe, idReceiver }) {
  const { userInfo } = useContext(SessionContext);
  const [canComment, setCanComment] = useState(false);
  const [posted, setPosted] = useState(undefined);

  const {
    getRecipeComments,
    resultRecipeComments: comments,
    errorRecipeComments,
    loadingRecipeComments,
  } = useRecipeComments();

  useEffect(() => {
    getRecipeComments(idRecipe);
  }, []);

  useEffect(() => {
    if (comments && userInfo && Array.isArray(comments)) {
      const userComment = comments.find((comment) => {
        return comment.autor_id === userInfo.idUser;
      });
      if (userComment) {
        setCanComment(false);
      } else {
        setCanComment(true);
      }
    } else if (!errorRecipeComments) {
      setCanComment(true);
    } else {
      setCanComment(false);
    }
  }, [comments, userInfo]);

  useEffect(() => {
    console.log(posted);
  }, [posted])

  return (
    <>
      <div className={styles.title}>
        <h1>Comentarios</h1>
      </div>
      {loadingRecipeComments ? (
        <>
          <CommentSkeleton /> <CommentSkeleton />{" "}
        </>
      ) : (
        <>
          {canComment && !posted && <NewComment idRecipe={idRecipe} idReceiver={idReceiver} setPostedState={setPosted}/>}
          <div>Hola</div>
        </>
      )}
    </>
  );
}

CommentBlock.propTypes = {
  idRecipe: PropTypes.number.isRequired || PropTypes.string.isRequired,
  idReceiver: PropTypes.number.isRequired || PropTypes.string.isRequired,
};

export default CommentBlock;
