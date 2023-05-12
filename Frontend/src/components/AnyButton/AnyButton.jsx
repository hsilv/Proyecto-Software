import './AnyButton.css'

const AnyButton = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  loading = false,
  classes = [],
}) => {
    const classNames = classes.join(' ');
    return(<button
      className={`${'AnyButton'} ${type === 'primary' ? 'primary' : 'secondary'} ${classNames}`}
      type='button'
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
      disabled={disabled}
    >
      <span>{loading ? '...' : children}</span>
    </button>)
}

export default AnyButton