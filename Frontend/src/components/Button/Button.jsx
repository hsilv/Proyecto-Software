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
      onClick={() => {
        if (!loading && !disabled) {
          onClick()
        }
      }}
      disabled={disabled}
    >
      <span>{loading ? '...' : children}</span>
    </button>
  )

export default Button