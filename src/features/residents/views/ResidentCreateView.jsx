import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { ResidentForm } from './ResidentForm.jsx';

export function ResidentCreateView({ boundary, initialValues, onCancel, onSubmit }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Tambah Penghuni</h2>
          <p>tampilkan halaman form tambah penghuni</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <ResidentForm initialValues={initialValues} submitLabel="Simpan Penghuni" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
