import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';

export function ResidentForm({ initialValues, submitLabel, onCancel, onSubmit }) {
  const submit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <form className="form-grid room-form" onSubmit={submit}>
      <FormField label="Nama penghuni">
        <input name="name" defaultValue={initialValues.name} required />
      </FormField>
      <FormField label="NIK">
        <input name="nik" defaultValue={initialValues.nik} required />
      </FormField>
      <FormField label="Nomor telepon">
        <input name="phone" defaultValue={initialValues.phone} required />
      </FormField>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
