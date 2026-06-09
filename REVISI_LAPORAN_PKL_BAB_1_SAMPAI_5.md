# DRAFT REVISI LAPORAN PKL (Sesuai Format Baru)

*(Catatan: Anda dapat langsung memblok seluruh teks di bawah ini, lalu Copy (Ctrl+C) dan Paste (Ctrl+V) ke dalam Microsoft Word Anda. Beberapa gambar dan tabel yang berasal dari PDF lama Anda telah saya berikan tanda kurung siku `[...]` agar Anda mudah menempelkannya kembali).*

---

**BAB 1. PENDAHULUAN**

**1.1 Latar Belakang**
**a. Alasan Mengapa PKL Dilakukan dan Relevansinya dengan Bidang Teknik Komputer**
PT. ARG SOLUSI TEKNOLOGI adalah perusahaan yang bergerak di sektor teknologi informasi di Kota Padang, dengan spesialisasi pada pengembangan perangkat lunak dan solusi digital. Fokus layanannya mencakup pembuatan aplikasi web, aplikasi seluler, hingga pembangunan sistem informasi manajemen bagi instansi pemerintah dan swasta. Meningkatnya kebutuhan transformasi digital belakangan ini berdampak langsung pada bertambahnya volume proyek yang ditangani perusahaan. Situasi ini menjadikan PT. ARG SOLUSI TEKNOLOGI tempat yang sangat relevan dan ideal untuk pelaksanaan Praktik Kerja Lapangan (PKL) bagi mahasiswa Departemen Teknik Komputer, khususnya untuk mengaplikasikan ilmu rekayasa perangkat lunak secara utuh dan mempelajari dinamika pengembangan sistem di industri nyata industri.

**b. Menghubungkan Topik dengan Kurikulum Akademik serta Kebutuhan Industri**
Berdasarkan kurikulum akademik, mahasiswa dituntut untuk memahami siklus hidup pengembangan sistem yang modern, terstruktur, dan solutif. Hal ini berhubungan langsung dengan pengamatan di perusahaan, di mana proses pemesanan proyek, manajemen alokasi tim programmer (freelancer), dan pelaporan riwayat pemesanan seringkali masih dilakukan secara konvensional (mengandalkan pesan instan). Cara ini menimbulkan masalah seperti diskusi penting yang tertimbun dan ketiadaan pelacakan penyelesaian pesanan (issue tracking) yang terpusat. Masalah lainnya muncul dari pencatatan keuangan yang konvensional sehingga rentan salah.

Menjawab tantangan tersebut sekaligus menghubungkannya dengan kompetensi kurikulum, diperlukan sebuah sistem komprehensif berupa Portal Freelance dan Manajemen Proyek berbasis web. Oleh karena itu, pengangkatan topik "Rancang Bangun Portal Freelance dan Manajemen Proyek Terintegrasi CRM serta Payment Gateway Berbasis Website" ini tidak hanya menjadi wujud implementasi ilmu teknologi secara akademik, tetapi juga solusi esensial bagi perusahaan demi meningkatkan efisiensi, transparansi pengerjaan, dan otomatisasi administrasi tagihan pelanggan secara pesat.

**1.2 Tujuan PKL**
Tujuan utama dari dilaksanakannya PKL ini adalah:
1. Merancang dan membangun Portal Freelance dan Manajemen Proyek (ArgeFlow) berbasis web yang terintegrasi dengan sistem Customer Relationship Management (CRM) untuk memusatkan data layanan, pemesanan, dan progres pengerjaan agar terpantau secara real-time.
2. Mengimplementasikan API Payment Gateway (Midtrans) guna mengotomatisasi proses tagihan (invoicing) dan verifikasi penyelesaian pembayaran klien secara aman.
3. Menyediakan sistem kolaborasi terstruktur antara Klien dan Programmer—melalui fungsionalitas unggahan progres, komentar interaktif, dan manajemen revisi proyek.
4. Menerapkan keilmuan akademis pengembangan Full-Stack (menggunakan framework Laravel dan React.js) beserta interaksi database ke dalam skenario industri nyata.
5. Memperoleh pengalaman kerja profesional, wawasan praktis mengenai Software Development Life Cycle (SDLC), serta mengembangkan kedisiplinan dan profesionalisme di lingkungan perusahaan penyedia solusi digital.

