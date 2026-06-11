import React from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { getPropertyName, getRoomLabel } from '../../../utils/formatters.js';

export function ResidentShowView({ boundary, resident, rooms, properties, onBack, onEdit }) {
  if (!resident) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Penghuni tidak ditemukan</h2>
        <Button onClick={onBack}>Kembali</Button>
      </Card>
    );
  }

  const room = rooms.find((item) => item.id === resident.roomId);

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Detail Penghuni</h2>
          <p>tampilkan detail penghuni</p>
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
        <DetailItem label="Nama" value={resident.name} />
        <DetailItem label="NIK" value={resident.nik} />
        <DetailItem label="Telepon" value={resident.phone} />
        <DetailItem label="Kamar" value={room ? getRoomLabel(rooms, resident.roomId) : '-'} />
        <DetailItem label="Properti" value={room ? getPropertyName(properties, room.propertyId) : '-'} />
        <div className="detail-item">
          <span>Status</span>
          <StatusBadge status={resident.status} />
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
