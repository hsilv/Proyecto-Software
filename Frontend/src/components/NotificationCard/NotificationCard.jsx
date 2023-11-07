import React, { useEffect } from "react";
import styles from './NotificationCard.module.css';

const NotificationCard = ({ callback, notification, key }) => {

    return (
        <>
            <div key={key} className={styles.notificationCard} onClick={() => callback( notification )}>
                <div className={styles.notificationCardContent}>
                    <span className={styles.notificationHeader}>
                        <span className={styles.notificationSenderName}>{notification.description.split(' ')[0]} </span>
                        <span className={styles.notificationDescription}>{notification.description.split(' ').slice(1).map((word) => {return word + " "})}</span>
                    </span>
                    {notification.receta ? <p className={styles.recipeTitle}>Go to {notification.receta.nombre}</p> : <p className={styles.recipeTitle}>Check out their profile</p>}
                </div>
                <div className={styles.dot} />
            </div> 
        </>
    );
}

export default NotificationCard;