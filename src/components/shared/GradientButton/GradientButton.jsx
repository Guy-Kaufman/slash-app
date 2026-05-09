import './GradientButton.css'

function GradientButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`gradient-button gradient-button--${variant} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default GradientButton
