import React from "react";
import styles from "./Ratings.module.css";
import { Rate } from "antd";
import { TbCherryFilled } from "react-icons/tb";

const Ratings = ({ value, color }) => {
  const modifiedValue = Math.floor(
    value + (value % 1 > 0.5 ? 1 : value % 1 >= 0.25 ? 0.5 : 0)
  );

  return (
    <div className={styles.RatingsContainer}>
      <Rate
        character={
          <TbCherryFilled
            style={{
              fontSize: "24px",
            }}
          />
        }
        allowHalf
        disabled
        value={modifiedValue}
        style={{
          color: "#BF3545",
        }}
      />
      <h2 style={{ color: color }}>{value} out of 5</h2>
    </div>
  );
};

export default Ratings;
