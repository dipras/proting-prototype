import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';

export function RoomDeleteConfirm({ room, onCancel, onConfirm }) {
  return (
    <Modal title={room ? 'Hapus Kamar?' : null} onClose={onCancel}>
      <div className="confirm-copy">
        <strong>{room?.number}</strong>
        <p>tampilkan konfirmasi hapus</p>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button variant="danger" onClick={() => onConfirm(room)}>Hapus</Button>
      </div>
    </Modal>
  );
}
