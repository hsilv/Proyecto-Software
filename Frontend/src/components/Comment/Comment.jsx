import PropTypes from "prop-types";
import styles from "./Comment.module.scss";
import { NavLink } from "react-router-dom";

function Comment() {
  return (
    <div className={styles.container}>
      <NavLink to={"/"}>
        <img
          src="https://fakeimg.pl/50x50/ffffff"
          alt="Imagen de muestra"
          className={styles.pfp}
        />
      </NavLink>
      <span className={styles.nameSpan}>Usuario X</span>
    </div>
  );
}

Comment.propTypes = {};

export default Comment;
