import React, { useContext, useEffect, useState } from "react";
import styles from "./IngredientItem.module.css";

function IngredientItem({ ingredient, id, removeCallback }) {

    return (
        <>
          <div className={styles.IngredientItem}>
            <span>{ingredient[0]} - {ingredient[1]}</span>
            <span className={styles.deleteIcon} onClick={() => {removeCallback(id)}}>&times;</span>
          </div>
        </>
      );
};

export default IngredientItem;