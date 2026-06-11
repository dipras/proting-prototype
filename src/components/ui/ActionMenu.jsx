import React from 'react';
import { Button } from './Button.jsx';

export function ActionMenu({ children }) {
  return <div className="action-menu">{children}</div>;
}

export function TextAction({ children, tone = 'default', ...props }) {
  return (
    <Button variant={tone === 'danger' ? 'danger-ghost' : 'ghost'} size="sm" {...props}>
      {children}
    </Button>
  );
}
