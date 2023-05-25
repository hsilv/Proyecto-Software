import React from 'react'
import styles from './Carousel.module.css'


const Carousel = () => {
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
              <h1>Title Placeholder</h1>
              <h2>Recipe Submmited By: Andreita</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </>
    )
}

export default Carousel;
