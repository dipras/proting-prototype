import React, { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { formatCurrency, getPropertyName, getResidentName } from '../../utils/formatters.js';

export function ReportsView({ store, notify, onBoundaryChange }) {
  const { properties, rooms, residents, bills, expenses } = store;
  const [propertyId, setPropertyId] = useState('all');

  useEffect(() => {
    onBoundaryChange?.('laporan_keuangan.index');
  }, [onBoundaryChange]);

  const filteredBills = useMemo(() => {
    if (propertyId === 'all') return bills;
    const roomIds = rooms.filter((room) => room.propertyId === propertyId).map((room) => room.id);
    const residentIds = residents.filter((resident) => roomIds.includes(resident.roomId)).map((resident) => resident.id);
    return bills.filter((bill) => residentIds.includes(bill.residentId));
  }, [bills, propertyId, residents, rooms]);

  const totalIncome = filteredBills.filter((bill) => bill.status === 'Lunas').reduce((sum, bill) => sum + bill.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalIncome - totalExpense;

  return (
    <div className="report-grid">
      <Card className="report-summary primary">
        <span>Total Pemasukan</span>
        <strong>{formatCurrency(totalIncome)}</strong>
      </Card>
      <Card className="report-summary">
        <span>Total Pengeluaran</span>
        <strong>{formatCurrency(totalExpense)}</strong>
      </Card>
      <Card className="report-summary">
        <span>Laba Bersih</span>
        <strong>{formatCurrency(profit)}</strong>
      </Card>

      <Card className="module-card wide-card">
        <div className="module-head">
          <div>
            <h2>Laporan Keuangan</h2>
            <p>tampilkan filter laporan</p>
          </div>
          <Button onClick={() => notify('download file laporan')}>
            <Download size={18} /> Ekspor Laporan
          </Button>
        </div>
        <div className="report-filter">
          <label className="form-field">
            <span>Lokasi kos</span>
            <select value={propertyId} onChange={(event) => setPropertyId(event.target.value)}>
              <option value="all">Semua Lokasi</option>
              {properties.map((property) => (
                <option value={property.id} key={property.id}>{property.name}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Rentang tanggal</span>
            <input value="01 Mei 2026 - 31 Mei 2026" readOnly />
          </label>
        </div>
        <DataTable
          columns={[
            { key: 'residentId', header: 'Penghuni', render: (row) => getResidentName(residents, row.residentId) },
            {
              key: 'property',
              header: 'Lokasi',
              render: (row) => {
                const resident = residents.find((item) => item.id === row.residentId);
                const room = rooms.find((item) => item.id === resident?.roomId);
                return getPropertyName(properties, room?.propertyId);
              },
            },
            { key: 'period', header: 'Periode' },
            { key: 'amount', header: 'Pemasukan', render: (row) => formatCurrency(row.amount) },
            { key: 'status', header: 'Status' },
          ]}
          rows={filteredBills}
        />
      </Card>

      <Card className="module-card wide-card">
        <h2>Pengeluaran Operasional</h2>
        <DataTable
          columns={[
            { key: 'label', header: 'Kebutuhan' },
            { key: 'amount', header: 'Nominal', render: (row) => formatCurrency(row.amount) },
          ]}
          rows={expenses}
        />
      </Card>
    </div>
  );
}
