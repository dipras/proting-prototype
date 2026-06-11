import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

export function PropertyDeleteConfirm({ property, onCancel, onConfirm }) {
  return (
    <Modal title={property ? 'Hapus Properti?' : null} onClose={onCancel}>
      <div className="confirm-copy">
        <strong>{property?.name}</strong>
        <p>Properti akan dihapus jika tidak memiliki kamar aktif.</p>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={() => onConfirm(property)}>Hapus</Button>
      </div>
    </Modal>
  );
}
