import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { RoomForm } from './RoomForm.jsx';

export function RoomCreateView({ boundary, properties, initialValues, onCancel, onSubmit }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Tambah Kamar</h2>
          <p>tampilkan form input kamar</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <RoomForm properties={properties} initialValues={initialValues} submitLabel="Simpan Kamar" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
