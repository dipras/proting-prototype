import React from 'react';
import { ArrowLeft, CheckCircle2, Edit3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';
import { StatusBadge } from '../../../components/ui/StatusBadge.jsx';
import { getResidentName, getRoomLabel } from '../../../utils/formatters.js';

export function ComplaintShowView({ boundary, complaint, residents, rooms, canFinish, onBack, onEdit, onFinish }) {
  if (!complaint) {
    return (
      <Card className="module-card">
        <span className="boundary-chip">{boundary}</span>
        <h2>Keluhan tidak ditemukan</h2>
        <Button onClick={onBack}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card className="module-card">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Detail Keluhan</h2>
          <p>tampilkan detail keluhan</p>
        </div>
        <div className="action-menu">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft size={18} /> Kembali
          </Button>
          <Button variant="secondary" onClick={onEdit}>
            <Edit3 size={18} /> Edit
          </Button>
          {canFinish && complaint.status !== 'Selesai' ? (
            <Button onClick={onFinish}>
              <CheckCircle2 size={18} /> Selesaikan
            </Button>
          ) : null}
        </div>
      </div>
      <div className="detail-grid">
        <DetailItem label="Judul" value={complaint.title} />
        <DetailItem label="Penghuni" value={getResidentName(residents, complaint.residentId)} />
        <DetailItem label="Kamar" value={getRoomLabel(rooms, complaint.roomId)} />
        <DetailItem label="Prioritas" value={complaint.priority} />
        <DetailItem label="Tanggal" value={complaint.date} />
        <div className="detail-item">
          <span>Status</span>
          <StatusBadge status={complaint.status} />
        </div>
      </div>
      <div className="section-gap">
        <h2>Deskripsi</h2>
        <p className="description-copy">{complaint.description}</p>
      </div>
      {complaint.evidenceUrl ? (
        <div className="section-gap">
          <h2>Bukti Keluhan</h2>
          <img className="evidence-preview" src={complaint.evidenceUrl} alt={`Bukti ${complaint.title}`} />
        </div>
      ) : null}
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
