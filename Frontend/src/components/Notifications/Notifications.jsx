import React from "react";
import styles from './Notifications.module.css';
import NotificationCard from "../NotificationCard/NotificationCard";
import { useNavigate } from "react-router-dom";

const Notifications = ({ notifications, callback }) => {
    const navigate = useNavigate();

    const handleCardClick = ( notification ) => {
        callback(notification.id);
        if ( notification.receta ) {
            navigate("/Recipe/" + notification.receta.id);
        } else {
            navigate("/Profile/" + notification.usuario.username);
        }
        
    };

    const renderNotifications = (notifications) => {
        if ( notifications ) {
            if ( notifications.length > 0 ) {
                return notifications.map((notification, x) => {
                    return (
                        <NotificationCard key={x} callback={handleCardClick} notification={notification}/>
                    )
                });
            } else {
                return <p className={styles.noNotifications}>No notifications</p>;
            }
            
        } else {
            return <></>;
        }
    }

    return (
        <>
            <div className={styles.notificationCardContainer}>
                {renderNotifications(notifications)}
            </div>
        </>
    );
}

export default Notifications;