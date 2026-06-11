import React, { useRef, useState } from 'react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { FormField } from '../../../components/ui/FormField.jsx';

export function PropertyForm({ initialValues, submitLabel, onCancel, onSubmit }) {
  const fileInputRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(initialValues.photoUrl || '');
  const [photoError, setPhotoError] = useState('');

  const choosePhoto = () => {
    fileInputRef.current?.click();
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(String(reader.result));
      setPhotoError('');
    };
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!photoUrl) {
      setPhotoError('Foto properti wajib diunggah');
      return;
    }
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <form className="form-grid property-form" onSubmit={submit}>
      <button
        className={`property-upload ${photoUrl ? 'has-photo' : ''}`}
        type="button"
        onClick={choosePhoto}
        aria-label="Upload foto properti"
      >
        {photoUrl ? <img src={photoUrl} alt="Preview properti" /> : null}
        <span className="property-upload-icon">
          {photoUrl ? <UploadCloud size={30} aria-hidden="true" /> : <ImagePlus size={34} aria-hidden="true" />}
        </span>
      </button>
      <input ref={fileInputRef} className="sr-only" type="file" accept="image/*" onChange={changePhoto} />
      <input type="hidden" name="photoUrl" value={photoUrl} />
      {photoError ? <p className="field-error">{photoError}</p> : null}
      <FormField label="Nama properti">
        <input name="name" defaultValue={initialValues.name} required />
      </FormField>
      <FormField label="Alamat">
        <input name="address" defaultValue={initialValues.address} required />
      </FormField>
      <FormField label="Area">
        <input name="city" defaultValue={initialValues.city} required />
      </FormField>
      <FormField label="Deskripsi">
        <textarea name="description" rows="4" defaultValue={initialValues.description} required />
      </FormField>
      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel}>Batal</Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
