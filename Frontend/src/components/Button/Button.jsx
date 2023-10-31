/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Button.css'

const Button = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
}) => (
    <button
      className={`${'button'} ${type === 'primary' ? 'primary' : 'secondary'}`}
      type='button'
      role='button'
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
      disabled={disabled || loading}
    >
      <span>{loading ? '...' : children}</span>
    </button>
  )

export default Button