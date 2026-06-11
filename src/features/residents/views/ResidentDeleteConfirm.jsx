import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

export function ResidentDeleteConfirm({ resident, onCancel, onConfirm }) {
  return (
    <Modal title={resident ? 'Hapus Penghuni?' : null} onClose={onCancel}>
      <div className="confirm-copy">
        <strong>{resident?.name}</strong>
        <p>tampilkan konfirmasi hapus</p>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={() => onConfirm(resident)}>Hapus</Button>
      </div>
    </Modal>
  );
}
