import React, { useRef, useState } from 'react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';

export function ComplaintForm({
  residents,
  initialValues,
  submitLabel,
  onCancel,
  onSubmit,
  showStatus = false,
  lockResident = false,
}) {
  const fileInputRef = useRef(null);
  const [evidenceUrl, setEvidenceUrl] = useState(initialValues.evidenceUrl || '');

  const chooseEvidence = () => {
    fileInputRef.current?.click();
  };

  const changeEvidence = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setEvidenceUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <form className="form-grid room-form" onSubmit={submit}>
      {lockResident ? (
        <>
          <FormField label="Penghuni">
            <input value={residents[0]?.name ?? '-'} readOnly />
          </FormField>
          <input type="hidden" name="residentId" value={initialValues.residentId} />
        </>
      ) : (
        <FormField label="Penghuni">
          <select name="residentId" defaultValue={initialValues.residentId} required>
            {residents.map((resident) => (
              <option value={resident.id} key={resident.id}>{resident.name}</option>
            ))}
          </select>
        </FormField>
      )}
      <FormField label="Judul keluhan">
        <input name="title" defaultValue={initialValues.title} required />
      </FormField>
      <FormField label="Prioritas">
        <select name="priority" defaultValue={initialValues.priority} required>
          <option>Rendah</option>
          <option>Sedang</option>
          <option>Mendesak</option>
        </select>
      </FormField>
      <FormField label="Tanggal">
        <input name="date" defaultValue={initialValues.date} required />
      </FormField>
      {showStatus ? (
        <FormField label="Status">
          <select name="status" defaultValue={initialValues.status} required>
            <option>Menunggu</option>
            <option>Diproses</option>
            <option>Selesai</option>
          </select>
        </FormField>
      ) : null}
      <FormField label="Deskripsi masalah">
        <textarea name="description" rows="4" defaultValue={initialValues.description} required />
      </FormField>
      <div className="form-field">
        <span>Bukti keluhan</span>
        <button
          className={`evidence-upload ${evidenceUrl ? 'has-photo' : ''}`}
          type="button"
          onClick={chooseEvidence}
          aria-label="Upload bukti keluhan"
        >
          {evidenceUrl ? <img src={evidenceUrl} alt="Bukti keluhan" /> : null}
          <span className="property-upload-icon">
            {evidenceUrl ? <UploadCloud size={28} aria-hidden="true" /> : <ImagePlus size={32} aria-hidden="true" />}
          </span>
        </button>
        <input ref={fileInputRef} className="sr-only" type="file" accept="image/*" onChange={changeEvidence} />
        <input type="hidden" name="evidenceUrl" value={evidenceUrl} />
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
