import { useMemo, useState } from 'react';
import {
  expenseItems,
  initialBills,
  initialComplaints,
  initialProperties,
  initialResidents,
  initialRooms,
} from '../data/initialData.js';
import { createId } from '../utils/formatters.js';

export function useLedgerStore() {
  const [properties, setProperties] = useState(initialProperties);
  const [rooms, setRooms] = useState(initialRooms);
  const [residents, setResidents] = useState(initialResidents);
  const [bills, setBills] = useState(initialBills);
  const [complaints, setComplaints] = useState(initialComplaints);

  const metrics = useMemo(() => {
    const totalIncome = bills.filter((bill) => bill.status === 'Lunas').reduce((sum, bill) => sum + bill.amount, 0);
    const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);

    return {
      totalProperties: properties.length,
      totalRooms: rooms.length,
      availableRooms: rooms.filter((room) => room.status === 'Tersedia').length,
      activeComplaints: complaints.filter((complaint) => complaint.status !== 'Selesai').length,
      totalIncome,
      totalExpense,
    };
  }, [bills, complaints, properties.length, rooms]);

  const addProperty = (payload) => {
    setProperties((current) => [...current, { id: createId('P', current), roomCount: 0, ...payload }]);
  };

  const updateProperty = (id, payload) => {
    setProperties((current) => current.map((property) => (property.id === id ? { ...property, ...payload } : property)));
  };

  const deleteProperty = (id) => {
    if (rooms.some((room) => room.propertyId === id)) {
      return 'Properti masih memiliki kamar';
    }
    setProperties((current) => current.filter((property) => property.id !== id));
    return null;
  };

  const addRoom = (payload) => {
    setRooms((current) => [...current, { id: payload.number, status: 'Tersedia', ...payload, price: Number(payload.price) }]);
  };

  const updateRoom = (id, payload) => {
    setRooms((current) =>
      current.map((room) => (room.id === id ? { ...room, ...payload, price: Number(payload.price) } : room)),
    );
  };

  const deleteRoom = (id) => {
    if (residents.some((resident) => resident.roomId === id)) {
      return 'Kamar masih digunakan';
    }
    setRooms((current) => current.filter((room) => room.id !== id));
    return null;
  };

  const addResident = (payload) => {
    if (residents.some((resident) => resident.nik === payload.nik)) {
      return 'NIK sudah terdaftar';
    }
    setResidents((current) => [...current, { id: createId('R', current), roomId: null, status: 'Menunggu Kamar', ...payload }]);
    return null;
  };

  const updateResident = (id, payload) => {
    setResidents((current) => current.map((resident) => (resident.id === id ? { ...resident, ...payload } : resident)));
  };

  const deleteResident = (id) => {
    const resident = residents.find((item) => item.id === id);
    if (resident?.roomId) {
      return 'Penghuni masih memiliki hunian aktif';
    }
    setResidents((current) => current.filter((item) => item.id !== id));
    return null;
  };

  const assignRoom = (residentId, roomId) => {
    setResidents((current) =>
      current.map((resident) => (resident.id === residentId ? { ...resident, roomId, status: 'Aktif' } : resident)),
    );
    setRooms((current) => current.map((room) => (room.id === roomId ? { ...room, status: 'Terisi' } : room)));
  };

  const deassignRoom = (roomId) => {
    setResidents((current) =>
      current.map((resident) =>
        resident.roomId === roomId ? { ...resident, roomId: null, status: 'Menunggu Kamar' } : resident,
      ),
    );
    setRooms((current) => current.map((room) => (room.id === roomId ? { ...room, status: 'Tersedia' } : room)));
  };

  const createBill = ({ residentId, period, amount }) => {
    setBills((current) => [
      ...current,
      { id: createId('B', current), residentId, period, amount: Number(amount), paidAt: null, status: 'Belum Lunas' },
    ]);
  };

  const recordPayment = (id, paidAt) => {
    setBills((current) => current.map((bill) => (bill.id === id ? { ...bill, paidAt, status: 'Lunas' } : bill)));
  };

  const addComplaint = (payload) => {
    setComplaints((current) => [...current, { id: createId('C', current), status: 'Menunggu', ...payload }]);
  };

  const updateComplaintStatus = (id, status) => {
    setComplaints((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const updateComplaint = (id, payload) => {
    setComplaints((current) => current.map((item) => (item.id === id ? { ...item, ...payload } : item)));
  };

  const deleteComplaint = (id) => {
    setComplaints((current) => current.filter((item) => item.id !== id));
  };

  return {
    properties,
    rooms,
    residents,
    bills,
    complaints,
    expenses: expenseItems,
    metrics,
    actions: {
      addProperty,
      updateProperty,
      deleteProperty,
      addRoom,
      updateRoom,
      deleteRoom,
      addResident,
      updateResident,
      deleteResident,
      assignRoom,
      deassignRoom,
      createBill,
      recordPayment,
      addComplaint,
      updateComplaint,
      updateComplaintStatus,
      deleteComplaint,
    },
  };
}
