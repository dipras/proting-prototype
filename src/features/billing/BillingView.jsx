import React, { useEffect, useState } from 'react';
import { BillCreateView } from './views/BillCreateView.jsx';
import { BillIndexView } from './views/BillIndexView.jsx';
import { PaymentEditView } from './views/PaymentEditView.jsx';

export function BillingView({ store, notify, currentUser, onBoundaryChange }) {
  const { residents, bills, actions } = store;
  const [route, setRoute] = useState({ boundary: 'pembayaran.index' });

  const isAdmin = currentUser?.role === 'ADMIN';
  const goIndex = () => setRoute({ boundary: 'pembayaran.index' });
  const visibleBills = isAdmin ? bills : bills.filter((bill) => bill.residentId === currentUser?.residentId);
  const selectedBill = visibleBills.find((bill) => bill.id === route.billId);
  const activeResidents = residents.filter((resident) => resident.roomId);

  useEffect(() => {
    onBoundaryChange?.(route.boundary);
  }, [onBoundaryChange, route.boundary]);

  if (route.boundary === 'pembayaran.create' && isAdmin) {
    return (
      <BillCreateView
        boundary="pembayaran.create"
        residents={activeResidents}
        onCancel={goIndex}
        onSubmit={(payload) => {
          actions.createBill(payload);
          notify('Sukses Membuat Tagihan');
          goIndex();
        }}
      />
    );
  }

  if (route.boundary === 'pembayaran.edit' && isAdmin) {
    return (
      <PaymentEditView
        boundary="pembayaran.edit"
        bill={selectedBill}
        residents={residents}
        onCancel={goIndex}
        onSubmit={({ paidAt }) => {
          actions.recordPayment(selectedBill.id, paidAt);
          notify('tampilkan pesan sukses');
          goIndex();
        }}
      />
    );
  }

  return (
    <BillIndexView
      boundary="pembayaran.index"
      bills={visibleBills}
      residents={residents}
      canCreate={isAdmin}
      canRecordPayment={isAdmin}
      onCreate={() => setRoute({ boundary: 'pembayaran.create' })}
      onRecordPayment={(bill) => setRoute({ boundary: 'pembayaran.edit', billId: bill.id })}
    />
  );
}
