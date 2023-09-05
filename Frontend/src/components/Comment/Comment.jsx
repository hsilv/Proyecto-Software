import styles from "./Comment.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { TbCherryFilled, TbFlag, TbFlagFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import {CgClose} from 'react-icons/cg';
import AnyButton from "../AnyButton/AnyButton";

const reportTypes = ["Mal vocabulario", "Comentario Irrespetuoso", "Opinión fuera de contexto"];
const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function Comment({comment}) {
  const navigate = useNavigate();
  const [flagIcon, setFlagIcon] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transStyles, setTransStyles] = useState(false);
  const [date, setDate] = useState('');

  const quali = 4.7;

  const mouseIn = () => {
    setTimeout(() => setFlagIcon(false), 100);
  }

  const mouseOut = () => {
    setTimeout(() => setFlagIcon(true), 100);
  }

  useEffect(() => {
    setFlagIcon(true);
  }, [])

  const onUserClick = () => {
    navigate(comment? (comment.usuario? `/Profile/${comment.usuario.username}`: '/'): '/');
  }

  const onFlagClick = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setTransStyles(false);
  }

  const sendReport = () => {
    console.log("This should send a report");
  }

  useEffect(() => {
    if(showModal){
      setTimeout(() => setTransStyles(true), 50)
    }
  }, [showModal])

  useEffect(() => {
    if(comment.fecha){
      let date = comment.fecha.slice(0,10).split('-');

      const year = date[0];
      const month = months[parseInt(date[1] - 1)];
      const day = date[2];

      setDate(`${day} de ${month} de ${year}`);
    }
  }, [comment])

  return (
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.profile}>
          <NavLink to={comment? (comment.usuario? `/Profile/${comment.usuario.username}`: '/'): '/'}>
            <img
              src="https://fakeimg.pl/50x50/ffffff"
              alt="Imagen de muestra"
              className={styles.pfp}
            />
          </NavLink>
          <span className={styles.nameSpan} onClick={onUserClick}>{comment? (comment.usuario? `@${comment.usuario.username}`: undefined): undefined}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.utils}>
          <div className={styles.qualification}><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/><TbCherryFilled/></div>
          <div className={styles.report} onMouseEnter={mouseIn} onMouseLeave={mouseOut} onClick={onFlagClick}>{flagIcon? <TbFlag/> : <TbFlagFilled/>}</div>
        </div>
      </div>
      <span>
        {comment? comment.comentario: undefined}
      </span>
      <Modal show={showModal}>
        <div className={styles.repModal + ' ' + (transStyles? styles.repShowed : undefined)}>
          <div className={styles.reportBody + ' ' + (transStyles? styles.repBodyShowed : undefined)}>
            <div className={styles.modalHeader}>
              <h3>Reporte un Abuso</h3>
              <CgClose onClick={closeModal} className={styles.closeIcon}/>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.caseList}>
                {reportTypes.map((value) => {
                  return ( 
                  <div className={styles.caseItem} key={value+'reportDiv'}>
                    <input type="checkbox" key={value+'report'} className={styles.reportInput}/>
                    {value}
                  </div>
                  )
                })}
              </div>
              <span>¿Deseas dejar alguna observación?</span>
              <textarea name="Observation" id="obsrecipe" cols="30" rows="10" className={styles.observation}></textarea>
            </div>
            <div className={styles.modalFooter}>
              <AnyButton classes={[styles.sendReportButton]} onClick={sendReport}>
                Enviar
              </AnyButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Comment.propTypes = {};

export default Comment;
