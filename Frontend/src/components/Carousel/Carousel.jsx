import React from 'react';
import styles from './Carousel.module.css';
import { BiTime, BiBookmarkAlt } from "react-icons/bi";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes <= 10) minutes = `0${minutes}`;
  if (seconds <= 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const Carousel = ({ title, user, description, ratings, time, img_url, callback}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.images_container}>
          <button type='button' onClick={() => {callback(-1)}}>
            <img className={styles.arrow} src='/assets/left-arrow.png' alt="Left Arrow" />
          </button>
          <div className={styles.img_container}>
            <img src={img_url}></img>
          </div>
          <button type='button' onClick={() => {callback(1)}}>
            <img style={{ transform: 'scaleX(-1)' }} className={styles.arrow} src='/assets/left-arrow.png' alt="Right Arrow" />
          </button>
        </div>
        <div className={styles.information_container}>
          <div className={styles.title_container}>
            <h1 style={{marginRight: '20px'}}>{title}</h1>
            <BiBookmarkAlt color='#f6ae2d' size={45} />
          </div>
            <div className={styles.time_container}>
              <BiTime color='#FFF' size={'30px'} />
              <h2 style={{padding: '0px 20px'}}>{formatTime(time)} minutes</h2>
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
