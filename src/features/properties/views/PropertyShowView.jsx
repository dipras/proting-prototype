import React from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { DataTable } from '../../../components/ui/DataTable.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { formatCurrency } from '../../../utils/formatters.js';

export function PropertyShowView({ boundary, property, rooms, onBack, onEdit }) {
  if (!property) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Properti tidak ditemukan</h2>
        <Button onClick={onBack}>Kembali</Button>
      </Card>
    );
  }

  const propertyRooms = rooms.filter((room) => room.propertyId === property.id);

  return (
    <Card className="module-card property-boundary-view">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Detail Properti</h2>
          <p>Boundary detail untuk menampilkan data properti hasil `findById(id)`.</p>
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

      <div className="property-detail">
        <img src={property.photoUrl} alt={`Foto ${property.name}`} />
        <div>
          <h3>{property.name}</h3>
          <p>{property.description}</p>
          <dl>
            <div>
              <dt>Alamat</dt>
              <dd>{property.address}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{property.city}</dd>
            </div>
            <div>
              <dt>Total Kamar</dt>
              <dd>{propertyRooms.length} kamar</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="section-gap">
        <h2>Kamar Pada Properti</h2>
        <DataTable
          columns={[
            { key: 'number', header: 'Nomor Kamar' },
            { key: 'type', header: 'Tipe' },
            { key: 'price', header: 'Harga', render: (row) => formatCurrency(row.price) },
            { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          ]}
          rows={propertyRooms}
        />
      </div>
    </Card>
  );
}
