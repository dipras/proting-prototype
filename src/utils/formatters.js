export function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function createId(prefix, items) {
  const nextNumber = items.length + 1;
  return `${prefix}-${String(nextNumber).padStart(3, '0')}`;
}

export function getPropertyName(properties, propertyId) {
  return properties.find((property) => property.id === propertyId)?.name ?? '-';
}

export function getRoomLabel(rooms, roomId) {
  const room = rooms.find((item) => item.id === roomId);
  return room ? room.number : '-';
}

export function getResidentName(residents, residentId) {
  return residents.find((resident) => resident.id === residentId)?.name ?? '-';
}
