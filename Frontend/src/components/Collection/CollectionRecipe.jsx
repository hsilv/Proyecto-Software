import { useEffect, useState } from 'react';
import styles from './CollectionRecipe.module.scss'
import {FaRegClock} from 'react-icons/fa'

export default function CollectionRecipe({recipe}) {

    const [time, setTime] = useState('');

    useEffect(() => {
        if(recipe.tiempo && recipe.tiempo > 0){
            const hours = Math.floor(recipe.tiempo / 60);
            const minutes = recipe.tiempo - (hours * 60);
            if(hours === 0){
                setTime(`${minutes} minutos`);
            } else if (hours === 1) {
                setTime(`${hours} hora ${minutes} minutes`);
            } else {
                setTime(`${hours} horas ${minutes} minutes`);
            }
        }
    })

  return (
    <div className={styles.recipeContainer}>
        <div className={styles.recipeMiniContainer}>
            <img src={recipe.miniatura? recipe.miniatura[0].url : 'https://fakeimg.pl/1920x1080/35356e'} alt="Recipe Mini" className={styles.recipeMini}/>
        </div>
        <div className={styles.recipeDataContainer}>
            <h2>{recipe.nombre}</h2>
            <div className={styles.author}>
                {'@'+recipe.usuario.username}
            </div>
            {recipe.descripcion}
            <div className={styles.recipeFooter}>
                <FaRegClock/>
                {time}
            </div>
        </div>
    </div>
  )
}
