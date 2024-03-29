import styles from './CategoryCard.module.css';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ icon, name, value }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("/SearchPage/" + value);
    };

    return (
        <>
            <div className={styles.CategoryCardContainer} onClick={handleCardClick}>
                <div className={styles.IconContainer}>
                    {icon}
                </div>
                <h3>{name}</h3>
            </div>
        </>
    );
}

export default CategoryCard;