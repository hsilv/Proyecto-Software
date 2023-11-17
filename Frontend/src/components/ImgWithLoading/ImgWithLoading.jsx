import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ImgWithLoading.module.scss";

function ImgWithLoading({ src, alt, className, ...props }) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    if(src !== "https://via.placeholder.com/150"){
    setLoading(false);
    }
  };

  return (
    <div
      className={`${className} ${styles.imageWithLoading} ${
        loading ? styles.loadingHolder : null
      }`}
    >
      <div
        className={`${styles.loadingView} ${
          loading ? styles.loading : styles.gone
        }`}
      >
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <img src={src} alt={alt} {...props} onLoad={handleLoad} />
    </div>
  );
}

ImgWithLoading.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

ImgWithLoading.defaultProps = {
  className: "",
  src: "https://via.placeholder.com/150",
};

export default ImgWithLoading;
