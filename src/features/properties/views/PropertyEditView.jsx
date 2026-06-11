import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { PropertyForm } from './PropertyForm.jsx';

export function PropertyEditView({ boundary, property, onCancel, onSubmit }) {
  if (!property) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Properti tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card className="module-card property-boundary-view">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Edit Properti</h2>
          <p>Boundary form update properti, termasuk penggantian foto properti.</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <PropertyForm initialValues={property} submitLabel="Simpan Perubahan" onCancel={onCancel} onSubmit={onSubmit} />
    </Card>
  );
}
