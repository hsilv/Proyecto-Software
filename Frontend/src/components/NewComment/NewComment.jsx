/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import { useRecipeComments } from "../../hooks/api/useComments";
import { useNotifications } from "../../hooks/api/useNotifications";
import styles from "./NewComment.module.scss";
import CherryRating from "../CherryRating/CherryRating";

function NewComment({ idRecipe, setPostedState, idReceiver }) {
  const { userInfo } = useContext(SessionContext);
  const [rating, setRating] = useState(1);
  const ref = useRef(null);

  const {
    loadingRecipeComments: loading,
    errorRecipeComments: error,
    resultRecipeComments: result,
    postRecipeComment,
  } = useRecipeComments();

  const { postNotification } = useNotifications();

  const handleForm = async (ev) => {
    ev.preventDefault();
    await postRecipeComment({
      id_recipe: idRecipe,
      id_user: userInfo.idUser,
      comment: ev.target.commentInput.value,
      qualification: rating,
    });
    postNotification(
      `${userInfo.username} rated your recipe :)`,
      idReceiver,
      userInfo.idUser,
      idRecipe
    );
  };

  useEffect(() => {
    if (result && result.message === "Comentario hecho") {
      setPostedState({
        id_recipe: idRecipe,
        id_user: userInfo.idUser,
        comment: ref.current.commentInput.value,
        qualification: rating,
      });
    }
  }, [result]);

  return (
    <>
      {error && (
        <div className={styles.errorHolder}>
          <span className={styles.sad}>:(</span>
          <span>Parece que hubo un error al publicar tu comentario</span>
        </div>
      )}
      {loading ? (
        !error && (
          <div className={styles.loadingHolder}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )
      ) : (
        !error && <div className={styles.newComment}>
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <img
                src={userInfo?.pfp}
                alt="Foto de Perfil"
                className={styles.pfp}
              />
              <span className={styles.name}>{userInfo.name}</span>
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
            ref={ref}
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
      )}
    </>
  );
}

NewComment.propTypes = {
  idRecipe: PropTypes.number.isRequired || PropTypes.string.isRequired,
  idReceiver: PropTypes.number.isRequired || PropTypes.string.isRequired,
  setPostedState: PropTypes.func.isRequired,
};

export default NewComment;
