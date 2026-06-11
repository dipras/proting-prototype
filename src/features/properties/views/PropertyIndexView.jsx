import React from 'react';
import { Edit3, Eye, Plus, Trash2 } from 'lucide-react';
import { ActionMenu, TextAction } from '../../../components/ui/ActionMenu.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Card } from '../../../components/ui/Card.jsx';

export function PropertyIndexView({ boundary, properties, rooms, onCreate, onShow, onEdit, onDelete }) {
  return (
    <Card className="module-card property-boundary-view">
      <div className="module-head">
        <div>
          <span className="boundary-chip">{boundary}</span>
          <h2>Manajemen Properti</h2>
          <p>Daftar properti sebagai boundary utama untuk melihat, menambah, memperbarui, dan menghapus properti.</p>
        </div>
        <Button onClick={onCreate}>
          <Plus size={18} /> Tambah Properti
        </Button>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <article className="property-card" key={property.id}>
            <button className="property-photo-button" type="button" onClick={() => onShow(property)}>
              <img src={property.photoUrl} alt={`Foto ${property.name}`} />
            </button>
            <div className="property-card-body">
              <div>
                <h3>{property.name}</h3>
                <p>{property.address}</p>
                <span>{property.city}</span>
              </div>
              <div className="property-meta-row">
                <strong>{rooms.filter((room) => room.propertyId === property.id).length} Kamar</strong>
                <ActionMenu>
                  <TextAction onClick={() => onShow(property)}>
                    <Eye size={15} /> Detail
                  </TextAction>
                  <TextAction onClick={() => onEdit(property)}>
                    <Edit3 size={15} /> Edit
                  </TextAction>
                  <TextAction tone="danger" onClick={() => onDelete(property)}>
                    <Trash2 size={15} /> Hapus
                  </TextAction>
                </ActionMenu>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
