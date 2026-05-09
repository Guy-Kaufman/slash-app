import './SecondaryButton.css'

function SecondaryButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'default',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`secondary-button secondary-button--${variant} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default SecondaryButton
