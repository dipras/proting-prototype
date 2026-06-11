import React from 'react';
import { Button } from '../../../components/ui/Button.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';

export function RoomForm({ properties, initialValues, submitLabel, onCancel, onSubmit }) {
  const submit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <form className="form-grid room-form" onSubmit={submit}>
      <FormField label="Nomor kamar">
        <input name="number" defaultValue={initialValues.number} placeholder="K-04" required />
      </FormField>
      <FormField label="Properti">
        <select name="propertyId" defaultValue={initialValues.propertyId} required>
          {properties.map((property) => (
            <option value={property.id} key={property.id}>{property.name}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Tipe">
        <select name="type" defaultValue={initialValues.type} required>
          <option>Standard</option>
          <option>Deluxe</option>
          <option>Executive</option>
        </select>
      </FormField>
      <FormField label="Harga bulanan">
        <input name="price" type="number" min="0" defaultValue={initialValues.price} required />
      </FormField>
      <FormField label="Fasilitas">
        <textarea name="facilities" rows="3" defaultValue={initialValues.facilities} required />
      </FormField>
      <FormField label="Status kamar">
        <select name="status" defaultValue={initialValues.status} required>
          <option>Tersedia</option>
          <option>Terisi</option>
          <option>Perawatan</option>
        </select>
      </FormField>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
