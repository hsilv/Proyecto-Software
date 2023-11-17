/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import { CgClose } from "react-icons/cg";

export default function Modal({ show, children, title, setCloseState }) {
  const [transStyles, setTransStyles] = useState(false);

  const toggleModal = async () => {
    if (show) {
      setTransStyles(false);
      await setTimeout(() => setCloseState(false), 400);
    } else {
      setCloseState(true);
      setTimeout(() => setCloseState(true), 50);
    }
  };

  useEffect(() => {
    const initShow = async () => {
      if (show) {
        await setTimeout(() => setTransStyles(true), 50);
      } else {
        setTransStyles(false);
      }
    };
    initShow();
  }, [show]);

  return (
    <>
      {show &&
        createPortal(
          <>
            <div
              className={`${styles.modalView} ${
                transStyles && styles.backgTransition
              }`}
              onClick={toggleModal}
            >
              <div
                className={`${styles.modal} ${
                  transStyles && styles.transition
                }`}
              >
                <div className={styles.modalHeader}>
                  <h2>{title}</h2>
                  <button onClick={toggleModal} className={styles.closerModal}>
                    <CgClose />
                  </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

Modal.propTypes = {
  setCloseState: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
};

Modal.defaultProps = {
  setCloseState: () => {},
  show: false,
  children: "",
};
