import PropTypes from "prop-types";
import styles from "./Comment.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {FiFlag} from 'react-icons/fi';
import { TbCherryFilled, TbFlag, TbFlagFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

function Comment() {
  const navigate = useNavigate();
  const [flagIcon, setFlagIcon] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transStyles, setTransStyles] = useState(false);

  const quali = 4.7;

  const mouseIn = () => {
    setTimeout(() => setFlagIcon(false), 100);
  }

  const mouseOut = () => {
    setTimeout(() => setFlagIcon(true), 100);
  }

  useEffect(() => {
    setFlagIcon(true);
    console.log((Math.round(quali * 2) / 2));
    console.log(Math.floor(4.5));
  }, [])

  const onUserClick = () => {
    navigate('/Profile/silva')
  }

  const onFlagClick = () => {
    setShowModal(true);
  }

  useEffect(() => {
    if(showModal){
      setTimeout(() => setTransStyles(true), 50)
    }
  }, [showModal])

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.profile}>
          <NavLink to={"/Profile/silva"}>
            <img
              src="https://fakeimg.pl/50x50/ffffff"
              alt="Imagen de muestra"
              className={styles.pfp}
            />
          </NavLink>
          <span className={styles.nameSpan} onClick={onUserClick}>@theBlodingTrain25</span>
          <span className={styles.date}>23 de Agosto de 2023</span>
        </div>
        <div className={styles.utils}>
          <div className={styles.qualification}><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/></div>
          <div className={styles.report} onMouseEnter={mouseIn} onMouseLeave={mouseOut} onClick={onFlagClick}>{flagIcon? <TbFlag/> : <TbFlagFilled/>}</div>
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
      <Modal show={showModal}>
        <div className={styles.repModal + ' ' + (transStyles? styles.repShowed : undefined)}>
          Hola
        </div>
      </Modal>
    </div>
  );
}

Comment.propTypes = {};

export default Comment;
