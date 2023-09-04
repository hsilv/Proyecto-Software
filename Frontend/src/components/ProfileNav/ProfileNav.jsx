import React, { useState } from 'react'
import './ProfileNav.css'

function ProfileNav({ active, callback }) {
  return (
    <div className="btnContainer">
      <button
        type="button"
        className={`sectionBtn ${active === 1 ? 'selected' : 'neutral'}`}
        onClick={() => callback(1)}>
        Recetas
      </button>
      <button
        type="button"
        className={`sectionBtn ${active === 2 ? 'selected' : 'neutral'}`}
        onClick={() => callback(2)}>
        Favoritos
      </button>
      <button
        type="button"
        className={`sectionBtn ${active === 3 ? 'selected' : 'neutral'}`}
        onClick={() => callback(3)}>
        Colecciones
      </button>
    </div>
  )
}

export default ProfileNav
