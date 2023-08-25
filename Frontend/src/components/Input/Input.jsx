import React from 'react'
import './Input.css'

const Input = ({
  label,
  name,
  value,
  onChange,
  type,
  required,
  placeholder,
  onKeyDown
}) => {
  return (
    <div className= 'inputContainer'>
      <label htmlFor={name}>
        <span>{label || name}{required ? '*' : ''}</span>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  )
}

export default Input