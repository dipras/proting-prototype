import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { ResidentForm } from './ResidentForm.jsx';

export function ResidentEditView({ boundary, resident, onCancel, onSubmit }) {
  if (!resident) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Penghuni tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Edit Penghuni</h2>
          <p>tampilkan form edit penghuni</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <ResidentForm initialValues={resident} submitLabel="Simpan Perubahan" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
