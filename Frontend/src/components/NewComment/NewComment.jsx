import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/sessionContext";
import { useRecipeComments } from "../../hooks/api/useComments";
import styles from "./NewComment.module.scss";
import { Rating } from "@smastrom/react-rating";

/* return GenIcon({
  tag: "svg",
  attr: {
    viewBox: "0 0 24 24",
    strokeWidth: "2",
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  child: [
    { tag: "path", attr: { stroke: "none", d: "M0 0h24v24H0z", fill: "none" } },
    {
      tag: "path",
      attr: { d: "M7.5 16.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" },
    },
    { tag: "path", attr: { d: "M17 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" } },
    { tag: "path", attr: { d: "M9 13c.366 -2 1.866 -3.873 4.5 -5.6" } },
    { tag: "path", attr: { d: "M17 15c-1.333 -2.333 -2.333 -5.333 -1 -9" } },
    {
      tag: "path",
      attr: {
        d: "M5 6c3.667 -2.667 7.333 -2.667 11 0c-3.667 2.667 -7.333 2.667 -11 0",
      },
    },
  ],
})(props); */

const cherryDrawing = (
  <>
    <path d="M0 0h24v24H0z" stroke="none" fill="none" strokeWidth={2} />
    <path
      d="M7.5 16.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0 "
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M17 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M9 13c.366 -2 1.866 -3.873 4.5 -5.6"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M17 15c-1.333 -2.333 -2.333 -5.333 -1 -9"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M5 6c3.667 -2.667 7.333 -2.667 11 0c-3.667 2.667 -7.333 2.667 -11 0"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
  </>
);

const customCherry = {
  itemShapes: cherryDrawing,
  activeFillColor: "#BF3545",
  inactiveFillColor: "transparent",
};

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

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const handleForm = async (ev) => {
    ev.preventDefault();
    console.log(ev.target.commentInput.value);
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
    setPosted(true)
  };

  useEffect(() => {
    if(result){
        if(result.found){
            refreshTrigger(1)
        }
    }
  }, [posted, result])


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
          <Rating
            value={rating}
            itemStyles={customCherry}
            className={styles.rating}
            onChange={setRating}
            isRequired
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
        <input type="number" name="rating" id="rating" value={rating} className={styles.numberRating} readOnly/>
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
