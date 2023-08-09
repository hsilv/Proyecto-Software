import React, { useState } from 'react';
import styles from './Carousel.module.css';
import { BiTime, BiBookmarkAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const formatTime = (time) => {
  let hours = Math.floor(time / 60);
  let remainingMinutes = time % 60;

  let formattedTime = '';

  if (hours > 0) formattedTime += `${hours} hrs `;
  if (remainingMinutes > 0) formattedTime += `${remainingMinutes} min`;
  return formattedTime.trim();
};

const Carousel = ({ recipes }) => {

  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const navigate = useNavigate();

  const moveIndex = (value) => {
    if(!(currentRecipeIndex + value > recipes.length - 1 || currentRecipeIndex + value < 0)) {
      setCurrentRecipeIndex(currentRecipeIndex + value);
    }
  }

  const handleRedirection = (recipeID) => {
      navigate("/recipe/" + recipeID);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.images_container}>
          <button type='button' aria-label='left-arrow' onClick={() => {moveIndex(-1)}}>
            <img className={styles.arrow} src='/assets/left-arrow.png' alt="Left Arrow" />
          </button>
          <div className={styles.img_container}>
            <img alt="recipeImage" src={recipes[currentRecipeIndex]?.miniatura[0] ? recipes[currentRecipeIndex]?.miniatura[0].url : 'https://fakeimg.pl/1920x1080/ff0000'} onClick={() => {handleRedirection(recipes[currentRecipeIndex]?.id)}}></img>
          </div>
          <button type='button' aria-label='right-arrow' onClick={() => {moveIndex(1)}}>
            <img style={{ transform: 'scaleX(-1)' }} className={styles.arrow} src='/assets/left-arrow.png' alt="Right Arrow" />
          </button>
        </div>
        <div className={styles.information_container}>
          <div className={styles.title_container}>
            <h1 aria-label='titleText' style={{marginRight: '20px'}}>{recipes[currentRecipeIndex]?.nombre}</h1>
            <BiBookmarkAlt color='#f6ae2d' size={45} />
          </div>
            <div className={styles.time_container}>
              <BiTime color='#FFF' size={'30px'} />
              <h2 style={{padding: '0px 20px'}}>{formatTime(recipes[currentRecipeIndex]?.tiempo)}</h2>
            </div>
          <h2>Recipe Submitted By: {recipes[currentRecipeIndex]?.usuario.username}</h2>
          <p>{recipes[currentRecipeIndex]?.descripcion}</p>
          <h2>Average Rating: {recipes[currentRecipeIndex]?.avg_calificacion}</h2>
        </div>
      </div>
    </>
  );
};

export default Carousel;
