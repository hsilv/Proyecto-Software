import styles from "./RecipeSkeleton.module.scss";

function RecipeSkeleton() {
  return (
    <div className={styles.RecipePage}>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.tools}></div>
      </div>
      <div className={styles.rating}></div>
      <div className={styles.paragraph}></div>
      <div className={styles.details}></div>
      <div className={styles.similarBlock}>
        <div className={styles.similarTitle}></div>
        <div className={styles.similarRecipes}></div>
      </div>
      <div className={styles.ingredients}></div>
      <div className={styles.list}></div>
      <div className={styles.list}></div>
      <div className={styles.list}></div>
      <div className={styles.list}></div>
    </div>
  );
}

RecipeSkeleton.propTypes = {};

export default RecipeSkeleton;
