import React, { useContext, useEffect, useState } from 'react';
import styles from './userProfile.module.css';
import { useAPI } from "../../hooks/useAPI";
import { useNotifications } from "../../hooks/api/useNotifications";

function UserProfile({ userVInfo, userInfo }) {
  const { fetchAPI } = useAPI();
  const [ isUserFollowing, setIsUserFollowing ] = useState(false);
  const {postNotification} = useNotifications();

  const isFollowing = async () => {
    const res = await fetchAPI({
      method: 'GET',
      route: `user/isFollowing?uID=${userInfo.idUser}&fID=${userVInfo.id}`,
      body: null,
      log: true,
      showReply: true,
    });

    setIsUserFollowing(res.length);
  }

  const toggleFollow = async () => {

    if(!isUserFollowing) {
      const res = await fetchAPI({
        method: 'POST',
        route: 'user/follow',
        body: JSON.stringify({
            uID: userInfo.idUser,
            fID: userVInfo.id,
        }),
        log: false,
        showReply: false,
      });
  
      if(res) {
          if(res.error){
            console.log(res);
          } else {
            setIsUserFollowing(!isUserFollowing);
          }
      }

      // TODO: Actualmente, se pueden spammear estas notificaciones modo insano.
      // Se debe revisar si ya existe una notificacion igual antes de llamar esto (o evitar entradas repetidas en la mera base de datos)
      postNotification(`${userInfo.username} is now following you <3`, userVInfo.id, userInfo.idUser, null);

    } else {
      const res = await fetchAPI({
        method: 'DELETE',
        route: 'user/unfollow',
        body: JSON.stringify({
          uID: userInfo.idUser,
          fID: userVInfo.id,
        }),
        log: false,
        showReply: false,
      });

      if(res) {
        if(res.error){
          console.log(res);
        } else {
          setIsUserFollowing(!isUserFollowing);
        }
      }

    }
  } 

  useEffect(() => {
    if(userInfo.idUser && userVInfo.id) isFollowing();
  }, [userInfo, userVInfo]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerImage}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <div className={styles.profileImage}>
            <img
              src={`https://fakeimg.pl/400x400/f26fb7/ffffff?text=${userVInfo.username}`}
              alt="Profile"
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userInfoColumn}>
              <h1>{userVInfo && userVInfo.name ? userVInfo.name : 'Full name'}</h1>
              <p>@ {userVInfo ? userVInfo.username : 'Username'}</p>
            </div>
            <div className={styles.userIcon}>
                <button className={styles.secprofileButton} onClick={toggleFollow}>{isUserFollowing ? 'Unfollow' : 'Follow'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bioInformation}>
        <p>
          <b>{userVInfo ? userVInfo.followers : '0'} Followers</b>
        </p>
        <p>&quot;{userVInfo && userVInfo.desc ? userVInfo.desc : 'User description goes here...'}&quot;</p>
      </div>
    </div>
  );
}

export default UserProfile;
