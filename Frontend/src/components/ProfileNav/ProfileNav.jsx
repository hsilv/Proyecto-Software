import styles from './ProfileNav.module.css'

// eslint-disable-next-line react/prop-types
function ProfileNav({ active, callback }) {
  return (
    <div className={styles.btnContainer}>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 1 ? styles.selected : styles.neutral}`}
        onClick={() => callback(1)}>
        Recetas
      </button>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 2 ? styles.selected : styles.neutral}`}
        onClick={() => callback(2)}>
        Favoritos
      </button>
      <button
        type="button"
        className={`${styles.sectionBtn} ${active === 3 ? styles.selected : styles.neutral}`}
        onClick={() => callback(3)}>
        Colecciones
      </button>
    </div>
  )
}

export default ProfileNav