**1.3 Manfaat PKL**
Kegiatan Praktik Kerja Lapangan ini diharapkan dapat memberikan manfaat sebagai berikut:
1. **Bagi Mahasiswa:** Mendapatkan pengalaman kerja nyata untuk memperluas wawasan industri, membuktikan implementasi teori keilmuan IT, meningkatkan kepakaran kemampuan teknis (hard skills) dalam pengembangan sistem modern komprehensif, serta melatih kemampuan kognitif logis (soft skills) seperti pemecahan masalah dan negosiasi. 
2. **Bagi Perusahaan (Instansi):** Mendapatkan kontribusi perangkat lunak berbasis sistem informasi secara nyata (Portal ArgeFlow) yang membantu memotong alur birokrasi, mengotomatisasi pemesanan layanan, memusatkan koordinasi tim freelancer, serta menerima integrasi penagihan dan pelaporan operasional yang dapat digunakan dikemudian hari.
3. **Bagi Institusi (Kampus):** Menjadi tolak ukur evaluasi keakuratan kurikulum pengajaran di Departemen Teknik Komputer, serta terjalinnya kemitraan dan reputasi hubungan yang baik dengan pihak korporasi.

**1.4 Capaian/Target PKL**
Adapun target spesifik yang ingin dicapai penulis selama pelaksanaan praktik ini berlangsung adalah:
1. **Penguasaan Teknologi Mutakhir:** Mampu merancang antarmuka reaktif (Single Page Application) lintas pengguna menggunakan ekosistem Inertia JS dan React JS, serta menguasai arsitektur server-side yang mumpuni melalui Framework Laravel 11/12 dan styling Tailwind CSS.
2. **Keterampilan Kerja Praktis:** Berhasil menyelesaikan dan menghantarkan produk Portal Freelance yang benar-benar mewadahi operasi administrasi mandiri mulai dari check-out proyek hingga sistem integrasi transaksi finansial Payment Gateway.
3. **Pemodelan Data Tingkat Lanjut:** Target terselesaikannya arsitektur ERD dan skema database (MySQL) yang memiliki relasional ketat antartabel (seperti users, transactions, orders, order_progress) yang sanggup melayani multi-aktor (Klien, Programmer, Superadmin) tanpa tumpang tindih otorisasi.

---

**BAB 2. PROFIL PERUSAHAAN/INSTANSI**

**2.1 Sejarah Perusahaan**
PT. ARG Solusi Teknologi, atau yang lebih dikenal dengan nama ARGENESIA, adalah perusahaan penyedia jasa yang bergerak spesifik di bidang Teknologi Informasi (IT). Sebagai perusahaan teknologi yang inovatif, ARGENESIA secara konsisten menghasilkan produk perangkat lunak serta desain solusi bisnis yang profesional.

Perusahaan memiliki komitmen kuat untuk menyediakan layanan dan produk berkualitas yang sesuai dengan kebutuhan spesifik pelanggan. Tujuannya adalah untuk meningkatkan daya saing klien serta membantu mereka mencapai kesuksesan dalam menjalankan bisnis. Dengan didukung oleh tim yang memiliki kompetensi tinggi, jaringan yang luas, serta profesionalisme kerja, ARGENESIA mampu menghadirkan solusi cerdas melalui penggabungan teknologi terbaru.

**2.2 Struktur Organisasi Perusahaan**
**a. Bagan Struktur Organisasi Perusahaan**
*[TEMPELKAN GAMBAR 2.2 STRUKTUR ORGANISASI PERUSAHAAN ANDA DI SINI]*

**b. Divisi dan Posisi Relevan**
Berikut adalah penjelasan tentang struktur organisasi pada PT. ARG Solusi Teknologi beserta hubungannya dengan tugas penulis selama magang:
- **Komisaris (Rahmat Irvan & Geovanne Farel) & Direktur (Alex Wardana):** Berperan merumuskan kebijakan operasional strategis, memastikan finansial sistem manajemen kompetitif dan mengawasi jalannya perusahaan.
- **CTO (Chief Technology Officer - Arohim Furqan):** Berperan mengelola infrastruktur IT dan kemudi rekayasa pengembangan solusi perangkat lunak (sistem baru).
- **Backend Developer (Arohim Furqan, Vahqrul Ridho, dkk) & Frontend Developer (Alex Wardana, dll):** Mengelola antarmuka pengguna, keandalan server basis data, serta logika model interaksi. 
*(Posisi yang Relevan: Selama pelaksanaan PKL, penulis utamanya dibimbing langsung oleh Vahqrul Ridho di lini Backend Developer untuk mendalami pembuatan antarmuka pengguna logika server sistem).*
- **UI/UX Designer, Mobile Developer, Sekretaris, dan Finance:** Mendukung tata letak ekosistem perusahaan, desain layar, hingga administrasi keuangan.

