import * as RadixSelect from '@radix-ui/react-select'
import './select.css'

function Select({ children, value, onValueChange, defaultValue }) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      {children}
    </RadixSelect.Root>
  )
}

function SelectTrigger({ children, className = '' }) {
  return (
    <RadixSelect.Trigger className={`ui-select-trigger ${className}`}>
      {children}
      <RadixSelect.Icon className="ui-select-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

function SelectValue({ placeholder }) {
  return <RadixSelect.Value placeholder={placeholder} />
}

function SelectContent({ children }) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content className="ui-select-content" position="popper" sideOffset={4}>
        <RadixSelect.Viewport className="ui-select-viewport">
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
}

function SelectItem({ children, value }) {
  return (
    <RadixSelect.Item className="ui-select-item" value={value}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
