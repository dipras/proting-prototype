import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { ComplaintForm } from './ComplaintForm.jsx';

export function ComplaintCreateView({ boundary, residents, currentUser, initialValues, onCancel, onSubmit }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Tambah Keluhan</h2>
          <p>tampilkan form tambah keluhan</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <ComplaintForm
        residents={residents}
        currentUser={currentUser}
        initialValues={initialValues}
        submitLabel="Simpan Keluhan"
        onCancel={onCancel}
        onSubmit={onSubmit}
        lockResident
      />
    </Card>
  );
}
