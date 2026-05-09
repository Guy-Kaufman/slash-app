import * as RadixDialog from '@radix-ui/react-dialog'
import './dialog.css'

function Dialog({ children, open, onOpenChange }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  )
}

function DialogContent({ children }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="ui-dialog-overlay" />
      <RadixDialog.Content className="ui-dialog-content">
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}

function DialogHeader({ children }) {
  return <div className="ui-dialog-header">{children}</div>
}

function DialogTitle({ children }) {
  return <RadixDialog.Title className="ui-dialog-title">{children}</RadixDialog.Title>
}

function DialogDescription({ children }) {
  return <RadixDialog.Description className="ui-dialog-description">{children}</RadixDialog.Description>
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }
