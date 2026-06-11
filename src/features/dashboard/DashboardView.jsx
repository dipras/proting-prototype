import React from 'react';
import { AlertTriangle, BedDouble, Building2, CalendarClock, CreditCard, DoorOpen, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '../../components/ui/Card.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { formatCurrency, getPropertyName, getResidentName, getRoomLabel } from '../../utils/formatters.js';

const performance = [
  { month: 'Des', income: 74, expense: 42 },
  { month: 'Jan', income: 69, expense: 21 },
  { month: 'Feb', income: 55, expense: 33 },
  { month: 'Mar', income: 66, expense: 16 },
  { month: 'Apr', income: 77, expense: 40 },
  { month: 'Mei', income: 89, expense: 9 },
];

export function DashboardView({ store, currentUser }) {
  const { metrics, properties, rooms, residents, complaints, bills } = store;

  if (currentUser?.role === 'PENGHUNI') {
    return (
      <ResidentDashboard
        currentUser={currentUser}
        properties={properties}
        rooms={rooms}
        residents={residents}
        complaints={complaints}
        bills={bills}
      />
    );
  }

  const activeComplaints = complaints.filter((complaint) => complaint.status !== 'Selesai');

  return (
    <div className="dashboard-grid">
      <MetricCard title="Total Kos" value={`${metrics.totalProperties} Lokasi`} note="Ketintang, K. Baru, Jambangan" icon={Building2} />
      <MetricCard title="Total Kamar" value={`${metrics.totalRooms} Kamar`} icon={BedDouble} />
      <MetricCard title="Kamar Tersedia" value={`${metrics.availableRooms} Kamar`} icon={DoorOpen} />
      <MetricCard
        title="Komplain Aktif"
        value={`${metrics.activeComplaints} Kasus`}
        note="Butuh tindak lanjut"
        icon={AlertTriangle}
        alert
      />

      <Card className="finance-card primary">
        <span>Total Pemasukan (Mei)</span>
        <strong>{formatCurrency(metrics.totalIncome)}</strong>
        <small>Naik 12% dari bulan lalu</small>
        <TrendingUp size={22} aria-hidden="true" />
      </Card>

      <Card className="finance-card">
        <span>Total Pengeluaran (Mei)</span>
        <strong>{formatCurrency(metrics.totalExpense)}</strong>
        <small className="danger-text">Biaya perawatan yang lebih tinggi bulan ini</small>
        <AlertTriangle size={22} aria-hidden="true" />
      </Card>

      <Card className="chart-card">
        <div className="card-title-row">
          <h2>Performa Bulanan</h2>
          <div className="legend">
            <span><i className="dot income" /> Pendapatan</span>
            <span><i className="dot expense" /> Pengeluaran</span>
          </div>
        </div>
        <div className="bar-chart" aria-label="Grafik performa bulanan">
          {performance.map((item) => (
            <div className="bar-group" key={item.month}>
              <div className="bars">
                <span className="bar income" style={{ height: `${item.income}%` }} />
                <span className="bar expense" style={{ height: `${item.expense}%` }} />
              </div>
              <small>{item.month}</small>
            </div>
          ))}
        </div>
      </Card>

      <Card className="occupancy-card">
        <h2>Okupansi Per Lokasi</h2>
        <div className="occupancy-list">
          {properties.map((property) => {
            const locationRooms = rooms.filter((room) => room.propertyId === property.id);
            const filled = locationRooms.filter((room) => room.status === 'Terisi').length;
            const percentage = locationRooms.length ? Math.round((filled / locationRooms.length) * 100) : 0;
            return (
              <div className="occupancy-item" key={property.id}>
                <div>
                  <strong>{property.name}</strong>
                  <span>{property.address}</span>
                </div>
                <div className="progress">
                  <i style={{ width: `${percentage}%` }} />
                </div>
                <b>{percentage}%</b>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="wide-card">
        <h2>Komplain Masuk dan Status Tindakan</h2>
        <DataTable
          columns={[
            {
              key: 'residentId',
              header: 'Penghuni / Kamar',
              render: (row) => `${getResidentName(residents, row.residentId)} (${getRoomLabel(rooms, row.roomId)})`,
            },
            {
              key: 'property',
              header: 'Lokasi Properti',
              render: (row) => {
                const room = rooms.find((item) => item.id === row.roomId);
                return getPropertyName(properties, room?.propertyId);
              },
            },
            { key: 'description', header: 'Deskripsi Masalah' },
            { key: 'date', header: 'Tanggal Komplain' },
            { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          ]}
          rows={activeComplaints}
        />
      </Card>
    </div>
  );
}

function ResidentDashboard({ currentUser, properties, rooms, residents, complaints, bills }) {
  const resident = residents.find((item) => item.id === currentUser.residentId);
  const room = rooms.find((item) => item.id === resident?.roomId);
  const property = properties.find((item) => item.id === room?.propertyId);
  const residentBills = bills.filter((bill) => bill.residentId === resident?.id);
  const unpaidBill = residentBills.find((bill) => bill.status !== 'Lunas');
  const activeComplaints = complaints.filter((complaint) => complaint.residentId === resident?.id && complaint.status !== 'Selesai');

  return (
    <div className="dashboard-grid">
      <MetricCard title="Kamar Saya" value={room?.number ?? '-'} note={room?.type ?? 'Belum memiliki kamar'} icon={BedDouble} />
      <MetricCard title="Lokasi Kos" value={property?.name ?? '-'} note={property?.address ?? 'Belum ada lokasi'} icon={MapPin} />
      <MetricCard
        title="Tagihan Terdekat"
        value={unpaidBill ? formatCurrency(unpaidBill.amount) : 'Lunas'}
        note={unpaidBill ? `Periode ${unpaidBill.period}` : 'Tidak ada tunggakan'}
        icon={CreditCard}
      />
      <MetricCard
        title="Komplain Aktif"
        value={`${activeComplaints.length} Keluhan`}
        note={activeComplaints.length ? 'Sedang ditindaklanjuti' : 'Tidak ada keluhan aktif'}
        icon={AlertTriangle}
        alert={activeComplaints.length > 0}
      />

      <Card className="finance-card primary">
        <span>Jumlah Pembayaran</span>
        <strong>{unpaidBill ? formatCurrency(unpaidBill.amount) : formatCurrency(0)}</strong>
        <small>{unpaidBill ? 'Status belum lunas' : 'Semua tagihan sudah lunas'}</small>
        <CreditCard size={22} aria-hidden="true" />
      </Card>

      <Card className="finance-card">
        <span>Tenggat Pembayaran</span>
        <strong>{unpaidBill ? '10 Juni 2026' : '-'}</strong>
        <small className={unpaidBill ? 'danger-text' : ''}>{unpaidBill ? `Tagihan ${unpaidBill.period}` : 'Tidak ada tenggat aktif'}</small>
        <CalendarClock size={22} aria-hidden="true" />
      </Card>

      <Card className="wide-card module-card">
        <h2>Informasi Kamar</h2>
        <div className="detail-grid section-gap">
          <ResidentDetail label="Nomor Kamar" value={room?.number ?? '-'} />
          <ResidentDetail label="Tipe Kamar" value={room?.type ?? '-'} />
          <ResidentDetail label="Harga Bulanan" value={room ? formatCurrency(room.price) : '-'} />
          <ResidentDetail label="Fasilitas" value={room?.facilities ?? '-'} />
          <ResidentDetail label="Properti" value={property?.name ?? '-'} />
          <ResidentDetail label="Alamat" value={property?.address ?? '-'} />
        </div>
      </Card>

      <Card className="wide-card">
        <h2>Riwayat Tagihan Saya</h2>
        <DataTable
          columns={[
            { key: 'period', header: 'Periode' },
            { key: 'amount', header: 'Nominal', render: (row) => formatCurrency(row.amount) },
            { key: 'paidAt', header: 'Tanggal Bayar', render: (row) => row.paidAt ?? '-' },
            { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          ]}
          rows={residentBills}
        />
      </Card>
    </div>
  );
}

function ResidentDetail({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MetricCard({ title, value, note, icon: Icon, alert = false }) {
  return (
    <Card className="metric-card">
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        {note ? <small className={alert ? 'danger-text' : ''}>{note}</small> : null}
      </div>
      <div className={`metric-icon ${alert ? 'alert' : ''}`}>
        <Icon size={23} aria-hidden="true" />
      </div>
    </Card>
  );
}