**2.3 Bidang Usaha Perusahaan**
PT. ARG SOLUSI TEKNOLOGI menggeluti bidang utama teknologi informasi dan pengembangan perangkat lunak (software development). Visi utama perusahaan ditujukan agar setiap bisnis klien dapat dipublikasi dan dimonitoring secara digital sedemikian rupa sehingga mendongkrak operasional mereka. 
Adapun cakupan rincian layanannya meliputi:
1. Pengembangan web kepemerintahan, e-absensi, indeks kepuasan nasabah, sistem pelacakan (E-panel), arsip kependudukan, hingga pengembangan Sistem Informasi Akademik.
2. Solusi fisik infrastruktur dan perpaduan IoT: instalasi cctv terpusat, papan videotron, mesin antrian, modul tata letak parkiran, serta implementasi cerdas (Smart Home). 

---

**BAB 3. PELAKSANAAN**

**3.1 Waktu dan Tempat PKL**
Praktik Kerja Lapangan dilaksanakan dan terhitung resmi mulai dari 5 Januari 2026 hingga 6 Februari 2026. Pelaksanaan kegiatan ini diselenggarakan di instansi PT. ARG SOLUSI TEKNOLOGI yang beralamat di Jl. Puti Bungsu 17B, Kav 2 Kota Padang. Selama di lokasi, penulis ditempatkan spesifik dalam divisi pengembang purna-tumpuk (Full-Stack / Backend Developer), di mana tugas terperinci divisi ini adalah menelaah gagasan pengembangan piranti lunak, merancang model aliran basis data, mengintegrasikan antarmuka logis dengan pustaka server-side, serta mengamankan jalannya logika pemesanan transaksi hingga layak pakai bagi pelanggan.

**3.2 Rencana Pelaksanaan PKL**
Sebelum PKL dimulai bersinggungan langsung dengan tugas pengembangan penuh, penulis dihadapkan pada skenario rencana pelaksaan yang terdistribusi ke dalam beberapa target rute migrasi keahlian (sprint mingguan). Rencana tersebut mewajibkan penulis untuk terlebih dahulu (di minggu pertama) memperdalam adopsi dan beradaptasi dengan alur kerangka modul Laravel 12 terbaru. Rencana pengerjaan (minggu kedua hingga keempat) menargetkan eksekusi proyek sistem manajemen pesanan (Portal ArgeFlow) yang diawali dengan perancangan use case, flow chart relasional database logis, perakitan Backend-Frontend, lalu dilanjutkan target pembersihan kutu algoritma (minggu kelima) demi kesempurnaan laporan.

**3.3 Pelaksanaan PKL**
**a. Aktivitas Harian**
Proses dinas harian PKL mengadopsi standar kedisiplinan operasional yang mewajibkan waktu efektif di hari Senin hingga Jumat (mulai pukul 10.00 WIB hingga pukul 17.00 WIB). Konteks rutinitas kegiatan berawal dari sesi sinkronisasi mingguan diskusi rancangan awal desain proyek bersama pembimbing industri (mentor), beralih menuju tahap pembangunan fondasi relasional pada model aplikasi, penciptaan laman visual (frontend), pencocokan otentikasi server integratif API, penyetelan bug perombakan kode, dan evaluasi hasil dengan pimpinan. Keseluruhan sirkulasi kegiatan dijaga interaktif menyerupai implementasi dunia pekerja pengembangan perangkat lunak dinamis. 

**b. Alat atau Teknologi yang Digunakan**
Selain peranti lunak komputer (Laptop) dan aplikasi kode teks editor Visual Studio Code, keberhasilan instruksi harian PKL ini terjamin berkat kolaborasi penggunaan peranti web spesifik, mencakup terminal eksekusi PHP lokal (XAMPP localhost) dan sintaks MySQL. Framework backend bertumpu pada modernisasi versi rilis Laravel (dengan struktur Eloquent ORM). Tata letak interaksi visibilitas klien/programmer diimplementasikan murni dari ekstensi antarmuka React JS, dijahit performanya bergaya SPA dengan Inertia.js dan dipoles responsivitasnya oleh utilitas dinamis framework Tailwind CSS. Pembayaran faktur eksternal divalidasi memanfaatkan dokumentasi sandi (Web-Hook) API Midtrans.

