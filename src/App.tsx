import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, FileText, Search, Plus, 
  CheckCircle2, XCircle, AlertTriangle, ShieldCheck, User, ChevronRight, Eye, 
  FileCheck, Menu, Image as ImageIcon, UploadCloud, Trash2, History
} from 'lucide-react';

const CATEGORIES = [
  'Persiapan Lahan', 'Bibit & Penanaman', 'Pupuk', 'Hama & Penyakit', 
  'Tenaga Kerja', 'Operasional', 'Peralatan', 'Transportasi', 'Lain-lain'
];

// Data awal ditambahkan status: 'ACTIVE' untuk mendukung Soft Delete
const INITIAL_DATA = [
  { id: 'DM-001', date: '2026-07-21', type: 'INCOME', category: 'Modal Awal', description: 'SALDO', amount: 3000000, recipient: 'Owner', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-001', date: '2026-07-29', type: 'EXPENSE', category: 'Hama & Penyakit', description: 'Tridazol', amount: 135500, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-001.jpg' },
  { id: 'TRX-002', date: '2026-07-29', type: 'EXPENSE', category: 'Bibit & Penanaman', description: 'Bibit Raja Tavi', amount: 125000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-001.jpg' },
  { id: 'TRX-003', date: '2026-07-29', type: 'EXPENSE', category: 'Pupuk', description: 'Gema Flora (Kalium)', amount: 102500, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-001.jpg' },
  { id: 'TRX-004', date: '2026-07-29', type: 'EXPENSE', category: 'Pupuk', description: 'Likagrow', amount: 48000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-001.jpg' },
  { id: 'TRX-005', date: '2026-08-01', type: 'EXPENSE', category: 'Pupuk', description: 'Pupuk Kandang Kambing 15 sak', amount: 225000, recipient: 'Natar', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-002.jpg' },
  { id: 'TRX-006', date: '2026-08-01', type: 'EXPENSE', category: 'Persiapan Lahan', description: 'DP Bambu', amount: 300000, recipient: 'Mang Asep', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-007', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Provit Hijau', amount: 32500, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-003.jpg' },
  { id: 'TRX-008', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Fitoflek', amount: 35000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-003.jpg' },
  { id: 'TRX-009', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Minoshoot', amount: 170000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-004.jpg' },
  { id: 'TRX-010', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Snipersoil', amount: 122000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-004.jpg' },
  { id: 'TRX-011', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Nutrishoot @2 botol', amount: 300000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-004.jpg' },
  { id: 'TRX-012', date: '2026-08-02', type: 'EXPENSE', category: 'Pupuk', description: 'Trikosniper', amount: 97000, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-004.jpg' },
  { id: 'TRX-013', date: '2026-08-03', type: 'EXPENSE', category: 'Bibit & Penanaman', description: 'DP Semai Bibit', amount: 300000, recipient: 'Yoyon', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-014', date: '2026-08-03', type: 'EXPENSE', category: 'Peralatan', description: 'Drum (2 buah) & Ember (2 buah)', amount: 750000, recipient: 'Toko Sidoluhur', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-015', date: '2026-08-03', type: 'EXPENSE', category: 'Pupuk', description: 'Dolomit 4 sak', amount: 280000, recipient: 'Beringin Kulon', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-016', date: '2026-08-03', type: 'EXPENSE', category: 'Pupuk', description: 'Fertiphos 1 Sak', amount: 200000, recipient: 'Beringin Kulon', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'DM-002', date: '2026-08-07', type: 'INCOME', category: 'Tambahan Modal', description: 'SALDO', amount: 5000000, recipient: 'Owner', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-017', date: '2026-08-09', type: 'EXPENSE', category: 'Peralatan', description: 'Plastik Mulsa 2 Roll', amount: 2100000, recipient: 'Toko Cintamulya', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-018', date: '2026-08-09', type: 'EXPENSE', category: 'Persiapan Lahan', description: 'Pelunasan Bambu & Biaya Pengiriman', amount: 700000, recipient: 'Mang Asep', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-019', date: '2026-08-11', type: 'EXPENSE', category: 'Tenaga Kerja', description: 'Upah Pekerja', amount: 1000000, recipient: 'Tim Nasroh', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-020', date: '2026-08-12', type: 'EXPENSE', category: 'Pupuk', description: 'TSP', amount: 720000, recipient: 'Salim Tani', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-005.jpg' },
  { id: 'TRX-021', date: '2026-08-12', type: 'EXPENSE', category: 'Pupuk', description: 'NPK 16-16-16, 14kg', amount: 280000, recipient: 'Salim Tani', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-005.jpg' },
  { id: 'DM-003', date: '2026-08-16', type: 'INCOME', category: 'Tambahan Modal', description: 'SALDO', amount: 650000, recipient: 'Owner', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-022', date: '2026-08-16', type: 'EXPENSE', category: 'Tenaga Kerja', description: 'Upah Pekerja', amount: 625000, recipient: 'Tim Nasroh', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'DM-004', date: '2026-08-22', type: 'INCOME', category: 'Tambahan Modal', description: 'SALDO', amount: 3000000, recipient: 'Owner', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-023', date: '2026-08-22', type: 'EXPENSE', category: 'Lain-lain', description: 'Admin', amount: 15000, recipient: 'BRI link', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-024', date: '2026-08-22', type: 'EXPENSE', category: 'Tenaga Kerja', description: 'Upah Pekerja', amount: 750000, recipient: 'Tim Nasroh', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-025', date: '2026-08-22', type: 'EXPENSE', category: 'Peralatan', description: 'Tangki Swan', amount: 700000, recipient: 'Toko Antariksa', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-007.jpg' },
  { id: 'TRX-026', date: '2026-08-22', type: 'EXPENSE', category: 'Hama & Penyakit', description: 'Furadan 2kg', amount: 40000, recipient: 'Toko Antariksa', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-008.jpg' },
  { id: 'TRX-027', date: '2026-08-22', type: 'EXPENSE', category: 'Hama & Penyakit', description: 'Regant 50ml', amount: 35000, recipient: 'Toko Antariksa', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-008.jpg' },
  { id: 'TRX-028', date: '2026-08-22', type: 'EXPENSE', category: 'Persiapan Lahan', description: 'Bambu Penjepit Mulsa', amount: 100000, recipient: 'Nasroh', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-029', date: '2026-08-25', type: 'EXPENSE', category: 'Peralatan', description: 'Pemotong pipa', amount: 42500, recipient: 'Shopee', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-009.jpg' },
  { id: 'TRX-030', date: '2026-08-28', type: 'EXPENSE', category: 'Lain-lain', description: 'Token Listrik', amount: 53000, recipient: 'BCA', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-010.jpg' },
  { id: 'TRX-031', date: '2026-08-29', type: 'EXPENSE', category: 'Tenaga Kerja', description: 'Upah Pekerja', amount: 1250000, recipient: 'Tim Nasroh', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'DM-005', date: '2026-09-03', type: 'INCOME', category: 'Tambahan Modal', description: 'SALDO', amount: 15000000, recipient: 'Owner', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-013.png' },
  { id: 'TRX-032', date: '2026-09-03', type: 'EXPENSE', category: 'Peralatan', description: 'Selang Drip 3/4 5 rol Asam humat 1', amount: 815000, recipient: 'Salim Tani', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-012.jpg' },
  { id: 'TRX-033', date: '2026-09-03', type: 'EXPENSE', category: 'Bibit & Penanaman', description: 'Pelunasan Bibit', amount: 225000, recipient: 'Yoyon', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-034', date: '2026-09-03', type: 'EXPENSE', category: 'Peralatan', description: 'Selang piping 5 rol', amount: 100000, recipient: 'Toko Cintamulya', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-035', date: '2026-09-03', type: 'EXPENSE', category: 'Lain-lain', description: 'Bayar Nota Toko Susanto', amount: 6165000, recipient: 'BRI SUSANTO', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-014.jpg' },
  { id: 'TRX-036', date: '2026-09-03', type: 'EXPENSE', category: 'Peralatan', description: 'Bayar Nota Toko Susanto', amount: 2690000, recipient: 'BRI SUSANTO', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-015.jpg' },
  { id: 'TRX-037', date: '2026-09-03', type: 'EXPENSE', category: 'Hama & Penyakit', description: 'Obat Semut', amount: 50000, recipient: 'Toko', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-015.jpg' },
  { id: 'TRX-038', date: '2026-09-03', type: 'EXPENSE', category: 'Lain-lain', description: 'TOTALAN MAS HARI VICO', amount: 3500000, recipient: 'Mas Hari vico', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
  { id: 'TRX-039', date: '2026-09-03', type: 'EXPENSE', category: 'Lain-lain', description: 'Bibit Ikan', amount: 1150000, recipient: 'Imam Bibit Ikan', proofStatus: 'LENGKAP', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: '/nota/TRX-016.jpg' },
  { id: 'TRX-040', date: '2026-09-03', type: 'EXPENSE', category: 'Lain-lain', description: 'Pakan Ikan', amount: 22000, recipient: 'Beringin Kulon', proofStatus: 'PENGGANTI', verificationStatus: 'VERIFIED', status: 'ACTIVE', notes: '', proofUrl: null },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [role, setRole] = useState('OWNER'); // ADMIN, OWNER, STAFF
  const [transactions, setTransactions] = useState(INITIAL_DATA);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('EXPENSE'); 
  const [selectedTx, setSelectedTx] = useState(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  const [filterSearch, setFilterSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterCategory, setFilterCategory] = useState('ALL');
  
  const [customAlert, setCustomAlert] = useState(null); // { message, type: 'error' | 'success' | 'confirm', onConfirm }

  const handleRoleChange = (newRole) => {
    if (newRole === 'ADMIN') {
      const pwd = prompt('Masukkan password Admin:');
      if (pwd !== 'Dezha1234') {
        alert('Password salah!');
        return;
      }
    } else if (newRole === 'STAFF') {
      const pwd = prompt('Masukkan password Staff:');
      if (pwd !== '1234') {
        alert('Password salah!');
        return;
      }
    }
    setRole(newRole);
  };

  // Kalkulasi Utama (Hanya memproses transaksi yang ACTIVE / Valid)
  const stats = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let verifiedExpense = 0;
    let missingProofExpense = 0;
    let missingProofCount = 0;
    let totalExpenseCount = 0;
    let totalExpenseWithProofCount = 0;

    const categoryBreakdown = {};
    CATEGORIES.forEach(c => categoryBreakdown[c] = { amount: 0, count: 0 });

    transactions.forEach(t => {
      // PENTING: Jangan hitung transaksi yang dibatalkan (VOID)
      if (t.status === 'VOID') return;

      if (t.type === 'INCOME') {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
        totalExpenseCount++;
        
        if (t.verificationStatus === 'VERIFIED') verifiedExpense += t.amount;
        
        if (t.proofStatus === 'TIDAK_ADA') {
          missingProofExpense += t.amount;
          missingProofCount++;
        } else {
          totalExpenseWithProofCount++;
        }
        
        if (categoryBreakdown[t.category]) {
          categoryBreakdown[t.category].amount += t.amount;
          categoryBreakdown[t.category].count += 1;
        }
      }
    });

    Object.keys(categoryBreakdown).forEach(k => {
      categoryBreakdown[k].percentage = totalExpense > 0 
        ? ((categoryBreakdown[k].amount / totalExpense) * 100).toFixed(1) 
        : 0;
    });

    // Indeks Akuntabilitas hanya dihitung dari pengeluaran yang VALID (ACTIVE)
    const accountabilityScore = totalExpenseCount > 0
      ? Math.round((totalExpenseWithProofCount / totalExpenseCount) * 100)
      : 100;

    return {
      totalIncome, totalExpense, balance: totalIncome - totalExpense,
      verifiedExpense, missingProofExpense, missingProofCount, totalExpenseCount,
      categoryBreakdown, accountabilityScore
    };
  }, [transactions]);

  const handleSaveTransaction = (formData) => {
    // Validasi Dasar
    const amount = Math.abs(Number(formData.amount));
    if (isNaN(amount) || amount <= 0) {
      setCustomAlert({ type: 'error', message: 'Nominal tidak valid. Harus lebih besar dari 0.' });
      return;
    }
    if (!formData.description || !formData.recipient) {
      setCustomAlert({ type: 'error', message: 'Keterangan dan Penerima wajib diisi.' });
      return;
    }

    if (selectedTx) {
      // EDIT MODE
      setTransactions(transactions.map(t => {
        if (t.id === selectedTx.id) {
          // Aturan Akuntansi: Jika diedit, hapus status verifikasinya agar diperiksa ulang
          const isChanged = t.amount !== amount || t.proofStatus !== formData.proofStatus;
          return { 
            ...t, 
            ...formData, 
            amount, 
            verificationStatus: isChanged ? 'UNVERIFIED' : t.verificationStatus 
          };
        }
        return t;
      }));
    } else {
      // INSERT MODE
      const prefix = formData.type === 'INCOME' ? 'DM' : 'TRX';
      
      // Algoritma ID yang aman (mencegah duplicate meski ada data dihapus)
      const sameTypeTx = transactions.filter(t => t.id.startsWith(prefix));
      let maxNum = 0;
      sameTypeTx.forEach(t => {
        const numPart = parseInt(t.id.split('-')[1]);
        if (!isNaN(numPart) && numPart > maxNum) maxNum = numPart;
      });
      const newId = `${prefix}-${(maxNum + 1).toString().padStart(3, '0')}`;
      
      setTransactions([...transactions, { 
        ...formData, 
        id: newId, 
        amount,
        verificationStatus: 'UNVERIFIED',
        status: 'ACTIVE'
      }]);
    }
    setIsModalOpen(false);
  };

  const handleVerify = (id) => {
    if (role !== 'ADMIN' && role !== 'OWNER') return;
    setTransactions(transactions.map(t => t.id === id ? { ...t, verificationStatus: 'VERIFIED' } : t));
  };

  const handleVoidTransaction = (id) => {
    if (role === 'STAFF') {
       setCustomAlert({ type: 'error', message: 'Staff tidak memiliki akses untuk membatalkan transaksi.'});
       return;
    }
    
    setCustomAlert({
      type: 'confirm',
      message: `Yakin ingin MEMBATALKAN transaksi ${id}? Data akan di-Void dan tidak dihitung dalam saldo.`,
      onConfirm: () => {
        setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'VOID', verificationStatus: 'UNVERIFIED' } : t));
        setIsModalOpen(false);
        setCustomAlert(null);
      }
    });
  };

  const handleDrillDown = (categoryName) => {
    setFilterType('EXPENSE');
    setFilterCategory(categoryName);
    setFilterSearch('');
    setActiveTab('TRANSAKSI');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openForm = (type, tx = null) => {
    setSelectedTx(tx);
    setModalType(type);
    setIsModalOpen(true);
    setIsFabOpen(false);
  };

  const AlertBox = () => {
    if (!customAlert) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in duration-200">
          <div className="flex items-center mb-4">
            {customAlert.type === 'error' ? <XCircle className="w-8 h-8 text-rose-500 mr-3" /> :
             customAlert.type === 'confirm' ? <AlertTriangle className="w-8 h-8 text-amber-500 mr-3" /> :
             <CheckCircle2 className="w-8 h-8 text-emerald-500 mr-3" />}
            <h4 className="text-lg font-bold text-slate-800">
              {customAlert.type === 'error' ? 'Peringatan' : customAlert.type === 'confirm' ? 'Konfirmasi' : 'Berhasil'}
            </h4>
          </div>
          <p className="text-sm text-slate-600 mb-6">{customAlert.message}</p>
          <div className="flex justify-end gap-3">
            {customAlert.type === 'confirm' && (
              <button onClick={() => setCustomAlert(null)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Batal</button>
            )}
            <button onClick={() => { customAlert.onConfirm ? customAlert.onConfirm() : setCustomAlert(null) }} 
              className={`px-4 py-2 text-sm font-bold text-white rounded-lg ${customAlert.type === 'error' ? 'bg-rose-600 hover:bg-rose-700' : customAlert.type === 'confirm' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600'}`}>
              {customAlert.type === 'confirm' ? 'Ya, Lanjutkan' : 'Mengerti'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NAV_ITEMS = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'TRANSAKSI', icon: FileText, label: 'Buku Transaksi' },
    { id: 'BUKTI', icon: ImageIcon, label: 'Galeri Bukti' },
  ];

  const Sidebar = () => (
    <div className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight">Fin<span className="text-emerald-500">Control</span></h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Sistem Akuntabilitas</p>
      </div>
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'
              }`}>
              <item.icon className="w-5 h-5 mr-3" /> {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-2">Simulasi Akses (Role)</div>
          <select value={role} onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full bg-slate-900 text-white border border-slate-700 rounded p-1 text-sm focus:outline-none focus:border-emerald-500">
            <option value="OWNER">Owner (Read-Only+Verify)</option>
            <option value="ADMIN">Admin (Full Access)</option>
            <option value="STAFF">Staff (Input Only)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const MobileBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-30 px-2 pb-safe shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)]">
       {NAV_ITEMS.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === item.id ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
            }`}>
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'fill-emerald-50 stroke-emerald-600' : ''}`} /> 
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      
      {/* KARTU UTAMA (BERDASARKAN DATA VALID/ACTIVE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setFilterType('INCOME'); setFilterCategory('ALL'); setActiveTab('TRANSAKSI'); }}>
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-xs md:text-sm font-medium text-slate-500">Total Dana Diterima</h3>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ArrowDownToLine className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">{formatRupiah(stats.totalIncome)}</p>
          <p className="text-xs md:text-sm text-emerald-600 mt-1 md:mt-2">Ketuk untuk rincian dana masuk</p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleDrillDown('ALL')}>
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <h3 className="text-xs md:text-sm font-medium text-slate-500">Total Pengeluaran Valid</h3>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <ArrowUpFromLine className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800">{formatRupiah(stats.totalExpense)}</p>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
             <div className="bg-rose-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${stats.totalIncome > 0 ? (stats.totalExpense / stats.totalIncome) * 100 : 0}%` }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Menyerap {stats.totalIncome > 0 ? ((stats.totalExpense / stats.totalIncome) * 100).toFixed(1) : 0}% dana modal</p>
        </div>

        <div className="bg-indigo-600 md:bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-sm border border-transparent md:border-slate-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 md:bg-indigo-500/5 rounded-bl-full z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <h3 className="text-xs md:text-sm font-medium text-indigo-100 md:text-slate-500">Saldo Dana (Sisa)</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 md:bg-indigo-50 flex items-center justify-center text-white md:text-indigo-600">
                <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white md:text-slate-800">{formatRupiah(stats.balance)}</p>
            <p className="text-xs md:text-sm text-indigo-200 md:text-indigo-600 mt-1 md:mt-2 font-medium">Berdasarkan data tersimpan</p>
          </div>
        </div>
      </div>

      {/* ALERT AKUNTABILITAS */}
      {stats.missingProofCount > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer hover:bg-rose-100 transition-colors gap-3"
             onClick={() => { setFilterType('EXPENSE'); setFilterSearch('TIDAK_ADA'); setActiveTab('TRANSAKSI'); }}>
          <div className="flex items-start md:items-center">
            <div className="bg-rose-100 p-2 rounded-lg text-rose-600 mr-3 shrink-0">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-800">Perhatian Akuntabilitas!</h4>
              <p className="text-xs md:text-sm text-rose-600 mt-0.5">Terdapat <strong>{stats.missingProofCount} transaksi aktif</strong> senilai <strong>{formatRupiah(stats.missingProofExpense)}</strong> tanpa lampiran bukti.</p>
            </div>
          </div>
          <button className="w-full md:w-auto text-xs md:text-sm font-medium text-rose-700 bg-white border border-rose-200 px-4 py-2 rounded-lg hover:bg-rose-50">
            Tinjau Transaksi
          </button>
        </div>
      )}

      {/* DRILL DOWN PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Panel Akuntabilitas */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center">
            <ShieldCheck className="w-5 h-5 text-indigo-500 mr-2" /> Indeks Akuntabilitas
          </h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="45%" className="stroke-slate-100" strokeWidth="10%" fill="none" />
                <circle cx="50%" cy="50%" r="45%" className={`${stats.accountabilityScore === 100 ? 'stroke-emerald-500' : stats.accountabilityScore > 80 ? 'stroke-indigo-500' : 'stroke-amber-500'}`} strokeWidth="10%" fill="none" 
                        strokeDasharray="283%" strokeDashoffset={`${283 - (283 * stats.accountabilityScore / 100)}%`} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}/>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-slate-800">{stats.accountabilityScore}%</span>
                <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Validitas</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Bukti Lengkap</span>
              <span className="font-bold">{transactions.filter(t => t.type === 'EXPENSE' && t.status === 'ACTIVE' && t.proofStatus === 'LENGKAP').length} Trx</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-50 text-blue-700">
              <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Pengganti</span>
              <span className="font-bold">{transactions.filter(t => t.type === 'EXPENSE' && t.status === 'ACTIVE' && t.proofStatus === 'PENGGANTI').length} Trx</span>
            </div>
          </div>
        </div>

        {/* Panel Kategori */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 lg:col-span-2">
           <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">Rincian Penggunaan Dana</h3>
           <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-6">Sentuh baris kategori untuk melakukan drill-down data.</p>
           
           <div className="space-y-3 md:space-y-4">
             {CATEGORIES.map(category => {
               const data = stats.categoryBreakdown[category];
               if (data.amount === 0) return null; 
               
               return (
                 <div key={category} className="group flex flex-col cursor-pointer p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors active:bg-slate-100" onClick={() => handleDrillDown(category)}>
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs md:text-sm font-medium text-slate-700 group-hover:text-indigo-600 flex items-center">
                       {category} <span className="text-[10px] md:text-xs text-slate-400 ml-1 md:ml-2">({data.count} trx)</span>
                     </span>
                     <span className="text-xs md:text-sm font-bold text-slate-800">{formatRupiah(data.amount)}</span>
                   </div>
                   <div className="flex items-center">
                     <div className="w-full bg-slate-100 rounded-full h-1.5 md:h-2 mr-3">
                       <div className="bg-indigo-500 h-1.5 md:h-2 rounded-full group-hover:bg-indigo-600 transition-colors" style={{ width: `${data.percentage}%` }}></div>
                     </div>
                     <span className="text-[10px] md:text-xs text-slate-500 w-8 text-right font-medium">{data.percentage}%</span>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );

  const TransactionsView = () => {
    // Implementasi Search & Filter yang ketat
    const filteredTx = transactions.filter(t => {
      const matchType = filterType === 'ALL' || t.type === filterType;
      const matchCategory = filterCategory === 'ALL' || t.category === filterCategory;
      const searchLower = filterSearch.toLowerCase();
      // Search mencakup ID, Deskripsi, Penerima, dan khusus untuk pencarian status TIDAK_ADA
      const matchSearch = filterSearch === '' || 
                          t.id.toLowerCase().includes(searchLower) ||
                          t.description.toLowerCase().includes(searchLower) ||
                          t.recipient.toLowerCase().includes(searchLower) ||
                          (searchLower === 'tidak_ada' && t.proofStatus === 'TIDAK_ADA');
      return matchType && matchCategory && matchSearch;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); 

    return (
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
        
        {/* Toolbar Filter */}
        <div className="p-3 md:p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Cari nota, nama barang, id..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
              value={filterSearch === 'TIDAK_ADA' ? '' : filterSearch} onChange={(e) => setFilterSearch(e.target.value)} />
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <select className="flex-1 sm:flex-none px-3 py-2 border border-slate-200 rounded-lg text-xs md:text-sm bg-white text-slate-700 outline-none cursor-pointer"
                    value={filterType} onChange={(e) => { setFilterType(e.target.value); setFilterCategory('ALL'); }}>
              <option value="ALL">Semua Jenis</option>
              <option value="INCOME">Dana Masuk</option>
              <option value="EXPENSE">Pengeluaran</option>
            </select>
            
            {filterType === 'EXPENSE' && (
              <select className="flex-1 sm:flex-none px-3 py-2 border border-slate-200 rounded-lg text-xs md:text-sm bg-white text-slate-700 outline-none cursor-pointer max-w-[150px]"
                      value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="ALL">Semua Kategori</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-[11px] uppercase text-slate-400 font-bold tracking-wider">
                <th className="p-4">Tanggal</th>
                <th className="p-4">Keterangan</th>
                <th className="p-4">Kategori</th>
                <th className="p-4 text-right">Nominal</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {filteredTx.length === 0 ? (
                <tr><td colSpan="6" className="p-12 text-center text-slate-400 font-medium">Tidak ada data ditemukan sesuai filter.</td></tr>
              ) : (
                filteredTx.map(tx => (
                  <tr key={tx.id} className={`hover:bg-slate-50/50 group transition-colors ${tx.status === 'VOID' ? 'bg-slate-50/80 opacity-60 grayscale-[50%]' : ''}`}>
                    <td className="p-4">
                      <div className={`font-semibold ${tx.status === 'VOID' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{formatDate(tx.date)}</div>
                      
                    </td>
                    <td className="p-4 max-w-[200px]">
                      <div className={`font-semibold truncate ${tx.status === 'VOID' ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{tx.description}</div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate">{tx.recipient}</div>
                    </td>
                    <td className="p-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold border border-slate-200">{tx.category}</span></td>
                    <td className="p-4 text-right">
                       <div className={`font-black ${tx.status === 'VOID' ? 'text-slate-400 line-through' : tx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-800'}`}>
                         {tx.type === 'INCOME' ? '+' : '-'}{formatRupiah(tx.amount)}
                       </div>
                    </td>
                    <td className="p-4 text-center">
                       {tx.status === 'VOID' ? <span className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded-md uppercase tracking-wide">Dibatalkan</span>
                       : tx.type === 'INCOME' ? <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wide border border-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1"/> Sah</span>
                       : tx.proofStatus === 'LENGKAP' ? <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wide border border-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1"/> Ada Bukti</span> 
                       : tx.proofStatus === 'PENGGANTI' ? <span className="inline-flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wide border border-blue-100"><FileText className="w-3 h-3 mr-1"/> Pengganti</span> 
                       : <span className="inline-flex items-center text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md uppercase tracking-wide border border-rose-200"><AlertTriangle className="w-3 h-3 mr-1"/> Tanpa Bukti</span>}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => openForm('PREVIEW', tx)} className={`p-2 rounded-lg transition-colors ${tx.proofUrl ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
                        {tx.proofUrl ? <ImageIcon className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View (Responsive) */}
        <div className="md:hidden flex flex-col bg-slate-50 divide-y divide-slate-100">
          {filteredTx.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400 font-medium">Tidak ada data ditemukan.</div>
          ) : (
            filteredTx.map(tx => (
              <div key={tx.id} onClick={() => openForm('PREVIEW', tx)} className={`bg-white p-4 active:bg-slate-50 transition-colors ${tx.status === 'VOID' ? 'opacity-60 grayscale-[50%]' : ''}`}>
                <div className="flex justify-between items-start mb-1.5">
                  <div className="text-xs text-slate-500 font-medium">{formatDate(tx.date)}</div>
                  <div className={`font-black text-sm ${tx.status === 'VOID' ? 'text-slate-400 line-through' : tx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}{formatRupiah(tx.amount)}
                  </div>
                </div>
                <div className={`font-bold text-sm leading-snug mb-1 ${tx.status === 'VOID' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{tx.description}</div>
                <div className="flex justify-between items-end mt-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-slate-500">{tx.recipient}</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">{tx.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tx.status === 'VOID' ? <span className="text-[10px] font-black text-slate-500 bg-slate-200 px-2 py-1 rounded uppercase">BATAL</span>
                       : tx.type === 'INCOME' ? <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase">SAH</span>
                       : tx.proofStatus === 'LENGKAP' ? <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase">BUKTI LENGKAP</span> 
                       : tx.proofStatus === 'PENGGANTI' ? <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">MANUAL</span> 
                       : <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-200 uppercase">TANPA BUKTI</span>}
                    {tx.proofUrl && <ImageIcon className="w-4 h-4 text-indigo-500 shrink-0" />}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const ProofGalleryView = () => {
    // Galeri hanya menampilkan transaksi ACTIVE yang memiliki foto bukti
    const transactionsWithProof = transactions.filter(t => t.status === 'ACTIVE' && t.proofUrl && (filterType === 'ALL' || t.type === filterType));

    return (
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500 min-h-[60vh]">
        <div className="p-3 md:p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <div className="flex w-full sm:w-auto gap-2">
            <select className="flex-1 sm:flex-none px-3 py-2 border border-slate-200 rounded-lg text-xs md:text-sm bg-white text-slate-700 outline-none cursor-pointer"
                    value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="ALL">Semua Bukti Visual</option>
              <option value="INCOME">Bukti Penerimaan Dana</option>
              <option value="EXPENSE">Bukti Pengeluaran/Nota</option>
            </select>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {transactionsWithProof.length === 0 ? (
            <div className="text-center py-16 text-slate-400 flex flex-col items-center">
              <ImageIcon className="w-16 h-16 mb-4 text-slate-200" />
              <p className="font-medium text-slate-500">Belum ada foto bukti yang tersimpan.</p>
              <p className="text-xs mt-1">Upload foto nota saat menginput transaksi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {transactionsWithProof.map(tx => (
                <div key={tx.id} onClick={() => openForm('PREVIEW', tx)} className="group cursor-pointer flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all">
                  <div className="aspect-square bg-slate-200 relative overflow-hidden">
                    <img src={tx.proofUrl} alt={`Bukti ${tx.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
                       <Eye className="text-white w-8 h-8 mb-1 shadow-sm" />
                       <span className="text-[10px] text-white font-bold tracking-widest uppercase">Lihat Detail</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold text-white tracking-widest font-mono">
                      {tx.id}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-800 truncate mb-0.5">{tx.description}</div>
                    <div className={`text-[10px] font-black ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-600'}`}>{formatRupiah(tx.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const FormModal = () => {
    // PREVIEW MODE (Menampilkan Detail dan Bukti)
    if (modalType === 'PREVIEW' && selectedTx) {
      const isVoid = selectedTx.status === 'VOID';
      
      return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-0 md:p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-none md:rounded-3xl shadow-2xl w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            
            {/* AREA BUKTI VISUAL (Diutamakan) */}
            <div className="w-full md:w-3/5 bg-slate-900 flex flex-col relative h-1/2 md:h-auto shrink-0 md:shrink border-b md:border-b-0 md:border-r border-slate-800">
               <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
                 <div className={`flex items-center backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg pointer-events-auto ${isVoid ? 'bg-rose-500/90 text-white' : selectedTx.proofUrl ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                    {isVoid ? <Trash2 className="w-3.5 h-3.5 mr-1.5"/> : selectedTx.proofUrl ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5"/> : <AlertTriangle className="w-3.5 h-3.5 mr-1.5"/>}
                    {isVoid ? 'TRANSAKSI BATAL' : selectedTx.proofUrl ? 'Bukti Tersedia' : 'Gambar Bukti Tidak Ada'}
                 </div>
                 {/* Close button for Mobile (top right over image) */}
                 <button onClick={() => setIsModalOpen(false)} className="md:hidden pointer-events-auto bg-black/40 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/60"><XCircle className="w-6 h-6"/></button>
               </div>
               
               {selectedTx.proofUrl ? (
                 <div className="w-full h-full flex items-center justify-center p-2">
                   <img src={selectedTx.proofUrl} alt={`Bukti ${selectedTx.id}`} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                 </div>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center bg-slate-800">
                    <ImageIcon className="w-20 h-20 mb-4 text-slate-600 opacity-50" />
                    <p className="font-bold text-slate-400 mb-1">Tidak Ada Bukti Visual</p>
                    <p className="text-xs text-slate-500 max-w-xs">Transaksi ini dicatat tanpa melampirkan foto nota fisik atau digital.</p>
                 </div>
               )}
            </div>

            {/* AREA DETAIL DATA */}
            <div className="w-full md:w-2/5 flex flex-col h-1/2 md:h-auto max-h-full bg-white relative">
              <div className="hidden md:flex p-4 md:p-5 border-b border-slate-100 justify-between items-center bg-white shrink-0 sticky top-0 z-10">
                <div>
                  <h3 className="text-lg font-black text-slate-800 leading-tight">Detail Transaksi</h3>
                  
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-600 bg-slate-50 p-2 rounded-full hover:bg-rose-50 transition-colors"><XCircle className="w-6 h-6"/></button>
              </div>
              
              <div className="p-4 md:p-6 space-y-5 overflow-y-auto flex-1 bg-white">
                {/* Mobile Header (replaces desktop header) */}
                <div className="md:hidden pb-3 border-b border-slate-100 mb-3">
                  <p className="text-xs text-slate-500 font-mono font-bold tracking-tight">{selectedTx.id}</p>
                </div>

                <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Nominal</p>
                  <div className="flex justify-between items-end">
                    <p className={`text-3xl font-black tracking-tighter ${isVoid ? 'text-slate-400 line-through' : selectedTx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {formatRupiah(selectedTx.amount)}
                    </p>
                    {!isVoid && (
                      selectedTx.verificationStatus === 'VERIFIED' 
                        ? <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded"><ShieldCheck className="w-3.5 h-3.5 mr-1"/> Terverifikasi</span>
                        : <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded">Belum Verifikasi</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Tanggal Transaksi</p>
                    <p className="font-bold text-slate-800">{formatDate(selectedTx.date)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Jenis & Kategori</p>
                    <p className="font-bold text-slate-800 flex items-center">
                      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${selectedTx.type === 'INCOME' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      {selectedTx.type === 'INCOME' ? 'Dana Masuk' : 'Pengeluaran'} <span className="text-slate-300 mx-2">•</span> {selectedTx.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Keterangan / Rincian</p>
                    <p className="font-bold text-slate-800 text-base">{selectedTx.description}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">{selectedTx.type === 'INCOME' ? 'Sumber Dana' : 'Penerima/Toko'}</p>
                    <p className="font-bold text-slate-800">{selectedTx.recipient}</p>
                  </div>
                  {selectedTx.notes && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 mb-1.5 uppercase font-bold tracking-widest">Catatan Tambahan</p>
                      <p className="text-sm text-slate-700 italic leading-relaxed">{selectedTx.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS (Tergantung Role & Status) */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2 shrink-0 pb-safe">
                 {!isVoid && role !== 'OWNER' && (
                   <button onClick={() => setModalType(selectedTx.type)} className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors shadow-sm">
                     Edit Transaksi
                   </button>
                 )}
                 {!isVoid && (role === 'OWNER' || role === 'ADMIN') && selectedTx.verificationStatus === 'UNVERIFIED' && (
                   <button onClick={() => { handleVerify(selectedTx.id); setIsModalOpen(false); }} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 flex items-center justify-center transition-colors">
                     <CheckCircle2 className="w-4 h-4 mr-2" /> Sahkan / Verifikasi
                   </button>
                 )}
                 {!isVoid && role === 'ADMIN' && (
                   <button onClick={() => handleVoidTransaction(selectedTx.id)} className="w-full px-4 py-3 bg-white border-2 border-rose-100 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-50 transition-colors flex items-center justify-center mt-1">
                     <Trash2 className="w-4 h-4 mr-2" /> Batalkan Transaksi (Void)
                   </button>
                 )}
                 {isVoid && (
                   <div className="text-center py-2 text-xs font-bold text-rose-500 bg-rose-50 rounded-lg">
                     Transaksi ini telah dibatalkan dan tidak mempengaruhi saldo.
                   </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      );
    }

    // INPUT & EDIT MODE
    const [formData, setFormData] = useState(selectedTx || {
      date: new Date().toISOString().split('T')[0], type: modalType, category: modalType === 'INCOME' ? 'Tambahan Modal' : CATEGORIES[0], description: '', amount: '', recipient: '', proofStatus: 'LENGKAP', notes: '', proofUrl: null
    });

    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-2 md:p-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-xl max-h-[95vh] flex flex-col overflow-hidden">
          <div className={`p-4 md:p-6 border-b text-white shrink-0 flex justify-between items-center ${modalType === 'INCOME' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
            <h3 className="text-base md:text-xl font-black flex items-center tracking-tight">
              {modalType === 'INCOME' ? <ArrowDownToLine className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3"/> : <ArrowUpFromLine className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3"/>}
              {selectedTx ? 'Edit' : 'Input'} {modalType === 'INCOME' ? 'Dana Masuk' : 'Pengeluaran'}
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors"><XCircle className="w-6 h-6"/></button>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSaveTransaction(formData); }} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 md:p-6 space-y-5 overflow-y-auto flex-1 bg-slate-50/50">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Tanggal</label>
                  <input type="date" required className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Kategori</label>
                  {modalType === 'INCOME' ? (
                    <input type="text" readOnly value="Tambahan Modal" className="w-full p-3.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 outline-none" />
                  ) : (
                    <select className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm cursor-pointer"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nominal (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">Rp</span>
                  <input type="number" required min="1" placeholder="0" className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-xl font-black text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
                    value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Keterangan Barang/Jasa</label>
                <input type="text" required placeholder="Misal: Beli bibit cabai 5 bungkus" className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{modalType === 'INCOME' ? 'Sumber Dana' : 'Nama Penerima / Toko'}</label>
                <input type="text" required placeholder={modalType === 'INCOME' ? "Misal: Bapak Budi" : "Misal: Toko Tani Sukses"} className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                  value={formData.recipient} onChange={e => setFormData({...formData, recipient: e.target.value})} />
              </div>

              {/* KHUSUS PENGELUARAN: SISTEM BUKTI */}
              {modalType === 'EXPENSE' && (
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <label className="block text-[11px] font-black text-slate-800 uppercase tracking-widest mb-3">Status Bukti / Nota (Wajib)</label>
                  <div className="space-y-2.5">
                    <label className="flex items-center p-3.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-emerald-50 border-2 border-transparent has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 transition-all">
                      <input type="radio" name="proof" value="LENGKAP" checked={formData.proofStatus === 'LENGKAP'} onChange={e => setFormData({...formData, proofStatus: e.target.value})} className="mr-3 w-4 h-4 accent-emerald-600" />
                      <span className="text-sm font-bold text-slate-800">Ada Nota (Fisik/Digital)</span>
                    </label>
                    <label className="flex items-center p-3.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-blue-50 border-2 border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-all">
                      <input type="radio" name="proof" value="PENGGANTI" checked={formData.proofStatus === 'PENGGANTI'} onChange={e => setFormData({...formData, proofStatus: e.target.value, proofUrl: null})} className="mr-3 w-4 h-4 accent-blue-600" />
                      <span className="text-sm font-bold text-slate-800">Gunakan Bukti Manual</span>
                    </label>
                    <label className="flex items-center p-3.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-rose-50 border-2 border-transparent has-[:checked]:border-rose-500 has-[:checked]:bg-rose-50 transition-all">
                      <input type="radio" name="proof" value="TIDAK_ADA" checked={formData.proofStatus === 'TIDAK_ADA'} onChange={e => setFormData({...formData, proofStatus: e.target.value, proofUrl: null})} className="mr-3 w-4 h-4 accent-rose-600" />
                      <span className="text-sm font-bold text-rose-600">Tidak Ada Bukti Sama Sekali</span>
                    </label>
                  </div>
                  
                  {/* UPLOAD FOTO NOTA */}
                  {formData.proofStatus === 'LENGKAP' && (
                    <div className="mt-5 pt-5 border-t border-slate-100 animate-in fade-in zoom-in duration-300">
                      <label className="block text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-2">Upload Foto Nota</label>
                      
                      {formData.proofUrl ? (
                        <div className="relative border-2 border-emerald-200 rounded-xl overflow-hidden bg-slate-50 p-2 shadow-inner">
                          <img src={formData.proofUrl} alt="Preview Bukti" className="w-full h-40 object-contain rounded-lg" />
                          <button type="button" onClick={() => setFormData({...formData, proofUrl: null})} className="absolute top-4 right-4 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg transition-transform hover:scale-110">
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-4 right-4 bg-emerald-600/95 backdrop-blur-sm p-2.5 rounded-lg flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-4 h-4 text-white mr-2" />
                            <span className="text-xs font-bold text-white tracking-wide">Foto Siap Dilampirkan</span>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-emerald-200 border-dashed rounded-xl cursor-pointer bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-colors group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                              <UploadCloud className="w-6 h-6 text-emerald-500" />
                            </div>
                            <p className="mb-1 text-sm text-slate-600 font-bold"><span className="text-emerald-600">Pilih foto</span> atau Buka Kamera</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">JPG, PNG, WEBP</p>
                          </div>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setFormData({...formData, proofUrl: url});
                            }
                          }} />
                        </label>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Catatan (Opsional)</label>
                <textarea rows="2" className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none shadow-sm"
                  value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row justify-end gap-3 shrink-0 pb-safe">
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-6 py-3.5 sm:py-3 text-sm font-black text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors tracking-wide">BATAL</button>
              <button type="submit" className={`w-full sm:w-auto px-6 py-3.5 sm:py-3 text-sm font-black text-white rounded-xl transition-all shadow-lg tracking-wide ${modalType === 'INCOME' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`}>
                SIMPAN TRANSAKSI
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans pb-16 md:pb-0">
      <Sidebar />
      <MobileBottomNav />
      <AlertBox />
      
      <main className="flex-1 md:ml-64 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden relative">
        
        <header className="bg-white border-b border-slate-200 h-14 md:h-16 flex items-center justify-between px-4 md:px-8 shrink-0 z-10 sticky top-0">
          <div className="md:hidden flex items-center">
            <h1 className="text-lg font-black text-slate-800 tracking-tight">Fin<span className="text-emerald-500">Control</span></h1>
          </div>

          <div className="hidden md:flex items-center text-sm">
            <span className="font-black text-indigo-600 uppercase tracking-widest text-[10px] bg-indigo-50 px-2 py-1 rounded">Periode Aktif</span>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
            <span className="font-bold text-slate-700">Semua Data</span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <select value={role} onChange={(e) => handleRoleChange(e.target.value)}
              className="md:hidden bg-slate-100 text-slate-700 border border-slate-200 rounded-lg p-1.5 text-xs font-bold focus:outline-none">
              <option value="OWNER">Owner</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            </select>

            {role !== 'OWNER' && (
              <div className="hidden md:flex space-x-2 mr-4 border-r border-slate-200 pr-6">
                <button onClick={() => openForm('INCOME')} className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-black hover:bg-emerald-100 transition-colors uppercase tracking-wide">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Dana Masuk
                </button>
                <button onClick={() => openForm('EXPENSE')} className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-black hover:bg-indigo-100 transition-colors uppercase tracking-wide">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Pengeluaran
                </button>
              </div>
            )}

            <div className="flex items-center">
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 md:mr-2 shrink-0">
                 <User className="w-4 h-4" />
               </div>
               <div className="hidden md:block text-sm">
                 <div className="font-bold text-slate-800 leading-tight">Pengguna Aktif</div>
                 <div className="text-[10px] uppercase font-black tracking-widest text-indigo-600">{role}</div>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          <div className="max-w-6xl mx-auto pb-6">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                {activeTab === 'DASHBOARD' ? 'Dashboard Monitoring' : 
                 activeTab === 'TRANSAKSI' ? 'Buku Transaksi Laporan' : 
                 'Galeri Bukti Visual'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
                {activeTab === 'DASHBOARD' ? 'Ringkasan posisi keuangan dan status akuntabilitas (Real-time).' : 
                 activeTab === 'TRANSAKSI' ? 'Histori pergerakan dana masuk dan keluar.' : 
                 'Kumpulan lampiran foto nota dan bukti transfer.'}
              </p>
            </div>

            {activeTab === 'DASHBOARD' && <DashboardView />}
            {activeTab === 'TRANSAKSI' && <TransactionsView />}
            {activeTab === 'BUKTI' && <ProofGalleryView />}
          </div>
        </div>
      </main>

      {/* MOBILE FLOATING ACTION BUTTON */}
      {role !== 'OWNER' && (
        <div className="md:hidden fixed bottom-20 right-4 z-40 flex flex-col items-end">
          {isFabOpen && (
            <div className="flex flex-col space-y-3 mb-4 items-end animate-in slide-in-from-bottom-5 fade-in duration-200">
              <button onClick={() => openForm('INCOME')} className="flex items-center gap-3 pr-2">
                <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-black tracking-wide text-slate-700">DANA MASUK</span>
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center shrink-0">
                  <ArrowDownToLine className="w-5 h-5"/>
                </div>
              </button>
              <button onClick={() => openForm('EXPENSE')} className="flex items-center gap-3 pr-2">
                <span className="bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-black tracking-wide text-slate-700">PENGELUARAN</span>
                <div className="w-12 h-12 bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center shrink-0">
                  <ArrowUpFromLine className="w-5 h-5"/>
                </div>
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setIsFabOpen(!isFabOpen)} 
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${isFabOpen ? 'bg-slate-800 rotate-45 scale-110' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            <Plus className="w-7 h-7" />
          </button>
          
          {isFabOpen && (
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1]" onClick={() => setIsFabOpen(false)}></div>
          )}
        </div>
      )}

      {isModalOpen && <FormModal />}
    </div>
  );
}











