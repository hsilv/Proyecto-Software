import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileInfo.module.css';
import { SessionContext } from '../../context/sessionContext';
import { TbEdit, TbUpload } from 'react-icons/tb';

function ProfileInfo() {
  const { userInfo } = useContext(SessionContext);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    description: userInfo ? userInfo.desc : '',
  });

  useEffect(() => {
    console.table(userInfo);
  }, [userInfo]);
  

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUploadClick = () => {
  };

  const handleDescChange = (event) => {
    setEditedValues({
      description: event.target.value,
    });
  };

  const handleSave = () => {
    // Logica de backend
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedValues({
      description: userInfo ? userInfo.desc : 'User description goes here...',
    });
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
              <p>@ {userInfo ? userInfo.username : 'Username'}</p>
            </div>
            <div className={styles.userIcon}>
              {editMode ? (
                <div className={styles.editContent}>
                  <TbUpload fontSize={'25px'} onClick={handleUploadClick} />
                  <button className={styles.profileButton} onClick={handleSave}>Save</button>
                  <button className={styles.secprofileButton} onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <TbEdit fontSize={'30px'} onClick={handleEditClick} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bioInformation}>
        {editMode ? (
          <textarea
            className={styles.textAreaStyle}
            placeholder='Enter your new bio here'
            maxLength={70}
            value={editedValues.description}
            onChange={handleDescChange}
          />
        ) : (
          <>
            <p>
              <b>{userInfo ? userInfo.followers : '0'} Followers</b>
            </p>
            <p>&quot;{editedValues.description}&quot;</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
