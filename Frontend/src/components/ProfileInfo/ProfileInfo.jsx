import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileInfo.module.css';
import { SessionContext } from '../../context/sessionContext';
import { TbEdit } from 'react-icons/tb';

function ProfileInfo() {
  const { userInfo } = useContext(SessionContext);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(["", ""]);

  useEffect(() => {
    console.table(userInfo);
  }, [userInfo]);

  const handleDescChange = (event) => {
    setEditedValues([editedValues[0], event.target.value]);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedValues(["", ""]);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerImage}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <div className={styles.profileImage}>
            <img
              src={`https://fakeimg.pl/400x400/f26fb7/ffffff?text=${userInfo.username}`}
              alt="Profile"
            />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userInfoColumn}>
              <h1>{userInfo ? userInfo.name : 'Full name'}</h1>
              <p>@{userInfo ? userInfo.username : 'Username'}</p>
            </div>
            <div className={styles.userIcon}>
              <TbEdit fontSize={'30px'} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bioInformation}>
        <p><b>{userInfo ? userInfo.followers : '0'} Followers</b></p>
        <p>&quot;{userInfo ? userInfo.desc : 'User description goes here.'}User description goes here.&quot;</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
