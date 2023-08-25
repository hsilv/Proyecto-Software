import React from "react";
import styles from './RecipeCard.module.css';
import { TbCherryFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Ratings from "../../components/Ratings/Ratings";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const imageUrl = recipe?.miniatura[0]?.url || 'https://fakeimg.pl/1920x1080/ff0000';
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative', 
  };

  const overlayStyle = {
    content: '',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: -1,
    borderRadius: '10px',
  };

  const handleCardClick = () => {
    navigate("/recipe/" + recipe.id);
  };

  return (
    <div className={styles.RecipeCardContainer} style={cardStyle} onClick={handleCardClick}>
      <div style={overlayStyle}></div>
      <h3 className={styles.username}>{recipe.usuario.username}</h3>
      <div className={styles.contentBottomRight}>
        <h1>{recipe.nombre}</h1>
        <div className={styles.ratingInfoContainer}>
          <TbCherryFilled color="#BF3545" fontSize={'1.7rem'} />
          <Ratings style={{ marginLeft: '10px' }} value={recipe.avg_calificacion} color={'#F2F2F2'}/>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
