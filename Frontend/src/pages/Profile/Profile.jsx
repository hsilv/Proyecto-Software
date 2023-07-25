import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import ProfileNav from '../../components/ProfileNav/ProfileNav'
import style from './Profile.module.css'
import Edit from '/assets/edit-btn.svg'
/* import useApi from '../../hooks/useApi' */
import Button from '../../components/Button/Button'

function Profile({ username }) {
  const [selected, setSelected] = useState(1)
  const [editMode, setEditMode] = useState(false)
  const [editedValues, setEditedValues] = useState(['', ''])
/*   const { data, handleRequest } = useApi() */

  /* const getUserData = async (user) => {
    const response = await handleRequest('GET', '/userData?username=' + user)
  } */

  const showCurrent = () => {
    let currentStr
    if (selected === 1) {
      currentStr = 'Recetas'
    } else if (selected === 2) {
      currentStr = 'Favoritos'
    } else {
      currentStr = 'Colecciones'
    }
    return <span>{`${currentStr} de ${username}`}</span>
  }

  useEffect(() => {
    /* getUserData(username) */
  }, [])

  const handleNameChange = (event) => {
    setEditedValues([event.target.value, editedValues[1]])
  }

  const handleDescChange = (event) => {
    setEditedValues([editedValues[0], event.target.value])
  }

  /* const handleConfirm = async (name, desc) => {
    if (name === '' && data[3] !== '') {
      name = data[3]
    }
    if (desc === '' && data[4] !== '') {
      desc = data[4]
    }
    const response = await handleRequest('POST', '/updateUserData', {
      username,
      name,
      desc,
    })
    getUserData(username)
    setEditMode(false)
    setEditedValues(['', ''])
  } */

  const handleCancel = () => {
    setEditMode(false)
    setEditedValues(['', ''])
  }

  const loadInfo = () => {
    if (!editMode) {
      return (
        <>
          <button
            className={style.editBtn}
            onClick={() => setEditMode(true)}>
            <img src={Edit} />
          </button>
          {/* <span className={style.realName}>{data ? data[3] : 'Nombre'}</span> */}
          <span className={style.username}>@{username}</span>
          {/* <span className={style.username}>Followers: {data ? data[1] : ''}</span>
          <p className={style.desc}>{data ? data[4] : 'descripcion'}</p> */}
        </>
      )
    } else {
      return (
        <>
          <input
            type="text"
            /* defaultValue={data ? data[3] : ''} */
            placeholder="Nombre"
            maxLength={50}
            className="editInput"
            onChange={handleNameChange}
          />
          <span className={style.username}>@{username}</span>
         {/*  <span className={style.username}>Followers: {data ? data[1] : ''}</span> */}
          <textarea
            rows={6}
            type="text"
            /* defaultValue={data ? data[4] : ''} */
            placeholder="Descripción"
            maxLength={200}
            className="editInput Desc"
            onChange={handleDescChange}
          />
          <button
            className={style.formBtn}
            /* onClick={() => handleConfirm(editedValues[0], editedValues[1])} */
            /* disabled={
              (editedValues[0] === data[3] && editedValues[1] === data[4]) ||
              editedValues[0].length > 50 ||
              editedValues[1].length > 200
            } */>
            Confirmar cambios
          </button>
          <button
            onClick={handleCancel}
            className={style.formBtnSecondary}>
            Cancelar
          </button>
        </>
      )
    }
  }

  return (
    <>
      <NavBar />
      <div className={style.profileWrapper}>
        <div className={style.infoContainer}>
          <img
            className={style.pfp}
            src={`https://fakeimg.pl/400x400/f26fb7/ffffff?text=${username}`}
          />
          {loadInfo()}
        </div>
        <div className={style.recipesContainer}>
          <ProfileNav
            active={selected}
            callback={setSelected}
          />
          <div className={style.recipeViewer}>{showCurrent()}</div>
        </div>
      </div>
    </>
  )
}

export default Profile
