import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { ComplaintForm } from './ComplaintForm.jsx';

export function ComplaintEditView({ boundary, complaint, residents, isAdmin, onCancel, onSubmit }) {
  if (!complaint) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Keluhan tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Edit Keluhan</h2>
          <p>tampilkan detail keluhan</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <ComplaintForm
        residents={residents}
        initialValues={complaint}
        submitLabel="Simpan Perubahan"
        onCancel={onCancel}
        onSubmit={onSubmit}
        showStatus={isAdmin}
        lockResident={!isAdmin}
      />
    </Card>
  );
}
