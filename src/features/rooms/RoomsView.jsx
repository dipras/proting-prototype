import React, { useEffect, useState } from 'react';
import { RoomCreateView } from './views/RoomCreateView.jsx';
import { RoomDeleteConfirm } from './views/RoomDeleteConfirm.jsx';
import { RoomEditView } from './views/RoomEditView.jsx';
import { RoomIndexView } from './views/RoomIndexView.jsx';
import { RoomShowView } from './views/RoomShowView.jsx';

const emptyRoom = {
  number: '',
  propertyId: '',
  type: 'Standard',
  price: 1000000,
  facilities: '',
  status: 'Tersedia',
};

export function RoomsView({ store, notify, onBoundaryChange }) {
  const { properties, rooms, residents, actions } = store;
  const [route, setRoute] = useState({ boundary: 'kamar.index' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const goIndex = () => setRoute({ boundary: 'kamar.index' });
  const selectedRoom = rooms.find((room) => room.id === route.roomId);

  useEffect(() => {
    onBoundaryChange?.(route.boundary);
  }, [onBoundaryChange, route.boundary]);

  if (route.boundary === 'kamar.create') {
    return (
      <RoomCreateView
        boundary="kamar.create"
        properties={properties}
        initialValues={{ ...emptyRoom, propertyId: properties[0]?.id ?? '' }}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.addRoom(payload);
          notify('tampilkan daftar kamar terbaru');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'kamar.edit') {
    return (
      <RoomEditView
        boundary="kamar.edit"
        room={selectedRoom}
        properties={properties}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.updateRoom(selectedRoom.id, payload);
          notify('Kamar berhasil diperbarui');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'kamar.show') {
    return (
      <RoomShowView
        boundary="kamar.show"
        room={selectedRoom}
        properties={properties}
        residents={residents}
        onBack={goIndex}
        onEdit={() => setRoute({ boundary: 'kamar.edit', roomId: selectedRoom.id })}
      />
    );
  }

  return (
    <>
      <RoomIndexView
        boundary="kamar.index"
        rooms={rooms}
        properties={properties}
        residents={residents}
        onCreate={() => setRoute({ boundary: 'kamar.create' })}
        onShow={(room) => setRoute({ boundary: 'kamar.show', roomId: room.id })}
        onEdit={(room) => setRoute({ boundary: 'kamar.edit', roomId: room.id })}
        onDelete={(room) => setDeleteTarget(room)}
        onDeassign={(room) => {
          actions.deassignRoom(room.id);
          notify('tampilkan pesan sukses');
        }}
      />
      <RoomDeleteConfirm
        room={deleteTarget}
        onCancel={() => {
          setDeleteTarget(null);
          notify('batalkan proses hapus');
        }}
        onConfirm={(room) => {
          const error = actions.deleteRoom(room.id);
          notify(error ?? 'Kamar berhasil dihapus');
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
