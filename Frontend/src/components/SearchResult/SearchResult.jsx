import React from "react";
import styles from "./SearchResult.module.css";
import { TbAlarm } from "react-icons/tb";

const formatTime = (time) => {
  let hours = Math.floor(time / 60);
  let remainingMinutes = time % 60;

  let formattedTime = "";

  if (hours > 0) formattedTime += `${hours} hrs `;
  if (remainingMinutes > 0) formattedTime += `${remainingMinutes} min`;
  return formattedTime.trim();
};

const truncateDescription = (description, maxWords) => {
  const words = description.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return description;
};

const SearchResult = ({ data, onClick }) => {
  const truncatedDescription = truncateDescription(
    data.descripcion || "No description available",
    30
  );

  return (
    <div className={styles.resultContainer} onClick={onClick}>
      <div className={styles.resultContainerImage}>
        <img src={data.miniatura[0] || ""} alt="Thumbnail" />
      </div>
      <div className={styles.resultContainerInfo}>
        <div className={styles.resultContainerTitle}>
          <h2>{data.nombre || "No title available"}</h2>
          <div className={styles.timeInformation}>
            <TbAlarm fontSize={"1.5rem"} />
            <h3>{formatTime(data.tiempo || 0)}</h3>
          </div>
        </div>
        <p>{truncatedDescription}</p>
      </div>
    </div>
  );
};

const SearchResultsList = ({ data, onClick }) => {
  return (
    <div>
      {data.map((item) => (
        <SearchResult key={item.id} data={item} onClick={() => onClick(item.id)}/>
      ))}
    </div>
  );
};

export default SearchResultsList;