**c. Uraian Proyek Laporan**
Berlandaskan teknologi-teknologi unggulan yang telah diaplikasikan di atas, proyek yang diangkat sebagai pusaran pengerjaan bernama "Rancang Bangun Portal Freelance dan Manajemen Proyek Terintegrasi CRM serta Payment Gateway Berbasis Website". Sistem Portal 'ArgeFlow' mendigitalisasi mekanisme pemeliharaan pemesanan layanan dari sisi Klien dengan memfokuskan transparansi pantauan tahapan kerja (progres) via pelacakan log aktivitas yang diunduh langsung ke bilik (workspace) khusus untuk dikomunikasikan oleh sub-Tim Pengembang serta diawasi penuh via panel kontrol Administrator.

---

**BAB 4. PEMBAHASAN**

Bagian ini memuat analisis terperinci terhadap pengalaman kegiatan pengerjaan proyek portal web, halangan maupun mitigasi pemecahannya, serta landasan metodologinya.

**a. Analisis Tugas yang Dilakukan terhadap Relevansi Matakuliah**
Penugasan mandiri dalam menuntaskan satu rantai utuh perangkat lunak "Portal Freelance Sistem Manajemen ArgeFlow" ini memiliki sinergitas yang amat persis dengan penerapan matakuliah spesifik, di antaranya:
- **Matakuliah Sistem Basis Data:** Pembuatan portal terhitung mustahil beroprasi tanpa fondasi yang sejalan dengan teori relasional. Penulis telah mempraktikkan secara langsung perancangan *Entity Relationship Diagram* (ERD), penentuan foreign kunci (Foreign Keys), mengabstrasi hirarki relasi one-to-many, sinkronasi struktur melalui skema *database migration*, dan menjaga prinsip *Normalisasi form ke-3 (3NF)* ketika memecah arus lalu lintas finansial pelanggan ke tabel-tabel sekunder (orders_payments dan transactions). 
- **Matakuliah Rancangan Perangkat Lunak Secara Keseluruhan:** Eksekusi aplikasi memvisualkan esensi riil SDLC dari metode ke-Agile-an (kerangka Scrum). Konsep fundamental seperti Diagram Interaksi Usecase/Flowchart alur Klien-Admin, arsitektur *MVC (Model-View-Controller)* guna melenyapkan tumpang tindih alur kode, serta strategi *Black Box Testing* saat tahap kualitas pengujian telah berhasil dimanifestasikan dalam praktik pengembangan antarmuka portal. 

**b. Hambatan dan Kendala yang Dihadapi (Masalah Teknis & Sumber Daya)**
Beberapa problematika dan tantangan kompleks yang memperlambat pengerjaan kegiatan instalasi ini mencakup:
1. Kurangnya insting pemahaman di periode awal ketika terjadi pergeseran paradigma lingkungan framework templating lawas vertikal (Blade Laravel) yang harus dibanting menujuk arsitektur canggih pemecah-komponen antarmuka yang statis *(Component-based Single Page Application)* menggunakan sirkuit React JS dan Inertia.
2. Hambatan rekayasa kode pada algoritma Controller Laravel. Komplikasi ekstrem muncul mengatur alur logika perizinan pembaruan (Progress Controller) berhubung entitas yang masuk berasal dari banyak arah gerbang (multirole); baik permintaan konfirmasi dari Klien, setoran file dari Programmer, disamping monitor penyortiran otorisasi silang Admin. 
3. Keterbatasan teknis pada jam terbang simulasi skenario lalu-lintas pembayaran daring; utamanya ketika memastikan titik temu verifikasi "Order Lunas" dengan server Webhook eksternal (API Midtrans Gateway) agar aman dari injeksi perubahan tagihan oleh oknum pengguna. 

