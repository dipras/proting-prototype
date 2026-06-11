import React from 'react';

export function StatusBadge({ status }) {
  const key = String(status).toLowerCase().replace(/\s+/g, '-');
  return <span className={`status-badge ${key}`}>{status}</span>;
}
