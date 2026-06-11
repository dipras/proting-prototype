import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';
import { formatCurrency, getResidentName } from '../../../utils/formatters.js';

export function PaymentEditView({ boundary, bill, residents, onCancel, onSubmit }) {
  const [error, setError] = useState('');

  if (!bill) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Tagihan tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const nominal = Number(form.nominal);

    if (!nominal || nominal <= 0 || nominal !== Number(bill.amount)) {
      setError('tampilkan pesan validasi nominal');
      return;
    }

    if (bill.status === 'Lunas') {
      setError('Pembayaran sudah tercatat');
      return;
    }

    onSubmit({ paidAt: form.paidAt });
  };

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Catat Pembayaran</h2>
          <p>tampilkan detail tagihan</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      {error ? <div className="login-alert">{error}</div> : null}
      <form className="form-grid room-form" onSubmit={submit}>
        <FormField label="Penghuni">
          <input value={getResidentName(residents, bill.residentId)} readOnly />
        </FormField>
        <FormField label="Periode">
          <input value={bill.period} readOnly />
        </FormField>
        <FormField label="Nominal tagihan">
          <input value={formatCurrency(bill.amount)} readOnly />
        </FormField>
        <FormField label="Nominal pembayaran">
          <input name="nominal" type="number" min="1" defaultValue={bill.amount} required />
        </FormField>
        <FormField label="Tanggal pembayaran">
          <input name="paidAt" defaultValue="10 Juni 2026" required />
        </FormField>
        <div className="form-actions">
          <Button variant="secondary" onClick={onCancel}>Batal</Button>
          <Button type="submit">Catat Lunas</Button>
        </div>
      </form>
    </Card>
  );
}
