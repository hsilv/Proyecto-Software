import PropTypes from "prop-types";
import styles from "./Comment.module.scss";
import { NavLink } from "react-router-dom";

function Comment() {
  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.profile}>
          <NavLink to={"/"}>
            <img
              src="https://fakeimg.pl/50x50/ffffff"
              alt="Imagen de muestra"
              className={styles.pfp}
            />
          </NavLink>
          <span className={styles.nameSpan}>@theBlodingTrain25</span>
        </div>
        <div className={styles.utils}>
          <span>Alguna calificación</span>
          <span>Flag</span>
        </div>
      </div>
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        excepturi ex esse ad! Nam eius quaerat modi! Illo tempora maxime dolor
        repellat officia, eos vitae rerum tenetur saepe necessitatibus
        temporibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Nostrum odit cupiditate numquam repudiandae possimus vitae! Quis dolorem
        sit incidunt quasi vel. Optio quibusdam aliquam rem vero atque ratione
        maxime adipisci?
      </span>
    </div>
  );
}

Comment.propTypes = {};

export default Comment;