**c. Solusi Penyelesaian Hambatan Selama PKL**
Berupaya mengatasi polemik tersebut, solusi manajerial terapan disemai dengan merombak alur waktu guna menaikkan atensi proses riset penelusuran mandiri (Membaca pustaka Official Documentation rilis terbaru milik React JS maupun Laravel 12 API). Sementara, keraguan dan kesukaran pada proses pembangunan relasional data yang saling berkelit serta verifikasi eksekutor Midtrans, secara optimal ditangani melalui serangkaian proses diskusi teknikal kolaboratif (Joint-Debugging) secara periodik bersama mentor (Rekan Tim Profesional Industri ARG). Pendekatan taktis juga didapat dengan terus mengeksekusi prinsip "Trial and Error" pada modul skripting hingga membuahkan hasil fungsi yang bebas kegagalan komputasi. 

**d. Pembahasan Mendalam Topik Proyek (Implementasi Pengembangan Portal Web)**
Dalam merancang solusi aplikasi yang terarah, penyusunan ini berangkat dari metode pengaplikasian yang sistematis berjenjang. 

*(1) Model Pengembangan Sistem*
Dalam pengembangan sistem Portal Freelance dan Manajemen Proyek Terintegrasi CRM (ArgeFlow) ini, penulis mengaplikasikan pendekatan metode Agile dengan kerangka kerja (framework) Scrum. Mengutamakan kolaborasi rekayasa ketahanan terhadap perubahan *requirement* fungsional di tengah masa pembuatan aplikasi. 
*[TEMPELKAN GAMBAR 3.1 MODEL PENGEMBANGAN SISTEM METODE AGILE ANDA DARI BAB 3 LAMA DI SINI]*

*(2) Analisis Kebutuhan Fungsional Pelayanan*
Agar pengguna (Admin, Klien, Programmer) mendapat hak guna operasional yang transparan: Klien harus dapat melihat katalog deskripsi layanan IT, harga dasar, melakukan formulir isian detail order komprehensif, menentukan kriteria target waktu, melihat unggahan komentar/revisi status kemajuan (progres) via dasbor riwayat order, hingga memproses pelunasan (Midtrans). Programmer membutuhkan dasbor daftar turunan penugasan pesanan. Admin membutuhkan monitor arus lalu-lintas pesanan, menyortir manajemen anggota (Tim Programmer), meninjau rincian validasi dana log laporan dan mendistribusikan kewenangan pengawasan antarsistem mutlak secara efisien. 

*(3) Perancangan Sistem dan Arsitektur Konsep Data*
Di tahap ini pendirian konvensional Flowchart dipaparkan dari lini operasional masing-masing pengguna untuk membingkai representasi logis tata urutan sistem informasi yang menjamin keamanan data klien.  
*[TEMPELKAN GAMBAR 3.2 FLOWCHART CLIENT, GAMBAR 3.3 FLOWCHART PROGRAMMER, GAMBAR 3.4 FLOWCHART ADMIN DARI BAB 3 LAMA ANDA DI SINI]*
 
Untuk menjamin penggabungan entitas data transaksi pemeliharaan progres dan finansial, desain alur *Entity Relationship Diagram* (ERD) dan skema hierarki penciptaan tabel utama dikonsep dengan perinci matang. Pembuatan tabel utamanya mencakup (Users, Orders, Services, Teams, Members, Revisions, Transactions, Team_rating). Relasi yang diikat sangat kuat, misalnya antara pesanan dan regu tim (*orders_team_id*), sehingga menjauhkan sistem dari inkonsistensi keanehan pertukaran data pada *dashboard*. 
*[TEMPELKAN GAMBAR 3.5 ERD DARI BAB 3 LAMA DI SINI]*
*[JIKA MAU, ANDA BISA MENEMPELKAN SELURUH TABEL DATABASE ANDA YANG ADA DI HALAMAN 20-28 DARI PDF LAMA DI SINI. JIKA TERLALU PANJANG, ANDA BISA MENGABAIKANNYA ATAU CUKUP DAFTARKAN NAMA TABELNYA SAJA]*

*(4) Implementasi Antarmuka Sistem*
Pengembangan backend dikelola melalui sistem *Controller MVC* memanfaatkan pemodelan data dari Laravel untuk mengatur respon pengkondisian transaksi. Relasionalisasi tingkat tinggi (seperti fungsi panggilan logis hasMany/belongTo) diabadikan demi mencerna kerumitan laporan rekapan *Order Progress*, *Team Management*, ke ruang navigasi responsif yang sangat cepat tanpa reload (*SPA - Inertia*) untuk Front End antarmuka klien. Proses validasi API Gateway Midtrans dienkapsulasi aman tanpa pernah memberatkan sistem perbankan utama pengguna. 
*[TEMPELKAN BEBERAPA/SELURUH GAMBAR SCREENSHOT HASIL APLIKASI WEB (GAMBAR 3.6 SAMPAI GAMBAR 3.29) DARI BAB 3 LAMA ANDA DI SINI BERSERTA PENJELASANNYA]*

