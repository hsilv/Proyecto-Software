import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import { useRecipeComments } from "../../hooks/api/useComments";
import styles from "./NewComment.module.scss";
import CherryRating from "../CherryRating/CherryRating";

function NewComment({ idRecipe, refreshTrigger }) {
  const { userInfo } = useContext(SessionContext);
  const [rating, setRating] = useState(1);
  const [posted, setPosted] = useState(false);
  const [globalError, setGlobalError] = useState(false);
  const [show, setShow] = useState(false);
  const {
    loadingRecipeComments: loading,
    errorRecipeComments: error,
    resultRecipeComments: result,
    checkUserComment,
    postRecipeComment,
  } = useRecipeComments();

  useEffect(() => {
    if (userInfo) {
      checkUserComment({
        id_user: userInfo.idUser,
        id_recipe: idRecipe,
      });
    } else {
      setGlobalError(true);
    }
  }, []);

  useEffect(() => {
    if (error) {
      setGlobalError(true);
    }
  }, [error]);

  useEffect(() => {
    if (globalError || loading) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [globalError, loading]);

  useEffect(() => {
    if (result) {
      if (result.found) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  }, [result]);

  const handleForm = async (ev) => {
    ev.preventDefault();
    await postRecipeComment({
      id_recipe: idRecipe,
      id_user: userInfo.idUser,
      comment: ev.target.commentInput.value,
      qualification: rating,
    });
    await checkUserComment({
      id_user: userInfo.idUser,
      id_recipe: idRecipe,
    });
    setPosted(true);
  };

  useEffect(() => {
    if (result) {
      if (result.found) {
        refreshTrigger(1);
      }
    }
  }, [posted, result]);

  return show ? (
    <div className={styles.newComment}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            src={userInfo?.pfp}
            alt="Foto de Perfil"
            className={styles.pfp}
          />
          <span className={styles.username}>@{userInfo.username}</span>
        </div>
        <div className={styles.qualification}>
          <CherryRating
            value={rating}
            className={styles.rating}
            onChange={setRating}
            readOnly={false}
          />
        </div>
      </div>
      <form
        className={styles.commentForm}
        id={`${userInfo?.idUser} comment`}
        onSubmit={handleForm}
      >
        <textarea
          name="commentInput"
          id="commentInput"
          cols="30"
          rows="5"
          form={`${userInfo?.idUser} comment`}
          className={styles.commentInput}
          maxLength={400}
        />
        <input
          type="number"
          name="rating"
          id="rating"
          value={rating}
          className={styles.numberRating}
          readOnly
        />
        <button type="submit" className={styles.sendButton}>
          Comentar
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}

NewComment.propTypes = {
  idRecipe: PropTypes.number.isRequired,
  refreshTrigger: PropTypes.func.isRequired,
};

export default NewComment;
