import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { PropertyForm } from './PropertyForm.jsx';

export function PropertyCreateView({ boundary, initialValues, onCancel, onSubmit }) {
  return (
    <Card className="module-card property-boundary-view">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Tambah Properti</h2>
          <p>Boundary form input properti baru, termasuk foto properti.</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <PropertyForm initialValues={initialValues} submitLabel="Simpan Properti" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
