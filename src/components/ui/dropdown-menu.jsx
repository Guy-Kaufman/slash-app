import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import './dropdown-menu.css'

function DropdownMenu({ children }) {
  return <RadixDropdown.Root>{children}</RadixDropdown.Root>
}

function DropdownMenuTrigger({ children, asChild }) {
  return <RadixDropdown.Trigger asChild={asChild}>{children}</RadixDropdown.Trigger>
}

function DropdownMenuContent({ children, align = 'end' }) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content className="ui-dropdown-content" align={align} sideOffset={4}>
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  )
}

function DropdownMenuItem({ children, onClick }) {
  return (
    <RadixDropdown.Item className="ui-dropdown-item" onClick={onClick}>
      {children}
    </RadixDropdown.Item>
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
