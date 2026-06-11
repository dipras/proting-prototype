export const authUsers = [
  {
    id: 'U-001',
    name: 'Admin Utama',
    email: 'admin@propertiledger.test',
    password: 'admin123',
    role: 'ADMIN',
    status: 'aktif',
  },
  {
    id: 'U-002',
    name: 'Ahmad Dhani',
    email: 'penghuni@propertiledger.test',
    password: 'penghuni123',
    role: 'PENGHUNI',
    status: 'aktif',
    residentId: 'R-001',
  },
  {
    id: 'U-003',
    name: 'User Nonaktif',
    email: 'nonaktif@propertiledger.test',
    password: 'nonaktif123',
    role: 'PENGHUNI',
    status: 'nonaktif',
    residentId: 'R-002',
  },
];

export const initialProperties = [
  {
    id: 'P-001',
    name: 'Kos Ketintang',
    address: 'Jl. Ketintang No.12',
    city: 'Ketintang',
    description: 'Kos strategis dekat kampus dengan akses transportasi harian.',
    photoUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
    roomCount: 24,
  },
  {
    id: 'P-002',
    name: 'Kos Ketintang Baru',
    address: 'Jl. Ketintang Baru IV B',
    city: 'Ketintang Baru',
    description: 'Hunian tenang dengan area parkir dan pengawasan lingkungan.',
    photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    roomCount: 18,
  },
  {
    id: 'P-003',
    name: 'Kos Jambangan',
    address: 'Jl. Jambangan Asri',
    city: 'Jambangan',
    description: 'Kos nyaman untuk penghuni aktif dengan fasilitas komunal.',
    photoUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
    roomCount: 20,
  },
];

export const initialRooms = [
  { id: 'K-01', propertyId: 'P-001', number: 'K-01', type: 'Deluxe', price: 1250000, facilities: 'AC, kamar mandi dalam, lemari', status: 'Terisi' },
  { id: 'K-02', propertyId: 'P-001', number: 'K-02', type: 'Standard', price: 950000, facilities: 'Kipas angin, meja belajar', status: 'Tersedia' },
  { id: 'K-03', propertyId: 'P-001', number: 'K-03', type: 'Standard', price: 950000, facilities: 'Kipas angin, meja belajar', status: 'Tersedia' },
  { id: 'KB-13', propertyId: 'P-002', number: 'KB-13', type: 'Deluxe', price: 1300000, facilities: 'AC, kamar mandi dalam, Wi-Fi', status: 'Terisi' },
  { id: 'KB-14', propertyId: 'P-002', number: 'KB-14', type: 'Standard', price: 1000000, facilities: 'Kipas angin, kasur, lemari', status: 'Tersedia' },
  { id: 'J-07', propertyId: 'P-003', number: 'J-07', type: 'Executive', price: 1600000, facilities: 'AC, water heater, meja kerja', status: 'Terisi' },
  { id: 'J-08', propertyId: 'P-003', number: 'J-08', type: 'Standard', price: 900000, facilities: 'Kasur, lemari, meja belajar', status: 'Tersedia' },
];

export const initialResidents = [
  { id: 'R-001', name: 'Ahmad Dhani', nik: '3578010101010001', phone: '0812-1100-2030', roomId: 'K-01', status: 'Aktif' },
  { id: 'R-002', name: 'Once Mekel', nik: '3578010101010002', phone: '0812-2200-2030', roomId: 'KB-13', status: 'Aktif' },
  { id: 'R-003', name: 'Ari Lasso', nik: '3578010101010003', phone: '0812-3300-2030', roomId: 'J-07', status: 'Aktif' },
  { id: 'R-004', name: 'Maya Putri', nik: '3578010101010004', phone: '0812-4400-2030', roomId: null, status: 'Menunggu Kamar' },
];

export const initialBills = [
  { id: 'B-001', residentId: 'R-001', period: 'Mei 2026', amount: 1250000, paidAt: '18 Mei 2026', status: 'Lunas' },
  { id: 'B-002', residentId: 'R-002', period: 'Mei 2026', amount: 1300000, paidAt: null, status: 'Belum Lunas' },
  { id: 'B-003', residentId: 'R-003', period: 'Mei 2026', amount: 1600000, paidAt: '16 Mei 2026', status: 'Lunas' },
];

export const initialComplaints = [
  {
    id: 'C-001',
    residentId: 'R-001',
    roomId: 'K-01',
    title: 'AC bocor',
    priority: 'Mendesak',
    description: 'AC bocor dan tidak dingin di area kamar utama',
    evidenceUrl: '',
    date: '18 Mei 2026',
    status: 'Menunggu',
  },
  {
    id: 'C-002',
    residentId: 'R-002',
    roomId: 'KB-13',
    title: 'Kamar mandi mampet',
    priority: 'Sedang',
    description: 'Air kamar mandi mampet dan meluap',
    evidenceUrl: '',
    date: '17 Mei 2026',
    status: 'Diproses',
  },
  {
    id: 'C-003',
    residentId: 'R-003',
    roomId: 'J-07',
    title: 'Wi-Fi mati',
    priority: 'Sedang',
    description: 'Sinyal Wi-Fi router lantai 2 mati total',
    evidenceUrl: '',
    date: '16 Mei 2026',
    status: 'Selesai',
  },
];

export const expenseItems = [
  { id: 'E-001', label: 'Perawatan AC', amount: 1800000 },
  { id: 'E-002', label: 'Perbaikan pompa air', amount: 1200000 },
];
