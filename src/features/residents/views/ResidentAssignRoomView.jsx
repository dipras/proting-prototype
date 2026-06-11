import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';
import { getPropertyName } from '../../../utils/formatters.js';

export function ResidentAssignRoomView({ boundary, resident, rooms, properties, onCancel, onSubmit }) {
  const availableRooms = rooms.filter((room) => room.status === 'Tersedia');

  if (!resident) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Penghuni tidak ditemukan</h2>
        <Button onClick={onCancel}>Kembali</Button>
      </Card>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    onSubmit(form.roomId);
  };

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Assign Kamar</h2>
          <p>tampilkan form assign kamar</p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          <ArrowLeft size={18} /> Kembali
        </Button>
      </div>
      <form className="form-grid room-form" onSubmit={submit}>
        <FormField label="Penghuni">
          <input value={resident.name} readOnly />
        </FormField>
        <FormField label="Kamar tersedia">
          <select name="roomId" required>
            {availableRooms.map((room) => (
              <option value={room.id} key={room.id}>
                {room.number} - {getPropertyName(properties, room.propertyId)}
              </option>
            ))}
          </select>
        </FormField>
        <div className="form-actions">
          <Button variant="secondary" onClick={onCancel}>Batal</Button>
          <Button type="submit">Assign Kamar</Button>
        </div>
      </form>
    </Card>
  );
}
