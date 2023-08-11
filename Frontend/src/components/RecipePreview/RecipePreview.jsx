import React, { useState } from 'react';
import { BiStar, BiTime } from "react-icons/bi";
import styles from './RecipePreview.module.css';

const formatTime = (time) => {
    let hours = Math.floor(time / 60);
    let remainingMinutes = time % 60;
  
    let formattedTime = '';
  
    if (hours > 0) formattedTime += `${hours} hrs `;
    if (remainingMinutes > 0) formattedTime += `${remainingMinutes} min`;
    return formattedTime.trim();
  };

const RecipePreview = ({ recipe, callback }) => {
    return (
        <div className={styles.recipeContainer} onClick={() => {callback(recipe?.id)}}>
            <img src={recipe.miniatura && recipe.miniatura[0]?.url ? recipe.miniatura[0]?.url : 'https://fakeimg.pl/1920x1080/35356e'} />
            <span className={styles.recipeTitle}>{recipe?.nombre}</span>
            <div className={styles.recipeDetails}>
                <div>
                    <BiTime size={30} />
                    {formatTime(recipe?.tiempo)}
                </div>
                <div>
                    <BiStar size={30} />
                    {recipe?.avg_calificacion}
                </div>
            </div>
            
        </div>
    )
}

export default RecipePreview