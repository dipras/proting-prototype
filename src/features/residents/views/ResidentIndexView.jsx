import React from 'react';
import { Edit3, Eye, KeyRound, Plus, Trash2 } from 'lucide-react';
import { ActionMenu, TextAction } from '../../../components/ui/ActionMenu.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { DataTable } from '../../../components/ui/DataTable.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { getPropertyName, getRoomLabel } from '../../../utils/formatters.js';

export function ResidentIndexView({ boundary, residents, rooms, properties, onCreate, onShow, onEdit, onAssign, onDelete }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Daftar Penghuni</h2>
          <p>tampilkan daftar penghuni kos</p>
        </div>
        <Button onClick={onCreate}>
          <Plus size={18} /> Tambah Penghuni
        </Button>
      </div>
      <DataTable
        columns={[
          { key: 'name', header: 'Nama Penghuni' },
          { key: 'nik', header: 'NIK' },
          { key: 'phone', header: 'Telepon' },
          {
            key: 'roomId',
            header: 'Kamar',
            render: (row) => {
              const room = rooms.find((item) => item.id === row.roomId);
              return room ? `${getRoomLabel(rooms, row.roomId)} - ${getPropertyName(properties, room.propertyId)}` : '-';
            },
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
                {!row.roomId ? (
                  <TextAction onClick={() => onAssign(row)}>
                    <KeyRound size={15} /> Assign
                  </TextAction>
                ) : null}
                <TextAction onClick={() => onEdit(row)}>
                  <Edit3 size={15} /> Edit
                </TextAction>
                <TextAction tone="danger" onClick={() => onDelete(row)}>
                  <Trash2 size={15} /> Hapus
                </TextAction>
              </ActionMenu>
            ),
          },
        ]}
        rows={residents}
      />
    </Card>
  );
}
