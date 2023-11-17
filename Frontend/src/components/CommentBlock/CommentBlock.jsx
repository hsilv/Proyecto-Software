/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./CommentBlock.module.scss";
import PropTypes from "prop-types";
import { useRecipeComments } from "../../hooks/api/useComments";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";

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

function CommentBlock({ idRecipe }) {
  const { userInfo } = useContext(SessionContext);
  const [canComment, setCanComment] = useState(false);

  const {
    getRecipeComments,
    resultRecipeComments: comments,
    loadingRecipeComments,
  } = useRecipeComments();

  useEffect(() => {
    getRecipeComments(idRecipe);
  }, []);

  useEffect(() => {
    if (comments && userInfo) {
      console.log(comments, userInfo);
      const userComment = comments.find((comment) => {
        return comment.autor_id === userInfo.idUser;
      });
      if (userComment) {
        setCanComment(false);
      }else{
        setCanComment(true);
      }
    }
  }, [comments, userInfo]);

  useEffect(() => {
    if (canComment) console.log("Puede comentar");
    else console.log("No puede comentar acá");
  }, [canComment]);

  return (
    <>
      <div className={styles.title}>
        <h1>Comentarios</h1>
      </div>
      {loadingRecipeComments ? (
        <>
          <CommentSkeleton /> <CommentSkeleton />{" "}
        </>
      ) : <>
        <div>Hola</div>
        {canComment && <div>Comentario para hacerse jeje</div>}
      </>}
    </>
  );
}

CommentBlock.propTypes = {
  idRecipe: PropTypes.number.isRequired,
};

export default CommentBlock;
