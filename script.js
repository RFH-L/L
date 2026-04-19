/* --- 1. Fungsi Menutup Overlay Selamat Datang --- */
function closeOverlay() {
    const overlay = document.getElementById('welcome-overlay');
    // Menambahkan efek fade out sederhana
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}

/* --- 2. Fungsi Sidebar (Menu Garis Tiga) --- */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    // Menambah atau menghapus class 'active' yang sudah kita buat di CSS
    sidebar.classList.toggle('active');
}

/* --- 3. Fungsi Mode Gelap / Mode Terang --- */
function toggleDarkMode() {
    const body = document.body;
    const themeBtn = document.getElementById('dark-mode-toggle');
    const icon = themeBtn.querySelector('i');

    // Toggle class dark-mode pada body
    body.classList.toggle('dark-mode');

    // Mengubah ikon bulan menjadi matahari saat mode gelap aktif
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Simpan pilihan user ke localStorage agar tidak hilang saat refresh
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

/* --- 4. Cek Tema Saat Halaman Dimuat --- */
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#dark-mode-toggle i');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
};

/* --- 5. Fungsi Aksesibilitas (Opsional: Ubah Ukuran Font) --- */
// Ini bisa dihubungkan ke tombol di dalam pengaturan nanti
function changeFontSize(action) {
    const body = document.body;
    let currentSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
    
    if (action === 'increase') {
        body.style.fontSize = (currentSize + 2) + 'px';
    } else if (action === 'decrease') {
        body.style.fontSize = (currentSize - 2) + 'px';
    } else {
        body.style.fontSize = '16px'; // Reset ke normal
    }
}

/* --- Tambahan Fungsi untuk Halaman Detail --- */

// 1. Fungsi untuk menampilkan popup daftar tugas (Simple Alert/Modal)
function showTasks() {
    // Di sini kita bisa mengambil data dari observasi Cookpad yang Anda buat tadi
    const tugas = [
        "Tugas 1: Observasi Karakteristik UI Cookpad (Selesai)",
        "Tugas 2: Analisis Faktor UX Cookpad (Selesai)",
        "Tugas 3: Wireframing Aplikasi Resep (Proses)"
    ];
    
    alert("Daftar Tugas UI/UX:\n\n" + tugas.join("\n"));
}

// 2. Memastikan Sidebar tetap bisa dibuka di halaman detail
// (Fungsi toggleMenu yang sudah ada otomatis bekerja jika ID-nya sama)

// Fungsi untuk menjalankan animasi Progress Bar
function animateProgressBar(targetPercent) {
    const fill = document.getElementById('uiux-progress');
    const text = document.getElementById('progress-text');
    
    if(fill && text) {
        // 1. Jalankan animasi bar (CSS Transition)
        fill.style.width = targetPercent + '%';
        
        // 2. Animasi angka yang berjalan (counter)
        let count = 0;
        let interval = setInterval(() => {
            if (count >= targetPercent) {
                clearInterval(interval);
            } else {
                count++;
                text.innerText = count + '% Materi Terselesaikan';
            }
        }, 100); // Kecepatan angka bertambah (20ms per angka)
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.addEventListener('load', () => {
    // Anda bisa mengubah angka 40 sesuai progres asli Anda
    animateProgressBar(40); 
});
// Fungsi untuk filter mata kuliah di beranda
function filterTasks() {
    let input = document.getElementById('taskSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('matkul-card'); // Pastikan class kartu matkul Anda adalah ini

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Fungsi pembantu untuk tag populer
function setSearch(value) {
    document.getElementById('taskSearch').value = value;
    filterTasks();
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    let isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Toggle Contrast
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Toggle Simple Mode (Hanya Teks)
function toggleSimpleMode() {
    document.body.classList.toggle('simple-mode');
}

// Fungsi Simpan (Opsional untuk efek)
function saveSettings() {
    alert("Pengaturan Berhasil Disimpan!");
}

// Cek pengaturan saat loading halaman
// Fungsi yang dijalankan setiap kali halaman dimuat
window.onload = function() {
    // 1. Cek apakah user sebelumnya menyalakan Dark Mode (di Local Storage)
    const isDark = localStorage.getItem('darkMode') === 'true';

    // 2. Jika iya, terapkan class dark-mode ke BODY (berlaku di semua halaman)
    if (isDark) {
        document.body.classList.add('dark-mode');
    }

    // 3. SELESAIKAN MASALAH ERROR:
    // Cek dulu apakah elemen 'darkModeToggle' ada di halaman ini?
    const toggleElement = document.getElementById('darkModeToggle');
    
    // Hanya jika elemennya ADA (seperti di atur.html), baru set status 'checked'
    if (toggleElement) {
        toggleElement.checked = isDark;
    }
};
