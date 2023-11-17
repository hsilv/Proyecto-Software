/* eslint-disable react/prop-types */
import style from './Input.module.css'

const Input = ({
  label,
  name,
  value,
  onChange,
  type,
  required,
  placeholder,
  onKeyDown,
  min
}) => {
  return (
    <div className= {style.inputContainer}>
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
          min={min}
        />
      </label>
    </div>
  )
}

export default Input