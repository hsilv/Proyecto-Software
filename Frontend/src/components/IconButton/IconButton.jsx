/* eslint-disable react/prop-types */
import styles from './IconButton.module.css'

const IconButton = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
  classes = [],
}) => {
    const classNames = classes.join(' ');
    return(<button
      className={`${styles.IconButton} ${type === 'primary' ? 'primary' : 'secondary'} ${classNames}`}
      type='button'
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>)
}

export default IconButton