import React from 'react';
import styles from './Carousel.module.css';
import { BiTime } from "react-icons/bi";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = `0${minutes}`;
  if (seconds <= 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const Carousel = ({ title, user, description, ratings, time }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.images_container}>
          <button type='button'>
            <img className={styles.arrow} src='/assets/left-arrow.png' alt="Left Arrow" />
          </button>
          <div className={styles.img_container}></div>
          <button type='button'>
            <img style={{ transform: 'scaleX(-1)' }} className={styles.arrow} src='/assets/left-arrow.png' alt="Right Arrow" />
          </button>
        </div>
        <div className={styles.information_container}>
          <div className={styles.title_container}>
            <h1>{title}</h1>
            <div className={styles.time_container}>
              <BiTime color='#FFF' size={'30px'} />
              <h2 style={{padding: '0px 20px'}}>{formatTime(time)} minutes</h2>
            </div>
          </div>
          <h2>Recipe Submitted By: {user}</h2>
          <p>{description}</p>
          <h2>Average Rating: {ratings}</h2>
        </div>
      </div>
    </>
  );
};

export default Carousel;
