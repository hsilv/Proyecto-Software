import './IconButton.css'

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
      className={`${'IconButton'} ${type === 'primary' ? 'primary' : 'secondary'} ${classNames}`}
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