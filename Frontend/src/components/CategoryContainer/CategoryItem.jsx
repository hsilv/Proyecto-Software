import React, { useContext, useEffect, useState } from "react";
import styles from "./CategoryItem.module.css";

function CategoryItem({ name, id, removeCallback }) {

    return (
        <>
          <div className={styles.categoryItem}>
            <span>{name}</span>
            <span className={styles.deleteIcon} onClick={() => {removeCallback(id)}}>&times;</span>
          </div>
        </>
      );
};

export default CategoryItem;