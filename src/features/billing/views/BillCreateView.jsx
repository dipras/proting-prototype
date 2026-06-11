import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';

export function BillCreateView({ boundary, residents, onCancel, onSubmit }) {
  const submit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Buat Tagihan</h2>
          <p>tampilkan form tagihan</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <form className="form-grid room-form" onSubmit={submit}>
        <FormField label="Penghuni aktif">
          <select name="residentId" required>
            {residents.map((resident) => (
              <option value={resident.id} key={resident.id}>{resident.name}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Periode">
          <input name="period" defaultValue="Juni 2026" required />
        </FormField>
        <FormField label="Nominal">
          <input name="amount" type="number" min="1" defaultValue="1000000" required />
        </FormField>
        <div className="form-actions">
          <Button variant="secondary" onClick={onCancel}>Batal</Button>
          <Button type="submit">Simpan Tagihan</Button>
        </div>
      </form>
    </Card>
  );
}
