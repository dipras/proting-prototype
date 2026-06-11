import React from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { formatCurrency, getPropertyName, getResidentName } from '../../../utils/formatters.js';

export function RoomShowView({ boundary, room, properties, residents, onBack, onEdit }) {
  if (!room) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Kamar tidak ditemukan</h2>
        <Button onClick={onBack}>Kembali</Button>
      </Card>
    );
  }

  const activeResident = residents.find((resident) => resident.roomId === room.id);

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Detail Kamar</h2>
          <p>tampilkan detail kamar</p>
        </div>
        <div className="action-menu">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft size={18} /> Kembali
          </Button>
          <Button onClick={onEdit}>
            <Edit3 size={18} /> Edit
          </Button>
        </div>
      </div>
      <div className="detail-grid">
        <DetailItem label="Nomor Kamar" value={room.number} />
        <DetailItem label="Properti" value={getPropertyName(properties, room.propertyId)} />
        <DetailItem label="Tipe" value={room.type} />
        <DetailItem label="Harga Bulanan" value={formatCurrency(room.price)} />
        <DetailItem label="Fasilitas" value={room.facilities} />
        <DetailItem label="Penghuni Aktif" value={activeResident ? getResidentName(residents, activeResident.id) : '-'} />
        <div className="detail-item">
          <span>Status</span>
          <StatusBadge status={room.status} />
        </div>
      </div>
    </Card>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
