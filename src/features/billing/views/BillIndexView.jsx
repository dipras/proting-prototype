import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { ActionMenu, TextAction } from '../../../components/ui/ActionMenu.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { DataTable } from '../../../components/ui/DataTable.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { formatCurrency, getResidentName } from '../../../utils/formatters.js';

export function BillIndexView({ boundary, bills, residents, canCreate, canRecordPayment, onCreate, onRecordPayment }) {
  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Tagihan dan Pembayaran</h2>
          <p>tampilkan daftar tagihan penghuni</p>
        </div>
        {canCreate ? (
          <Button onClick={onCreate}>
            <Plus size={18} /> Buat Tagihan
          </Button>
        ) : null}
      </div>
      <DataTable
        columns={[
          { key: 'residentId', header: 'Penghuni', render: (row) => getResidentName(residents, row.residentId) },
          { key: 'period', header: 'Periode' },
          { key: 'amount', header: 'Nominal', render: (row) => formatCurrency(row.amount) },
          { key: 'paidAt', header: 'Tanggal Bayar', render: (row) => row.paidAt ?? '-' },
          { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          {
            key: 'actions',
            header: 'Aksi',
            render: (row) =>
              canRecordPayment && row.status === 'Belum Lunas' ? (
                <ActionMenu>
                  <TextAction onClick={() => onRecordPayment(row)}>
                    <CheckCircle2 size={15} /> Catat Bayar
                  </TextAction>
                </ActionMenu>
              ) : (
                '-'
              ),
          },
        ]}
        rows={bills}
      />
    </Card>
  );
}
