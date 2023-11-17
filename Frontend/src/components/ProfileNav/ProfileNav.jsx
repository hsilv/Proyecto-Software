import styles from './ProfileNav.module.css'

// eslint-disable-next-line react/prop-types
function ProfileNav({ active, callback }) {
  return (
    <div className={styles.btnContainer}>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 1 ? styles.selected : styles.neutral}`}
        onClick={() => callback(1)}>
        Recipes
      </button>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 2 ? styles.selected : styles.neutral}`}
        onClick={() => callback(2)}>
        Favourites
      </button>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 3 ? styles.selected : styles.neutral}`}
        onClick={() => callback(3)}>
        Collections
      </button>
    </div>
  )
}

export default ProfileNav
