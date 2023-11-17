import React, { useContext, useEffect, useState } from "react";
import styles from "./Step.module.css";

function Step({ step, id, removeCallback }) {

    return (
        <>
          <div className={styles.IngredientItem}>
            <span className={styles.stepNumber}>{id + 1}.</span>
            <p className={styles.stepDesc}>{step}</p>
            <span className={styles.deleteIcon} onClick={() => {removeCallback(id)}}>&times;</span>
          </div>
        </>
      );
};

export default Step;