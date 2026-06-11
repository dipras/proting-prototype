import React from 'react';
import { DoorOpen, Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { ActionMenu, TextAction } from '../../../components/ui/ActionMenu.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { DataTable } from '../../../components/ui/DataTable.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { formatCurrency, getPropertyName, getResidentName } from '../../../utils/formatters.js';

export function RoomIndexView({ boundary, rooms, properties, residents, onCreate, onShow, onEdit, onDelete, onDeassign }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Manajemen Kamar</h2>
          <p>tampilkan daftar kamar</p>
        </div>
        <div className="action-menu">
          <Button onClick={onCreate}>
            <Plus size={18} /> Tambah Kamar
          </Button>
        </div>
      </div>
      <DataTable
        columns={[
          { key: 'number', header: 'Nomor Kamar' },
          { key: 'propertyId', header: 'Properti', render: (row) => getPropertyName(properties, row.propertyId) },
          { key: 'type', header: 'Tipe' },
          { key: 'price', header: 'Harga', render: (row) => formatCurrency(row.price) },
          {
            key: 'resident',
            header: 'Penghuni',
            render: (row) => getResidentName(residents, residents.find((resident) => resident.roomId === row.id)?.id),
          },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          {
            key: 'actions',
            header: 'Aksi',
            render: (row) => (
              <ActionMenu>
                <TextAction onClick={() => onShow(row)}>
                  <Eye size={15} /> Detail
                </TextAction>
                <TextAction onClick={() => onEdit(row)}>
                  <Edit3 size={15} /> Edit
                </TextAction>
                {row.status === 'Terisi' ? (
                  <TextAction onClick={() => onDeassign(row)}>
                    <DoorOpen size={15} /> Deassign
                  </TextAction>
                ) : null}
                <TextAction tone="danger" onClick={() => onDelete(row)}>
                  <Trash2 size={15} /> Hapus
                </TextAction>
              </ActionMenu>
            ),
          },
        ]}
        rows={rooms}
      />
    </Card>
  );
}
