/* eslint-disable react/prop-types */
import styles from './AnyButton.module.css'

const AnyButton = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
  classes = [],
  buttonType = 'button'
}) => {
    const classNames = classes.join(' ');
    return(<button
      className={`${styles.AnyButton} ${type === 'primary' ? 'primary' : 'secondary'} ${classNames}`}
      type={buttonType}
      onClick={() => {
        if (!loading && !disabled) {
          onClick ? onClick() : null;
        }
      }}
      disabled={disabled}
    >
      <span>{loading ? '...' : children}</span>
    </button>)
}

export default AnyButton