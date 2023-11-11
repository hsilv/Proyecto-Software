// eslint-disable-next-line no-unused-vars
import React from "react";
import { createPortal } from "react-dom";
import styles from "./Loading.module.scss";

function Loading({ loading }) {
  return createPortal(
    <div className={`${styles.loadingC} ${loading ? styles.loading : styles.gone}`}>
      <div className={styles.spinner}>
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.pot}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M6 8H19V16C19 17.1046 18.1046 18 17 18H8C6.89543 18 6 17.1046 6 16V8Z"
              stroke="#333333"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="grey"
              fillOpacity={0.9}
            />{" "}
            <path
              d="M5 8H20"
              stroke="#333333"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M13.3333 6H11.6667L10 8H15L13.3333 6Z"
              stroke="#333333"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>
        <div className={styles.oil1}></div>
        <div className={styles.oil2}></div>
        <div className={styles.oil3}></div>

      </div>
    </div>,
    document.body
  );
}

Loading.propTypes = {};

export default Loading;
