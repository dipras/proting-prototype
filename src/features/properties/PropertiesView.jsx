import React, { useEffect, useState } from 'react';
import { PropertyCreateView } from './views/PropertyCreateView.jsx';
import { PropertyEditView } from './views/PropertyEditView.jsx';
import { PropertyIndexView } from './views/PropertyIndexView.jsx';
import { PropertyShowView } from './views/PropertyShowView.jsx';
import { PropertyDeleteConfirm } from './views/PropertyDeleteConfirm.jsx';

const emptyForm = {
  name: '',
  address: '',
  city: '',
  description: '',
  photoUrl: '',
};

export function PropertiesView({ store, notify, onBoundaryChange }) {
  const { properties, rooms, actions } = store;
  const [route, setRoute] = useState({ boundary: 'properti.index' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const goIndex = () => setRoute({ boundary: 'properti.index' });
  const selectedProperty = properties.find((property) => property.id === route.propertyId);

  useEffect(() => {
    onBoundaryChange?.(route.boundary);
  }, [onBoundaryChange, route.boundary]);

  if (route.boundary === 'properti.create') {
    return (
      <PropertyCreateView
        boundary="properti.create"
        initialValues={emptyForm}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.addProperty(payload);
          notify('tampilkan daftar properti terbaru');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'properti.edit') {
    return (
      <PropertyEditView
        boundary="properti.edit"
        property={selectedProperty}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.updateProperty(selectedProperty.id, payload);
          notify('Properti berhasil diperbarui');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'properti.show') {
    return (
      <PropertyShowView
        boundary="properti.show"
        property={selectedProperty}
        rooms={rooms}
        onBack={goIndex}
        onEdit={() => setRoute({ boundary: 'properti.edit', propertyId: selectedProperty.id })}
      />
    );
  }

  return (
    <>
      <PropertyIndexView
        boundary="properti.index"
        properties={properties}
        rooms={rooms}
        onCreate={() => setRoute({ boundary: 'properti.create' })}
        onShow={(property) => setRoute({ boundary: 'properti.show', propertyId: property.id })}
        onEdit={(property) => setRoute({ boundary: 'properti.edit', propertyId: property.id })}
        onDelete={(property) => setDeleteTarget(property)}
      />
      <PropertyDeleteConfirm
        property={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={(property) => {
          const error = actions.deleteProperty(property.id);
          notify(error ?? 'Properti berhasil dihapus');
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
