import React, { useEffect, useState } from 'react';
import { ResidentCreateView } from './views/ResidentCreateView.jsx';
import { ResidentDeleteConfirm } from './views/ResidentDeleteConfirm.jsx';
import { ResidentEditView } from './views/ResidentEditView.jsx';
import { ResidentIndexView } from './views/ResidentIndexView.jsx';
import { ResidentShowView } from './views/ResidentShowView.jsx';
import { ResidentAssignRoomView } from './views/ResidentAssignRoomView.jsx';

const emptyResident = {
  name: '',
  nik: '',
  phone: '',
};

export function ResidentsView({ store, notify, onBoundaryChange }) {
  const { properties, rooms, residents, actions } = store;
  const [route, setRoute] = useState({ boundary: 'penghuni.index' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const goIndex = () => setRoute({ boundary: 'penghuni.index' });
  const selectedResident = residents.find((resident) => resident.id === route.residentId);

  useEffect(() => {
    onBoundaryChange?.(route.boundary);
  }, [onBoundaryChange, route.boundary]);

  if (route.boundary === 'penghuni.create') {
    return (
      <ResidentCreateView
        boundary="penghuni.create"
        initialValues={emptyResident}
        onCancel={goIndex}
        onSubmit={(payload) => {
          const error = actions.addResident(payload);
          notify(error ?? 'tampilkan pesan sukses');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'penghuni.edit') {
    return (
      <ResidentEditView
        boundary="penghuni.edit"
        resident={selectedResident}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.updateResident(selectedResident.id, payload);
          notify('tampilkan pesan sukses');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'penghuni.show') {
    return (
      <ResidentShowView
        boundary="penghuni.show"
        resident={selectedResident}
        rooms={rooms}
        properties={properties}
        onBack={goIndex}
        onEdit={() => setRoute({ boundary: 'penghuni.edit', residentId: selectedResident.id })}
      />
    );
  }

  if (route.boundary === 'hunian.create') {
    return (
      <ResidentAssignRoomView
        boundary="hunian.create"
        resident={selectedResident}
        rooms={rooms}
        properties={properties}
        onCancel={goIndex}
        onSubmit={(roomId) => {
          actions.assignRoom(selectedResident.id, roomId);
          notify('tampilkan pesan sukses');
          goIndex();
        }}
      />
    );
  }

  return (
    <>
      <ResidentIndexView
        boundary="penghuni.index"
        residents={residents}
        rooms={rooms}
        properties={properties}
        onCreate={() => setRoute({ boundary: 'penghuni.create' })}
        onShow={(resident) => setRoute({ boundary: 'penghuni.show', residentId: resident.id })}
        onEdit={(resident) => setRoute({ boundary: 'penghuni.edit', residentId: resident.id })}
        onAssign={(resident) => setRoute({ boundary: 'hunian.create', residentId: resident.id })}
        onDelete={(resident) => setDeleteTarget(resident)}
      />
      <ResidentDeleteConfirm
        resident={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={(resident) => {
          const error = actions.deleteResident(resident.id);
          notify(error ?? 'tampilkan pesan sukses');
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
