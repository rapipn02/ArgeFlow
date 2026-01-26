# Admin Table Components - Panduan Penggunaan

## Komponen yang Tersedia

### 1. Table
Komponen tabel utama yang reusable.

**Props:**
- `columns` (array): Definisi kolom tabel
- `data` (array): Data yang akan ditampilkan

**Contoh Penggunaan:**
```jsx
const columns = [
    {
        key: 'name',
        label: 'Nama',
        render: (item) => <div>{item.name}</div>
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'actions',
        label: 'Aksi',
        align: 'right',
        render: (item) => <ActionButtons onDelete={() => handleDelete(item.id)} />
    }
];

<Table columns={columns} data={items} />
```

### 2. Pagination
Komponen pagination otomatis untuk Laravel paginated data.

**Props:**
- `data` (object): Data pagination dari Laravel

**Contoh:**
```jsx
<Pagination data={users} />
```

### 3. ActionButtons
Tombol aksi (View, Edit, Delete) yang konsisten.

**Props:**
- `onView` (function): Handler untuk tombol view
- `onEdit` (function): Handler untuk tombol edit  
- `onDelete` (function): Handler untuk tombol delete

**Contoh:**
```jsx
<ActionButtons 
    onView={() => router.visit(route('admin.users.show', user.id))}
    onEdit={() => setEditModal(true)}
    onDelete={() => handleDelete(user.id)}
/>
```

### 4. Badge
Komponen badge untuk status/role.

**Props:**
- `variant` (string): default, primary, success, warning, danger, purple, pink
- `children`: Konten badge

**Contoh:**
```jsx
<Badge variant="success">Active</Badge>
<Badge variant="purple">Admin</Badge>
```

### 5. TableHeader
Header halaman dengan tombol tambah.

**Props:**
- `title` (string): Judul halaman
- `subtitle` (string): Subtitle/deskripsi
- `onAdd` (function): Handler tombol tambah
- `addButtonText` (string): Teks tombol (default: "Tambah")

**Contoh:**
```jsx
<TableHeader 
    title="Manajemen User"
    subtitle="Kelola pengguna dan role"
    onAdd={() => setShowModal(true)}
    addButtonText="Tambah User"
/>
```

### 6. SearchFilter
Filter dan pencarian.

**Props:**
- `searchPlaceholder` (string): Placeholder input search
- `onSearch` (function): Handler search
- `searchValue` (string): Nilai search
- `filters` (array): Array objek filter

**Contoh:**
```jsx
<SearchFilter 
    searchPlaceholder="Cari nama atau email..."
    onSearch={(e) => setSearch(e.target.value)}
    searchValue={search}
    filters={[
        {
            label: 'Status',
            type: 'select',
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            options: [
                { value: 'all', label: 'Semua' },
                { value: 'active', label: 'Aktif' },
            ]
        }
    ]}
/>
```

### 7. Modal
Modal dialog yang konsisten.

**Props:**
- `show` (boolean): Status tampil/sembunyi
- `onClose` (function): Handler close
- `title` (string): Judul modal
- `maxWidth` (string): Max width (default: 'max-w-lg')
- `children`: Konten modal

**Contoh:**
```jsx
<Modal 
    show={showModal}
    onClose={() => setShowModal(false)}
    title="Tambah Data"
    maxWidth="max-w-2xl"
>
    <form>
        {/* Form content */}
    </form>
</Modal>
```

### 8. EmptyState
Tampilan ketika tidak ada data.

**Props:**
- `icon` (component): Icon komponen (default: Package)
- `title` (string): Judul
- `description` (string): Deskripsi
- `action` (component): Action button/link

**Contoh:**
```jsx
<EmptyState 
    icon={Users}
    title="Belum Ada User"
    description="Tambahkan user pertama Anda"
    action={
        <button onClick={() => setShowModal(true)}>
            Tambah User
        </button>
    }
/>
```

## Template Lengkap untuk Halaman Baru

```jsx
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import Table from '@/Components/Admin/Table';
import Pagination from '@/Components/Admin/Pagination';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Badge from '@/Components/Admin/Badge';
import TableHeader from '@/Components/Admin/TableHeader';
import SearchFilter from '@/Components/Admin/SearchFilter';
import Modal from '@/Components/Admin/Modal';

export default function Index({ items }) {
    const [showModal, setShowModal] = useState(false);

    const columns = [
        {
            key: 'name',
            label: 'Nama',
            render: (item) => (
                <div className="text-sm font-medium text-gray-900">
                    {item.name}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (item) => (
                <Badge variant={item.is_active ? 'success' : 'default'}>
                    {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (item) => (
                <ActionButtons
                    onEdit={() => handleEdit(item.id)}
                    onDelete={() => handleDelete(item.id)}
                />
            ),
        },
    ];

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus?')) {
            router.delete(route('admin.items.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Data" />

            <div className="space-y-6">
                <TableHeader
                    title="Manajemen Data"
                    subtitle="Kelola data Anda"
                    onAdd={() => setShowModal(true)}
                />

                <SearchFilter
                    searchPlaceholder="Cari data..."
                />

                <Table columns={columns} data={items.data} />
                
                <Pagination data={items} />
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Tambah Data">
                {/* Form content */}
            </Modal>
        </AdminLayout>
    );
}
```

## Styling Guidelines

Semua komponen menggunakan:
- Tailwind CSS classes yang konsisten
- Border: `border-gray-200`
- Background: `bg-white`
- Rounded: `rounded-lg` atau `rounded-xl`
- Padding tabel: `px-6 py-4` untuk cell, `px-6 py-3` untuk header
- Hover states: `hover:bg-gray-50` untuk rows
- Text colors: `text-gray-900` untuk primary, `text-gray-500` untuk secondary

## Tips Penggunaan

1. **Gunakan render function** untuk custom cell content
2. **Badge variants** disesuaikan dengan konteks (success untuk aktif, danger untuk error, dll)
3. **ActionButtons** hanya tampilkan yang diperlukan (tidak semua halaman butuh view/edit/delete)
4. **SearchFilter** bisa hanya search atau kombinasi dengan filter lainnya
5. **Modal maxWidth** disesuaikan dengan konten (default max-w-lg cukup untuk form sederhana)
