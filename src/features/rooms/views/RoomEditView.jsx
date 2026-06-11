import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { RoomForm } from './RoomForm.jsx';

export function RoomEditView({ boundary, room, properties, onCancel, onSubmit }) {
  if (!room) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Kamar tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Edit Kamar</h2>
          <p>tampilkan form edit kamar</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <RoomForm properties={properties} initialValues={room} submitLabel="Simpan Perubahan" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
