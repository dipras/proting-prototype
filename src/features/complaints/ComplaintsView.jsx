import React, { useEffect, useState } from 'react';
import { ComplaintCreateView } from './views/ComplaintCreateView.jsx';
import { ComplaintDeleteConfirm } from './views/ComplaintDeleteConfirm.jsx';
import { ComplaintEditView } from './views/ComplaintEditView.jsx';
import { ComplaintIndexView } from './views/ComplaintIndexView.jsx';
import { ComplaintShowView } from './views/ComplaintShowView.jsx';

const emptyComplaint = {
  residentId: '',
  date: '10 Juni 2026',
  title: '',
  priority: 'Sedang',
  description: '',
  evidenceUrl: '',
};

export function ComplaintsView({ store, notify, currentUser, onBoundaryChange }) {
  const { residents, rooms, complaints, actions } = store;
  const [route, setRoute] = useState({ boundary: 'keluhan.index' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const goIndex = () => setRoute({ boundary: 'keluhan.index' });
  const isResidentUser = currentUser?.role === 'PENGHUNI';
  const isAdmin = currentUser?.role === 'ADMIN';
  const visibleComplaints = isResidentUser
    ? complaints.filter((complaint) => complaint.residentId === currentUser.residentId)
    : complaints;
  const selectedComplaint = visibleComplaints.find((complaint) => complaint.id === route.complaintId);
  const activeResidents = residents.filter((resident) => resident.roomId);
  const currentResident = residents.find((resident) => resident.id === currentUser?.residentId);

  useEffect(() => {
    onBoundaryChange?.(route.boundary);
  }, [onBoundaryChange, route.boundary]);

  if (route.boundary === 'keluhan.create' && isResidentUser) {
    return (
      <ComplaintCreateView
        boundary="keluhan.create"
        residents={currentResident ? [currentResident] : []}
        currentUser={currentUser}
        initialValues={{ ...emptyComplaint, residentId: currentUser.residentId }}
        onCancel={goIndex}
        onSubmit={(payload) => {
          const resident = residents.find((item) => item.id === currentUser.residentId);
          actions.addComplaint({ ...payload, roomId: resident.roomId, status: 'Menunggu' });
          notify('tampilkan daftar keluhan');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'keluhan.edit') {
    return (
      <ComplaintEditView
        boundary="keluhan.edit"
        complaint={selectedComplaint}
        residents={isResidentUser && currentResident ? [currentResident] : residents}
        rooms={rooms}
        isAdmin={isAdmin}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.updateComplaint(selectedComplaint.id, payload);
          notify('tampilkan hasil perubahan');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'keluhan.show') {
    return (
      <ComplaintShowView
        boundary="keluhan.show"
        complaint={selectedComplaint}
        residents={residents}
        rooms={rooms}
        onBack={goIndex}
        onEdit={() => setRoute({ boundary: 'keluhan.edit', complaintId: selectedComplaint.id })}
        canFinish={isAdmin}
        onFinish={() => {
          actions.updateComplaintStatus(selectedComplaint.id, 'Selesai');
          notify('tampilkan pesan sukses');
          goIndex();
        }}
      />
    );
  }

  return (
    <>
      <ComplaintIndexView
        boundary="keluhan.index"
        complaints={visibleComplaints}
        residents={residents}
        rooms={rooms}
        canCreate={isResidentUser}
        canEdit={isAdmin || isResidentUser}
        canDelete={isAdmin || isResidentUser}
        onCreate={() => setRoute({ boundary: 'keluhan.create' })}
        onShow={(complaint) => setRoute({ boundary: 'keluhan.show', complaintId: complaint.id })}
        onEdit={(complaint) => setRoute({ boundary: 'keluhan.edit', complaintId: complaint.id })}
        onDelete={(complaint) => setDeleteTarget(complaint)}
      />
      <ComplaintDeleteConfirm
        complaint={deleteTarget}
        onCancel={() => {
          setDeleteTarget(null);
          notify('aksi dibatalkan');
        }}
        onConfirm={(complaint) => {
          actions.deleteComplaint(complaint.id);
          notify('tampilkan pesan sukses');
          setDeleteTarget(null);
        }}
      />
    </>
  );
}
