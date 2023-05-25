import React from 'react'
import styles from './Carousel.module.css'


const Carousel = ({title, user, description, ratings}) => {
    return(
        <>
          <div className={styles.container}>
            <div className={styles.images_container}>
              <button type='button'>
                <img className={styles.arrow} src='/assets/left-arrow.png'/>
              </button>
              <div className={styles.img_container}>
              </div>
              <button type='button'>
                <img style={{transform: 'scaleX(-1)'}} className={styles.arrow} src='/assets/left-arrow.png'/>
              </button>
            </div>
            <div className={styles.information_container}>
              <h1>{title}</h1>
              <h2>Recipe Submmited By: {user}</h2>
              <p>{description}</p>
              <h2>Ratings: {ratings}</h2>
            </div>
          </div>
        </>
    )
}

export default Carousel;