*(5) Pengujian Sistem*
Pengujian dilakukan menggunakan pendekatan *Black Box Testing*. Seluruh jalur layanan web diuji dengan mengimitasi langkah Klien dan Programmer tanpa membedah blok *source-code*. Skenario operasional—mulai dari Pendaftaran Akun, Pemesanan Pesanan (*Order Creation*), Pembayaran Sinkronisasi DP (Payment Gateway Webhook), Pelaporan Unggahan Manajemen Progres, Perizinan Resolusi Siklus Revisi, Penilaian Matriks Tim Rating oleh klien hingga peninjauan di resolusi dimensi layar kecil *Smartphone mobile responsive-UI* menyentuh konfirmasi status berjalan sempurna dan "Berhasil".
*[TEMPELKAN TABEL 3.13 PENGUJIAN SISTEM DARI BAB 3 LAMA ANDA DI SINI]*

---

**BAB 5. KESIMPULAN DAN SARAN**

**5.1 Kesimpulan**
Selama pelaksanaan Praktik Kerja Lapangan (PKL), penulis telah berhasil mengembangkan sistem informasi manajemen dan pemesanan layanan proyek IT (freelance) berbasis web. Sistem ini secara khusus dirancang untuk mempermudah klien dalam melakukan transaksi pesanan (checkout) secara online, memfasilitasi rekursif tim programmer dalam melaporkan progres pengerjaan (komentar/revisi), serta mendorong efisiensi admin dalam mengelola seluruh pendataan sumber daya manusia dan lajur keuangan operasional. 

Melalui pengembangan perangkat lunak terintegrasi CRM ArgeFlow dan arsitektur database Payment Gateway Midtrans ini, penulis berhasil melampaui limitasi keahlian dan memperoleh rekam jejak keterampilan konkret mengorkestrasi tata letak backend server berbasis Laravel 11/12 yang dikombinasikan dengan kerumitan antarmuka serba cepat reaktif SPA dari React JS, Inertia.js, serta keindahan Tailwind CSS. Arsitektur pangkalan database cerdas yang dikemudikan memberikan jaminan fungsional yang siap menjawab kebutuhan instansi di ekosistem solusi digital modern sesungguhnya.

**5.2 Saran**
Berdasarkan hasil keseluruhan inovasi dan resolusi yang telah dikerjakan, berikut disertakan sejumlah peta jalan saran untuk pertimbangan evaluasi pembaruan masa mendatang:
1. **Untuk Pengembangan Sistem**: Menambahkan notifikasi interaktif *Push/Email Notifikasi (WhatsApp API)* otomatis sebagai alarm notifikasi tagihan atau pembaruan deadline status proyek revisi agar lebih komprehensif. Perombakan tata kelola *Live Chat* privat juga diperlukan demi mewadahi pertukaran perbincangan pesan di lokasi penagasan tanpa hambatan aplikasi eksternal. 
2. **Untuk Penyesuaian Infrastruktur**: Skala optimasi *Server Caching (Memanfaatkan teknologi Redis)* mungkin harus mulai digencarkan seiring bertambahnya muatan trafik pelaporan log dan statistik Dasbor yang menggerogoti kecepatan pemuatan di lingkup *database query* masa depan. 

**5.3 Bagian Akhir**
Bagian pungkas ini memuat seluruh dukungan penelusuran pustaka dokumentasi yang mendasari landasan teoretis perancangan teknologi web penulis, disusul dengan daftar lampiran yang mengabadikan dokumentasi kegiatan Praktik Kerja Lapangan. Keseluruhannya dijabarkan pada halaman Daftar Pustaka dan Lampiran secara terlampir.

*(Catatan: Setelah barisan teks di atas, silakan lanjutkan dokumen Anda langsung dengan format penulisan judul **DAFTAR PUSTAKA** dan bagian **LAMPIRAN** yang sudah ada di PDF lama Anda tanpa halangan apapun).*
