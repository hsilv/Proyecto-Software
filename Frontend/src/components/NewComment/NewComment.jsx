/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import { useRecipeComments } from "../../hooks/api/useComments";
import { useNotifications } from "../../hooks/api/useNotifications";
import styles from "./NewComment.module.scss";
import CherryRating from "../CherryRating/CherryRating";

function NewComment({ idRecipe, /*  refreshTrigger, */ idReceiver }) {
  const { userInfo } = useContext(SessionContext);
  const [rating, setRating] = useState(1);
  const {
    /*     loadingRecipeComments: loading,
    errorRecipeComments: error,
    resultRecipeComments: result, */
    checkUserComment,
    postRecipeComment,
  } = useRecipeComments();
  const { postNotification } = useNotifications();

  useEffect(() => {
    if (userInfo) {
      checkUserComment({
        id_user: userInfo.idUser,
        id_recipe: idRecipe,
      });
      console.log(userInfo);
    }
  }, []);

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
    postNotification(
      `${userInfo.username} rated your recipe :)`,
      idReceiver,
      userInfo.idUser,
      idRecipe
    );
  };

  return (
    <div className={styles.newComment}>
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
  );
}

NewComment.propTypes = {
  idRecipe: PropTypes.number.isRequired || PropTypes.string.isRequired,
  idReceiver: PropTypes.number.isRequired || PropTypes.string.isRequired,
};

export default NewComment;
