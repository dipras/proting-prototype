import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

export function ComplaintDeleteConfirm({ complaint, onCancel, onConfirm }) {
  return (
    <Modal title={complaint ? 'Hapus Keluhan?' : null} onClose={onCancel}>
      <div className="confirm-copy">
        <strong>{complaint?.title}</strong>
        <p>tampilkan konfirmasi hapus</p>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={() => onConfirm(complaint)}>Hapus</Button>
      </div>
    </Modal>
  );
}
