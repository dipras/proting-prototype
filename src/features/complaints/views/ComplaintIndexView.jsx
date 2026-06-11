import React from 'react';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { ActionMenu, TextAction } from '../../../components/ui/ActionMenu.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { DataTable } from '../../../components/ui/DataTable.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { getResidentName, getRoomLabel } from '../../../utils/formatters.js';

export function ComplaintIndexView({
  boundary,
  complaints,
  residents,
  rooms,
  canCreate,
  canEdit,
  canDelete,
  onCreate,
  onShow,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Daftar Keluhan</h2>
          <p>tampilkan daftar keluhan</p>
        </div>
        {canCreate ? (
          <Button onClick={onCreate}>
            <Plus size={18} /> Tambah Keluhan
          </Button>
        ) : null}
      </div>
      <DataTable
        columns={[
          { key: 'title', header: 'Judul' },
          { key: 'residentId', header: 'Penghuni', render: (row) => getResidentName(residents, row.residentId) },
          { key: 'roomId', header: 'Kamar', render: (row) => getRoomLabel(rooms, row.roomId) },
          { key: 'priority', header: 'Prioritas' },
          { key: 'date', header: 'Tanggal' },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          {
            key: 'actions',
            header: 'Aksi',
            render: (row) => (
              <ActionMenu>
                <TextAction onClick={() => onShow(row)}>
                  <Eye size={15} /> Detail
                </TextAction>
                {canEdit ? (
                  <TextAction onClick={() => onEdit(row)}>
                    <Edit3 size={15} /> Edit
                  </TextAction>
                ) : null}
                {canDelete ? (
                  <TextAction tone="danger" onClick={() => onDelete(row)}>
                    <Trash2 size={15} /> Hapus
                  </TextAction>
                ) : null}
              </ActionMenu>
            ),
          },
        ]}
        rows={complaints}
      />
    </Card>
  );
}
