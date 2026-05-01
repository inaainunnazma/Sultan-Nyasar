// ========== DATA CHAT ==========
const chatData = [
    { speaker: "sultan", text: "Kenapa ya… rasanya harta ini banyak, tapi hatiku malah tidak tenang😔…" },
    { speaker: "ai", text: "Halo, Sultan. Kamu terlihat bingung." },
    { speaker: "sultan", text: "Siapa kamu?!" },
    { speaker: "ai", text: "Aku asisten belajar Zakat. Aku muncul saat seseorang punya harta, tapi belum tahu bagaimana cara menjaganya agar tetap berkah." },
    { speaker: "sultan", text: "Aku memang punya tabungan cukup banyak. Ayah bilang sudah waktunya untuk zakat. Tapi aku takut salah. Takut kurang. Takut tidak sampai ke orang yang berhak." },
    { speaker: "ai", text: "Ketakutan itu tanda kamu peduli. Tapi jangan biarkan kamu menjadi… Sultan yang nyasar!." },
    { speaker: "sultan", text: "Nyasar?" },
    { speaker: "ai", text: "Nyasar karena tidak tahu, apa itu zakat sebenarnya, apa dalilnya, hartamu masuk jenis zakat apa, sudah memenuhi syarat atau belum, siapa yang berhak menerimanya, dan berapa yang harus kamu keluarkan." },
    { speaker: "sultan", text: "Iya… aku memang belum tahu semua itu 😔" },
    { speaker: "ai", text: "Kalau begitu, izinkan aku membimbingmu. Kita mulai dari dasar. Pelan-pelan sampai kamu tidak lagi merasa bingung." },
    { speaker: "sultan", text: "Benarkah? Aku bisa belajar semuanya?" },
    { speaker: "ai", text: "Bukan hanya belajar. Kamu akan memahami, lalu menghitung sendiri zakatmu dengan tepat." },
    { speaker: "sultan", text: "Kalau begitu… aku siap. Aku tidak mau jadi Sultan Nyasar lagi." },
    { speaker: "ai", text: "Baiklah. Mari kita mulai perjalanan menuju Sultan Berkah." }
];

// ========== VARIABEL ==========
let chatIndex = 0;
const AMILIN_API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000/api/chat' : '/api/chat';

// ========== VARIABEL GLOBAL ==========
let globalScore = 0;

// ========== DATA GAME ==========
const trueFalseData = [
    { text: "Zakat fitrah dibayar sebesar 2,5 kg beras.", answer: true },
    { text: "Zakat emas nisabnya 85 gram.", answer: true },
    { text: "Penerima zakat ada 9 golongan.", answer: false },
    { text: "Zakat maal dikeluarkan setiap bulan.", answer: false },
    { text: "Orang yang berhutang termasuk penerima zakat.", answer: true },
    { text: "Zakat hanya boleh diberikan kepada keluarga sendiri.", answer: false },
    { text: "Harta yang disimpan selama 1 tahun wajib dizakati.", answer: true },
    { text: "Zakat pertanian kadar 10% untuk irigasi berbayar.", answer: false },
    { text: "Amil adalah petugas zakat.", answer: true },
    { text: "Zakat rikaz adalah 20% dari harta karun.", answer: true },
    { text: "Syarat wajib zakat adalah kaya raya.", answer: false },
    { text: "Zakat bisa diberikan kepada non-muslim.", answer: false },
    { text: "Zakat fitrah bisa dibayar dengan uang.", answer: true },
    { text: "Nisab zakat perak 595 gram.", answer: true },
    { text: "Zakat penghasilan wajib setiap bulan.", answer: true },
    { text: "Mualaf termasuk penerima zakat.", answer: true },
    { text: "Zakat ternak sapi nisab 30 ekor.", answer: true },
    { text: "Zakat perniagaan dikenakan 2,5% dari keuntungan.", answer: false },
    { text: "Zakat fitrah wajib bagi setiap muslim.", answer: true },
    { text: "Haul adalah kepemilikan selama 2 tahun.", answer: false }
];

const gameData = [
    {
        categoryName: "Syarat Wajib Zakat",
        decoyName: "Bukan Syarat",
        correctItems: ["Merdeka", "Islam", "Baligh", "Kondisi Harta", "Nisab", "Haul"],
        wrongItems: ["Kaya raya", "Memiliki mobil", "Sudah menikah", "Tinggal di kota"]
    },
    {
        categoryName: "Jenis Zakat",
        decoyName: "Bukan Jenis Zakat",
        correctItems: ["Zakat Fitrah", "Zakat Emas", "Zakat Maal", "Zakat Perniagaan", "Zakat Ternak", "Zakat Pertanian", "Zakat Rikaz"],
        wrongItems: ["Zakat Pendidikan", "Zakat Internet", "Zakat Rumah", "Zakat Kendaraan"]
    },
    {
        categoryName: "Penerima Zakat",
        decoyName: "Bukan Penerima",
        correctItems: ["Fakir", "Miskin", "Amil", "Mualaf", "Gharim", "Ibnu Sabil"],
        wrongItems: ["Orang kaya", "Pejabat", "Pengusaha sukses", "Artis terkenal"]
    },
    {
        categoryName: "Fungsi Zakat",
        decoyName: "Bukan Fungsi",
        correctItems: ["Menyucikan harta dan jiwa", "Meningkatkan kepedulian sosial", "Mengurangi kesenjangan ekonomi", "Membangun masyarakat adil", "Mendekatkan diri kepada Allah"],
        wrongItems: ["Menambah kekayaan pribadi", "Membuat sombong", "Pamer kekayaan", "Mencari popularitas"]
    },
    {
        categoryName: "Dalil Zakat",
        decoyName: "Bukan Dalil",
        correctItems: ["QS At-Taubah: 103", "QS At-Taubah: 60", "QS Al-Baqarah: 43", "QS An-Nur: 56", "QS Ar-Rum: 39"],
        wrongItems: ["QS. Al-Insyirah: 6", "QS. Ar-Rahman: 33", "QS. Al-Kafirun: 6", "QS. Al-Ma'idah: 2"]
    }
];

// ========== GAME STATE ==========
let gameState = {
    mode: '',
    current: 0,
    score: 0,
    questions: [],
    answered: [],
    perQuestion: []
};

// ========== FUNGSI SHUFFLE ==========
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ========== FUNGSI HANDLE TRUE FALSE ==========
function handleTFAnswer(userAnswer, correctAnswer) {
    const isCorrect = userAnswer === correctAnswer;
    const feedbackDiv = document.getElementById('tf-feedback');

    if (isCorrect) {
        gameState.score += 10;
        feedbackDiv.innerHTML = '<p style="color: green;">🎉 Benar! +10 poin</p>';
        createConfetti();
    } else {
        feedbackDiv.innerHTML = `<p style="color: red;">😊 Salah! Jawaban benar: ${correctAnswer ? 'Benar' : 'Salah'}</p>`;
    }

    // Disable buttons
    const btnTrue = document.querySelector('.tf-btn.true');
    const btnFalse = document.querySelector('.tf-btn.false');
    if (btnTrue) btnTrue.disabled = true;
    if (btnFalse) btnFalse.disabled = true;

    // Mark as answered
    gameState.answered[gameState.current] = true;

    // Show next button after delay
    setTimeout(() => {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = gameState.current + 1 < gameState.questions.length ? 'Selanjutnya ▶' : 'Selesai';
        nextBtn.onclick = () => gameNextQuestion();

        const controls = document.querySelector('.tf-options') || document.getElementById('game-content');
        controls.appendChild(nextBtn);
    }, 1500);
}

// ========== FUNGSI HANDLE DRAG DROP ==========
function handleDragNext(question) {
    // Validasi apakah semua item sudah ditempatkan
    const remaining = document.querySelectorAll('#drag-items-container .drag-item').length;
    if (remaining > 0) {
        showFeedback("Yuk selesaikan semua item dulu! 😊", false);
        return;
    }

    // Hitung skor
    const correctZone = document.getElementById('correct-zone');
    const correctItems = correctZone ? Array.from(correctZone.querySelectorAll('.drag-item')).map(el => el.getAttribute('data-item')) : [];

    const correctCount = correctItems.filter(item => question.correctItems.includes(item)).length;
    const wrongCount = correctItems.filter(item => question.wrongItems.includes(item)).length;

    if (wrongCount > 0) {
        showFeedback(`Ada item yang salah tempat! Coba perbaiki. 😊`, false);
        return;
    }

    // Jika semua benar
    gameState.score += 20;
    showFeedback("MasyaAllah, hebat! 🎉", true);

    // Mark as answered
    gameState.answered[gameState.current] = true;

    setTimeout(() => {
        gameNextQuestion();
    }, 1500);
}

// ========== FUNGSI SETUP DRAG AND DROP ==========
function setupDragAndDrop(question) {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    const itemText = e.dataTransfer.getData('text/plain');
    if (!draggedItem) return;

    // Cari apakah item sudah dipindahkan sebelumnya
    if (draggedItem.parentElement !== document.getElementById('drag-items-container')) {
        showFeedback("Item sudah ditempatkan, tidak bisa dipindah lagi! 😊", false);
        return;
    }

    // Pindahkan item ke drop zone
    const targetZone = this.querySelector('.dropped-items');
    const newItem = draggedItem.cloneNode(true);
    newItem.draggable = false;
    newItem.classList.remove('dragging');
    targetZone.appendChild(newItem);
    draggedItem.remove();

    // Cek apakah item sesuai kategori
    const category = this.getAttribute('data-category');
    const isCorrect = (category === 'correct' && question.correctItems.includes(itemText)) ||
        (category === 'wrong' && question.wrongItems.includes(itemText));
    if (!isCorrect) {
        showFeedback("Item ini tidak sesuai kategori! Coba seret ke tempat lain. 😊", false);
        // Kembalikan ke asal
        const container = document.getElementById('drag-items-container');
        const oldItem = draggedItem.cloneNode(true);
        oldItem.draggable = true;
        oldItem.addEventListener('dragstart', handleDragStart);
        oldItem.addEventListener('dragend', handleDragEnd);
        container.appendChild(oldItem);
        targetZone.removeChild(newItem);
    }
}

function showFeedback(msg, isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerText = msg;
    feedbackDiv.style.color = isCorrect ? '#28a745' : '#dc3545';
    if (isCorrect) {
        createConfetti();
    } else {
        const container = document.querySelector('.drag-game-container') || document.getElementById('game-content');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
    setTimeout(() => feedbackDiv.innerText = '', 1500);
}

function createConfetti() {
    const confettiDiv = document.createElement('div');
    confettiDiv.className = 'confetti';
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.width = '5px';
        piece.style.height = '10px';
        piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        piece.style.left = Math.random() * window.innerWidth + 'px';
        piece.style.top = '-20px';
        piece.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        piece.style.opacity = Math.random();
        confettiDiv.appendChild(piece);
    }
    document.body.appendChild(confettiDiv);
    setTimeout(() => confettiDiv.remove(), 2000);
}

// ========== FUNGSI BACK TO MAIN MENU ==========
function backToMainMenu() {
    // Sembunyikan game section
    const gameSection = document.getElementById('game-section');


    // Tampilkan main menu
    const mainMenu = document.getElementById('main-menu-section');
    if (mainMenu) mainMenu.style.display = 'block';

    // Reset game state
    gameState = {
        mode: '',
        current: 0,
        score: 0,
        questions: [],
        answered: [],
        perQuestion: []
    };
}

// ========== FUNGSI BIODATA ==========
function saveBiodata() {
    const nameInput = document.getElementById('biodata-name');
    const classInput = document.getElementById('biodata-class');
    const numberInput = document.getElementById('biodata-number');

    if (!nameInput || !classInput || !numberInput) {
        console.error('Input biodata tidak ditemukan');
        return;
    }

    const name = nameInput.value.trim();
    const kelas = classInput.value.trim();
    const number = numberInput.value.trim();

    // Validasi
    if (!name || !kelas || !number) {
        alert('⚠️ Mohon isi semua data biodata (Nama, Kelas, Nomor Absen)');
        return;
    }

    // Simpan ke localStorage
    localStorage.setItem('sultanBiodata', JSON.stringify({ name, kelas, number }));

    // Perbarui greeting message
    updateGreetingMessage(name);

    // Update header dengan nama dan skor
    updateHeaderDisplay(name);

    // Tutup modal biodata
    closeBiodataModal();

    // Tampilkan main menu
    const mainMenu = document.getElementById('main-menu-section');
    if (mainMenu) {
        mainMenu.style.display = 'block';
    }

    console.log('✅ Biodata disimpan:', { name, kelas, number });
}

function closeBiodataModal() {
    const modal = document.getElementById('biodata-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateGreetingMessage(name = null) {
    const greetingElement = document.getElementById('greeting-message');
    if (!greetingElement) return;

    if (!name) {
        // Coba ambil dari localStorage
        const biodata = JSON.parse(localStorage.getItem('sultanBiodata') || '{}');
        name = biodata.name;
    }

    if (name) {
        greetingElement.textContent = `"Halo, ${name}! Aku Sultan. Ayo belajar zakat bersama!"`;
    } else {
        greetingElement.textContent = `"Halo! Aku Sultan. Ayo belajar zakat bersama!"`;
    }
}

// Fungsi untuk update header dengan nama dan skor
function updateHeaderDisplay(name = null) {
    const headerElement = document.querySelector('.app-header .header-center');
    if (!headerElement) return;

    if (!name) {
        const biodata = JSON.parse(localStorage.getItem('sultanBiodata') || '{}');
        name = biodata.name;
    }

    // Load global score
    globalScore = parseInt(localStorage.getItem('sultanGlobalScore') || '0');

    if (name) {
        headerElement.innerHTML = `
            <h1 class="app-title">SULTAN NYASAR</h1>
            <p class="app-subtitle">Simulasi Perhitungan Zakat untuk Anak Sekolah Dasar</p>
            <div class="user-info" style="margin-top: 10px; font-size: 14px; color: #ffffff;">
                👤 ${name} | 🏆 Skor: ${globalScore}
            </div>
        `;
    } else {
        headerElement.innerHTML = `
            <h1 class="app-title">SULTAN NYASAR</h1>
            <p class="app-subtitle">Simulasi Perhitungan Zakat untuk Anak Sekolah Dasar</p>
        `;
    }
}

// Fungsi untuk update skor global
function updateGlobalScore(points) {
    globalScore += points;
    localStorage.setItem('sultanGlobalScore', globalScore.toString());
    updateHeaderDisplay();
}

// Fungsi untuk reset semua data
function resetAllData() {
    if (confirm('⚠️ Apakah Anda yakin ingin menghapus semua data (nama, kelas, absen, dan skor)?\n\nData yang dihapus tidak dapat dikembalikan.')) {
        localStorage.removeItem('sultanBiodata');
        localStorage.removeItem('sultanGlobalScore');
        globalScore = 0;

        // Reset greeting message
        updateGreetingMessage();

        // Reset header
        updateHeaderDisplay();

        // Show biodata popup again
        showBiodataPopup();

        alert('✅ Semua data telah dihapus. Sistem kembali ke kondisi awal.');
    }
}

// Panggil saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    updateGreetingMessage();
    updateHeaderDisplay();
});

// ========== FUNGSI UNTUK MATERI NODE ==========
function openMaterifrom(type) {
    playSound('assets/audio/click.mp3');
    showPopup(type);
}

// ========== 3. FUNGSI CHAT ==========
function addMessage(speaker, text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${speaker}`;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');

    messageDiv.innerHTML = `
        <div class="message-avatar">${speaker === 'sultan' ? '👳‍♂️' : '🤖'}</div>
        <div class="message-bubble">
            ${text}
            <div class="message-time">${timeStr}</div>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function nextChat() {
    console.log('Tombol diklik! Index:', chatIndex);

    if (chatIndex < chatData.length) {
        addMessage(chatData[chatIndex].speaker, chatData[chatIndex].text);
        chatIndex++;

        const progressBar = document.getElementById('chat-progress-bar');
        if (progressBar) {
            const progress = (chatIndex / chatData.length) * 100;
            progressBar.style.width = progress + '%';
        }

        if (chatIndex === chatData.length) {
            const nextBtn = document.getElementById('next-chat-btn');
            if (nextBtn) {
                nextBtn.textContent = 'Mulai Belajar →';
            }
        }
    } else {
        startTransition();
    }
}


// ========== 4. FUNGSI TRANSISI ==========
function startTransition() {
    document.getElementById('opening-section').style.opacity = '0';

    setTimeout(() => {
        document.getElementById('opening-section').style.display = 'none';
        document.getElementById('transition-section').style.display = 'flex';

        const title = document.getElementById('transition-title');
        const subtitle = document.getElementById('transition-subtitle');

        setTimeout(() => {
            title.innerText = 'Perjalanan Menuju';
            subtitle.innerText = 'Pemahaman Zakat';
        }, 200);

        setTimeout(() => {
            title.innerText = 'Sultan Berkah';
            subtitle.innerHTML = `
        <div style="text-align: center;">
            <span style="font-size: 32px; font-weight; color: #ffffff; display: block; text-shadow: 0 0 5px #242320, 0 0 10px #ffffff, 0 0 15px #ffffff;">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
            <span style="font-size: 18px; display: block; margin-top: 8px;">Dimulai...</span>
        </div>
    `;
        }, 1200);

        setTimeout(() => {
            title.innerText = 'Mari Belajar';
            subtitle.innerText = 'Bersama Sultan';
        }, 2200);

        setTimeout(() => {
            document.getElementById('transition-section').style.display = 'none';
            document.getElementById('main-menu-section').style.display = 'block';
            setTimeout(() => {
                document.getElementById('transition-section').style.display = 'none';
                document.getElementById('main-menu-section').style.display = 'block';
                if (typeof playBacksound === 'function') playBacksound();
                showBiodataPopup(); // <-- ini harus ada
            }, 3500);

            // ===== BACKSOUND MULAI DI SINI =====
            if (typeof playBacksound === 'function') {
                playBacksound();
            }
        }, 3500);
    }, 1000);
}// <-- PASTIKAN KURUNG TUTUP INI ADA
// ========== 3. FUNGSI POPUP ==========
function resetAllOverlayState() {
    // Tutup overlay popup umum
    const overlay = document.getElementById('popup-overlay');
    const container = document.getElementById('popup-container');
    const content = document.getElementById('popup-content');
    const title = document.getElementById('popup-title');
    const gameSubmenuPopup = document.getElementById('game-submenu-popup');
    const gameSection = document.getElementById('game-section');
    const gameContent = document.getElementById('game-content');

    if (overlay) {
        overlay.style.display = 'none';
        overlay.style.visibility = 'hidden';
        overlay.className = 'popup-overlay';
    }
    if (container) {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.className = 'popup-container';
    }
    if (title) {
        title.textContent = '';
        title.style.display = '';
        title.style.visibility = '';
    }
    if (content) {
        content.innerHTML = '';
        content.style.display = '';
        content.style.visibility = '';
    }
    if (gameSubmenuPopup) {
        gameSubmenuPopup.style.display = 'none';
    }
    if (gameSection) {
        gameSection.style.display = 'none';
    }
    if (gameContent) {
        gameContent.innerHTML = '';
        gameContent.style.display = '';
        gameContent.style.visibility = '';
    }
}

function showPopup(type) {
    let title = '';
    let content = '';

    // Reset semuanya dulu
    resetAllOverlayState();
    closeGameSubmenu(false);

    const popupOverlay = document.getElementById('popup-overlay');
    const popupContainer = document.getElementById('popup-container');
    if (popupOverlay) {
        popupOverlay.className = 'popup-overlay';
        popupOverlay.style.zIndex = '3000';
    }
    if (popupContainer) {
        popupContainer.className = 'popup-container';
        popupContainer.style.zIndex = '3001';
    }

    switch (type) {
        case 'apaitu':
            title = '📚 APA ITU ZAKAT?';
            content = `
                <div class="popup-section">
                    <h3>DEFINISI</h3>
                    <p>Zakat adalah bagian tertentu dari harta yang wajib dikeluarkan oleh setiap muslim apabila telah mencapai syarat yang ditetapkan. Sebagai salah satu rukun Islam yang ke-3, zakat ditunaikan untuk diberikan kepada golongan yang berhak menerimanya (asnaf).</p>
                </div>
                <div class="popup-section">
                    <h3>FUNGSI ZAKAT</h3>
                    <p>1. Menyucikan harta dan jiwa pemiliknya<br>
                    2. Meningkatkan kepedulian sosial dan solidaritas<br>
                    3. Mengurangi kesenjangan ekonomi dan kemiskinan<br>
                    4. Membangun masyarakat yang adil dan sejahtera<br>
                    5. Mendekatkan diri kepada Allah SWT</p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="showPopup('materi')" style="padding: 12px 24px; border: none; border-radius: 10px; background: #1B4D3E; color: #fff; cursor: pointer; font-weight: bold;">← Kembali ke Submenu Materi</button>
                </div>
            `;
            break;

        case 'dalil':
            title = '📖 DALIL AL-QUR\'AN & HADIS';
            content = `
        <div class="popup-section">
            <h3>Dalil Al-Qur'an</h3>

            <!-- QS. Al-Baqarah: 43 -->
            <div style="background: var(--abu-muda); padding: 20px; border-radius: 15px; margin-bottom: 20px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--emas); margin: 0;">1. QS. Al-Baqarah: 43</h4>
                    <button class="audio-play-btn" onclick="playAyatDenganBacksound('al-baqarah-43')" style="background: var(--hijau-tua); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px;">🔊</span>
                    </button>
                </div>
                <p dir="rtl" style="text-align:right; line-height:1.6; font-size:15px;">
                    وَاَقِيْمُوا الصَّلٰوةَ وَاٰتُوا الزَّكٰوةَ وَارْكَعُوْا مَعَ الرّٰكِعِيْنَ ۝٤٣
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Wa aqīmuṣ-ṣalāta wa ātuz-zakāta warka'ū ma'ar-rāki'īn(a).
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Artinya: “Dirikanlah salat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk.”
                </p>
            </div>

            <!-- QS. Al-Baqarah: 110 -->
            <div style="background: var(--abu-muda); padding: 20px; border-radius: 15px; margin-bottom: 20px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--emas); margin: 0;">2. QS. Al-Baqarah: 110</h4>
                    <button class="audio-play-btn" onclick="playAyatDenganBacksound('al-baqarah-110')" style="background: var(--hijau-tua); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px;">🔊</span>
                    </button>
                </div>
                <p dir="rtl" style="text-align:right; line-height:1.6; font-size:15px;">
                    وَاَقِيۡمُوا الصَّلٰوةَ وَاٰتُوا الزَّکٰوةَ ۖ وَمَا تُقَدِّمُوۡا لِاَنۡفُسِكُمۡ مِّنۡ خَيۡرٍ تَجِدُوۡهُ عِنۡدَ اللّٰهِ ۖ اِنَّ اللّٰهَ بِمَا تَعۡمَلُوۡنَ بَصِيۡرٌ ۝١١٠
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Wa aqīmuṣ-ṣalāta wa ātuz-zakāh, wa mā tuqaddimū li'anfusikum min khairin tajidūhu 'indallāh, innallāha bimā ta'malūna baṣīr.
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Artinya: “Dan dirikanlah shalat dan tunaikanlah zakat. Dan kebaikan apa saja yang kamu usahakan bagi dirimu, tentu kamu akan mendapat pahalanya di sisi Allah. Sesungguhnya Allah Maha Melihat apa yang kamu kerjakan.”
                </p>
            </div>

            <!-- QS. At-Taubah: 103 -->
            <div style="background: var(--abu-muda); padding: 20px; border-radius: 15px; margin-bottom: 20px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--emas); margin: 0;">3. QS. At-Taubah: 103</h4>
                    <button class="audio-play-btn" onclick="playAyatDenganBacksound('at-taubah-103')" style="background: var(--hijau-tua); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px;">🔊</span>
                    </button>
                </div>
                <p dir="rtl" style="text-align:right; line-height:1.6; font-size:15px;">
                    خُذۡ مِنۡ اَمۡوَالِهِمۡ صَدَقَةً تُطَهِّرُهُمۡ وَتُزَكِّيۡهِمۡ بِهَا وَصَلِّ عَلَيۡهِمۡ ۚ اِنَّ صَلٰوتَكَ سَكَنٌ لَّهُمۡ ۗ وَاللّٰهُ سَمِيۡعٌ عَلِيۡمٌ ۝١٠٣
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Khuz min amwālihim ṣadaqatan tuṭahhiruhum wa tuzakkīhim bihā wa ṣalli 'alaihim, inna ṣalātaka sakanul lahum, wallāhu samī'un 'alīm.
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Artinya: “Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka dan mendoalah untuk mereka. Sesungguhnya doa kamu itu menjadi ketenteraman jiwa bagi mereka. Dan Allah Maha Mendengar lagi Maha Mengetahui.”
                </p>
            </div>

            <!-- QS. An-Nur: 56 -->
            <div style="background: var(--abu-muda); padding: 20px; border-radius: 15px; margin-bottom: 20px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--emas); margin: 0;">4. QS. An-Nur: 56</h4>
                    <button class="audio-play-btn" onclick="playAyatDenganBacksound('an-nur-56')" style="background: var(--hijau-tua); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px;">🔊</span>
                    </button>
                </div>
                <p dir="rtl" style="text-align:right; line-height:1.6; font-size:15px;">
                    وَاَقِيْمُوا الصَّلٰوةَ وَاٰتُوا الزَّكٰوةَ وَاَطِيْعُوا الرَّسُوْلَ لَعَلَّكُمْ تُرْحَمُوْنَ ۝٥٦
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    wa aqîmush-shalâta wa âtuz-zakâta wa athî‘ur-rasûla la‘allakum tur-ḫamûn
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    Artinya: “Dirikanlah salat, tunaikanlah zakat, dan taatlah kepada Rasul (Nabi Muhammad) agar kamu dirahmati.”
                </p>
            </div>

            <h3 style="margin-top: 30px;">Dalil Hadis</h3>
            <ol style="line-height:1.6; padding-left:35px;">
                <li>“Islam dibangun di atas lima perkara: bersaksi bahwa tidak ada tuhan selain Allah dan Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, pergi haji, dan puasa di bulan Ramadhan.” (HR. Bukhari dan Muslim).</li>
                <li>“Harta seseorang tidak berkurang karena membayar zakat.” (HR. Muslim).</li>
                <li>“Rasulullah SAW mewajibkan zakat fitrah satu sha’ kurma atau gandum atas budak dan orang merdeka, laki-laki dan perempuan, kecil dan besar dari golongan Islam, dan beliau memerintahkan agar ditunaikan sebelum orang-orang keluar untuk shalat Id.” (HR. Bukhari dan Muslim).</li>
            </ol>
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="showPopup('materi')" style="padding: 12px 24px; border: none; border-radius: 10px; background: #1B4D3E; color: #fff; cursor: pointer; font-weight: bold;">← Kembali ke Submenu Materi</button>
            </div>
        </div>
    `;
            break;

        case 'syarat':
            title = '✅ SYARAT WAJIB ZAKAT';
            content = `
                <div class="popup-section">
                    <h4>1. Merdeka</h4>
                    <p style="text-align: justify; line-height:1.6;">Menurut kesepakatan para ulama, budak tidak dikenakan kewajiban untuk membayar zakat. Mayoritas ulama mengatakan, zakat hanya wajib atas tuannya. Sebab, dialah pemilik harta hambanya. Dalam hal ini, zakat hanya wajib pada kepemilikan yang sempurna.</p>
                    
                    <h4>2. Islam</h4>
                    <p style="text-align: justify; line-height:1.6;">Berdasarkan ijma' ulama, tidak ada kewajiban zakat atas orang kafir. Sebab, zakat merupakan ibadah yang menyucikan. Berbeda dengan ulama mazhab Syafiiyah yang mewajibkan orang murtad membayar zakat hartanya sebelum dia murtad. Artinya, zakat ini tetap menjadi kewajibannya ketika dia masih Islam..</p>
                    
                    <h4>3. Baligh</h4>
                    <p style="text-align: justify; line-height:1.6;">Ulama mazhab Hanafiyah memasukkan baligh-akal sebagai syarat wajib zakat. Oleh karenanya, tidak ada kewajiban bagi anak kecil dan orang gila untuk mengeluarkan zakat. Sementara itu, mayoritas ulama berpendapat bahwa baligh-akal bukan merupakan syarat zakat. Artinya, anak kecil dan orang gila juga dikenakan kewajiban zakat melalui wali mereka.</p>
                    
                    <h4>4. Kondisi Harta</h4>
                    <p style="text-align: justify; line-height:1.6;">Syarat wajib zakat juga melihat pada kondisi harta. Harta jenis ini ada lima kelompok, yakni dua keping logam yang berstatus uang kertas, barang tambang, barang temuan, barang dagangan, buah-buahan, dan binatang ternak. Kondisi harta tersebut disyaratkan berkembang.</p>
                    
                    <h4>5. Nisab</h4>
                    <p style="text-align: justify; line-height:1.6;">Menurut ketetapan syara', kondisi harta yang juga harus mencapai satu nisab (batas minimal) atau diperkirakan senilai satu nisab, yaitu 85 gram emas untuk zakat emas atau 595 gram perak.</p>
                    
                    <h4>6. Haul</h4>
                    <p style="text-align: justify; line-height:1.6;">Haul adalah batasan waktu satu tahun hijriyah atau 12 (dua belas) bulan qomariyah kepemilikan harta yang wajib dikeluarkan zakat. Sebagaimana sabda Rasulullah, Tidak ada kewajiban zakat pada harta sampai genap satu tahun.</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="showPopup('materi')" style="padding: 12px 24px; border: none; border-radius: 10px; background: #1B4D3E; color: #fff; cursor: pointer; font-weight: bold;">← Kembali ke Submenu Materi</button>
                    </div>
                </div>
            `;
            break;

        case 'jenis':
            title = '💰 JENIS-JENIS ZAKAT';
            content = `
                <div class="popup-section">
                    <h4>1. Zakat Fitrah</h4>
                    <p style="text-align: justify;"> Zakat fitrah (zakat al-fitr) adalah zakat yang wajib dikeluarkan oleh setiap Muslim, baik laki-laki maupun perempuan, pada bulan Ramadhan sebelum shalat Idul Fitri. Kewajiban ini didasarkan pada hadis Ibnu Umar radhiyallahu ‘anhu bahwa Rasulullah SAW mewajibkan zakat fitrah satu sha’ kurma atau gandum bagi setiap Muslim, baik merdeka maupun hamba sahaya, laki-laki maupun perempuan, kecil maupun besar (HR. Bukhari dan Muslim). Zakat fitrah berfungsi untuk menyucikan orang yang berpuasa serta membantu memenuhi kebutuhan kaum fakir miskin pada hari raya. Waktu utama penunaiannya adalah setelah terbit fajar 1 Syawal hingga sebelum shalat Idul Fitri; jika dibayarkan setelah shalat Id, maka hanya dianggap sebagai sedekah biasa. Dengan menunaikan zakat fitrah, ibadah puasa diharapkan menjadi sempurna dan kaum miskin dapat merasakan kebahagiaan di hari kemenangan.</p>

                    <h4>2. Zakat Emas</h4>
                    <p style="text-align: justify; line-height:1.5;"> Zakat emas, perak, atau logam mulia adalah zakat yang dikenakan atas emas, perak, dan logam mulia lainnya yang telah mencapai nisab dan haul.</p>
                    <p style="text-align: justify; text-justify: inter-word; line-height:1.6;">
Artinya: Wahai orang-orang yang beriman, sesungguhnya banyak dari orang-orang alim dan rahib-rahib mereka memakan harta orang dengan jalan yang batil dan menghalang-halangi manusia dari jalan Allah. Dan orang-orang yang menyimpan emas dan perak dan tidak menginfakkannya di jalan Allah, maka berikanlah kabar gembira kepada mereka dengan azab yang pedih.</p>

<p style="text-align: justify; text-justify: inter-word; line-height:1.6;"> Hadits riwayat Abu Dawud juga menjelaskan kewajiban zakat emas dan perak: “Jika engkau memiliki perak 200 dirham dan telah mencapai haul satu tahun, maka darinya wajib zakat 5 dirham. Dan untuk emas, tidak wajib dizakati kecuali telah mencapai 20 dinar, maka darinya wajib zakat setengah dinar.” (HR. Abu Dawud).</p>

                    <h4>3. Zakat Maal</h4>

<p style="text-align: justify; line-height:1.5;"> Zakat yang wajib dikeluarkan oleh seorang muslim atas harta kekayaan yang dimilikinya, jika telah memenuhi syarat nishab (batas minimum) dan haul (kepemilikan satu tahun), untuk diberikan kepada golongan yang berhak (8 asnaf).</p>

                    <h4>4. Zakat Perniagaan</h4>

<p style="text-align: justify; line-height:1.5;"> Zakat perniagaan adalah zakat yang dikeluarkan dari harta niaga, yaitu harta atau aset yang diperjualbelikan dengan tujuan memperoleh keuntungan. Harta perdagangan dihitung dari aset lancar usaha dikurangi hutang jangka pendek. Jika hasilnya telah mencapai nisab, maka wajib dikeluarkan zakatnya.</p>

<p style="text-align: justify; line-height:1.5;"> Nisab zakat perniagaan setara dengan 85 gram emas dengan kadar zakat sebesar 2,5 persen dan telah mencapai haul satu tahun.</p>

                    <h4>5. Zakat Ternak</h4>

<p style="text-align: justify; line-height:1.5;"> Zakat hewan ternak merupakan bagian dari zakat mal yang dikenakan atas hasil usaha peternakan. Kewajiban zakat ini berlaku apabila jumlah hewan ternak telah mencapai nisab.</p>

<p style="text-align: justify; line-height:1.5;"> Nisab dan cara perhitungan zakat ternak berbeda-beda sesuai dengan jenis hewan dan ketentuan yang berlaku. Zakat hewan ternak umumnya dibayarkan dalam bentuk hewan seperti sapi, kerbau, kambing, atau domba.</p>

<p style="text-align: justify; line-height:1.5;"> Menurut mazhab Syafi’i, zakat hewan ternak tidak boleh dibayarkan dalam bentuk uang. Namun menurut mazhab Hanafi serta sebagian pendapat dalam mazhab Maliki dan Hanbali, zakat ternak boleh dibayarkan dalam bentuk uang sesuai dengan nilai atau harga hewan yang menjadi ukuran zakatnya.</p>
                    
                    <h4>6. Zakat Pertanian</h4>

<p style="text-align: justify; line-height:1.5;"> Zakat pertanian adalah kewajiban bagi setiap muslim yang memiliki lahan pertanian dan hasil panennya telah mencapai nisab. Zakat pertanian merupakan bentuk kepedulian sosial serta upaya mengurangi kesenjangan ekonomi.</p>
<p style="text-align: justify; line-height:1.5;"> Jenis hasil pertanian yang dikenakan zakat antara lain:</p>
<ol style="line-height:1.5; margin-left:45px;">
<li>Beras putih</li>
<li>Kacang hijau</li>
<li>Kacang tunggak</li>
<li>Padi gabah kering</li>
<li>Padi kretek gabah kering</li>
</ol>

<p style="text-align: justify; line-height:1.5;"> Kadar zakat pertanian berbeda berdasarkan sistem irigasi. Jika menggunakan irigasi berbayar maka zakatnya sebesar 5%, sedangkan jika menggunakan air hujan atau irigasi alami maka zakatnya sebesar 10%.</p>
                    
                   <h4>7. Zakat Rikaz</h4>

<p style="text-align: justify; line-height:1.5;"> Rikaz secara bahasa berarti sesuatu yang terpendam di dalam bumi berupa barang tambang atau harta. Secara syar'i, rikaz adalah harta dari zaman jahiliyah yang terpendam dan ditemukan tanpa usaha penggalian yang berat.</p>

<p style="text-align: justify; line-height:1.5;">
Zakat rikaz dikeluarkan langsung ketika harta tersebut ditemukan tanpa syarat nisab dan haul. Besarnya zakat adalah 20% atau satu perlima dari nilai harta yang ditemukan.
</p>
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="showPopup('materi')" style="padding: 12px 24px; border: none; border-radius: 10px; background: #1B4D3E; color: #fff; cursor: pointer; font-weight: bold;">← Kembali ke Submenu Materi</button>
                    </div>
                </div>
            `;
            break;

        case 'penerima':
            title = '🤲 PENERIMA ZAKAT (8 ASNAF)';
            content = `
        <div class="popup-section">
            <!-- AYAT AT-TAUBAH: 60 DENGAN TOMBOL PLAY -->
            <div style="background: var(--abu-muda); padding: 20px; border-radius: 15px; margin-bottom: 30px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: var(--emas); margin: 0;">QS. At-Taubah: 60</h4>
                    <button class="audio-play-btn" onclick="playAyatDenganBacksound('at-taubah-60')" style="background: var(--hijau-tua); color: white; border: none; border-radius: 50%; width: 45px; height: 45px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        <span style="font-size: 24px;">🔊</span>
                    </button>
                </div>
                <p dir="rtl" style="text-align:right; line-height:1.6; font-size:15px;">
                    ۞ إِنَّمَا ٱلصَّدَقَـٰتُ لِلْفُقَرَآءِ وَٱلْمَسَـٰكِينِ وَٱلْعَـٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَـٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ ۖ فَرِيضَةً مِّنَ ٱللَّهِ ۗ وَٱللَّهُ عَلِيمٌ حَكِيمٌ ۝٦٠
                </p>
                <p style="text-align: justify; line-height:1.6;">
                    “Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, orang yang dilunakkan hatinya (mualaf), untuk memerdekakan hamba sahaya, untuk orang yang berhutang, untuk jalan Allah dan untuk orang yang sedang dalam perjalanan, sebagai kewajiban dari Allah. Allah Maha Mengetahui lagi Maha Bijaksana.”
                </p>
            </div>
            
            <!-- 🎵 LAGU 8 PENERIMA ZAKAT -->
            <div style="background: linear-gradient(135deg, #2E7D32, #1565C0); padding: 20px; border-radius: 15px; margin-bottom: 30px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <span style="font-size: 40px;">🎵</span>
                    <div>
                        <h3 style="margin: 0; color: #FFD700; font-size: 22px;">Lagu 8 Penerima Zakat</h3>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">Hafalkan dengan lagu</p>
                    </div>
                </div>
                
                <!-- AUDIO PLAYER DENGAN CONTROL -->
                <audio id="lagu-penerima-zakat" controls style="width: 100%; border-radius: 50px; margin-bottom: 15px;">
                    <source src="audio/8-penerima-zakat.mp3" type="audio/mpeg">
                    <source src="./audio/8-penerima-zakat.mp3" type="audio/mpeg">
                    Browser Anda tidak mendukung audio player.
                </audio>
                
                <p style="text-align: center; font-size: 14px; margin-top: 5px;">Gunakan kontrol di atas untuk memutar/menjeda</p>
            </div>
            
            <!-- 8 ASNAF -->
            <h4>1. Fakir</h4>
            <p>Pada kelompok fakir yaitu seseorang yang tidak memiliki sumber penghasilan apapun yang disebabkan oleh masalah berat, seperti sakit.</p>
            <h4>2. Miskin</h4>
            <p>Seseorang yang memiliki sumber penghasilan, namun tidak cukup untuk memenuhi kebutuhan sehari-hari.</p>
            <h4>3. Amil</h4>
            <p>Petugas yang mengumpulkan dan mendistribusikan zakat.</p>
            <h4>4. Mualaf</h4>
            <p>Orang yang baru memeluk agama Islam.</p>
            <h4>5. Riqab</h4>
            <p>Hamba sahaya yang ingin memerdekakan diri.</p>
            <h4>6. Gharimin</h4>
            <p>Orang yang memiliki hutang dan tidak mampu melunasinya.</p>
            <h4>7. Fi Sabilillah</h4>
            <p>Pejuang di jalan Allah, termasuk para dai dan penuntut ilmu.</p>
            <h4>8. Ibnu Sabil</h4>
            <p>Musafir yang kehabisan bekal dalam perjalanan.</p>
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="showPopup('materi')" style="padding: 12px 24px; border: none; border-radius: 10px; background: #1B4D3E; color: #fff; cursor: pointer; font-weight: bold;">← Kembali ke Submenu Materi</button>
            </div>
        </div>
    `;
            break;
            // ... (kode showPopup yang sudah ada) ...

            // Setelah menampilkan popup, tunggu DOM siap lalu pasang listener audio untuk menu penerima
            if (type === 'penerima') {
                setTimeout(() => {
                    const audio = document.getElementById('lagu-penerima-zakat');
                    if (audio) {
                        // Hapus listener lama (jika ada) agar tidak dobel
                        audio.removeEventListener('play', handleLaguPlay);
                        audio.removeEventListener('pause', handleLaguPause);
                        audio.removeEventListener('ended', handleLaguEnded);

                        // Definisikan handler
                        function handleLaguPlay() {
                            if (backsound && isBacksoundPlaying) {
                                backsound.pause();
                                isBacksoundPlaying = false;
                                backsoundPausedByLagu = true;
                                console.log('⏸️ Backsound di-pause karena lagu diputar');
                            }
                        }

                        function handleLaguPause() {
                            if (backsound && backsoundPausedByLagu) {
                                backsound.play()
                                    .then(() => {
                                        isBacksoundPlaying = true;
                                        backsoundPausedByLagu = false;
                                        console.log('▶️ Backsound dilanjutkan setelah lagu dijeda');
                                    })
                                    .catch(e => console.log('Gagal resume backsound:', e));
                            }
                        }

                        function handleLaguEnded() {
                            if (backsound && backsoundPausedByLagu) {
                                backsound.play()
                                    .then(() => {
                                        isBacksoundPlaying = true;
                                        backsoundPausedByLagu = false;
                                        console.log('▶️ Backsound dilanjutkan setelah lagu selesai');
                                    })
                                    .catch(e => console.log('Gagal resume backsound:', e));
                            }
                        }

                        audio.addEventListener('play', handleLaguPlay);
                        audio.addEventListener('pause', handleLaguPause);
                        audio.addEventListener('ended', handleLaguEnded);

                        console.log('✅ Listener audio untuk lagu penerima zakat siap');
                    } else {
                        console.log('❌ Elemen audio lagu-penerima-zakat tidak ditemukan');
                    }
                }, 300); // Beri sedikit waktu agar DOM popup terbentuk
            }

        case 'materi':
            title = '🗺️ JELAJAHI MATERI ZAKAT';
            content = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3 style="color: var(--hijau-tua); margin: 0 0 10px 0;">Pilih Materi yang Ingin Dipelajari</h3>
                    <p style="font-size: 14px; opacity: 0.8;">Klik setiap node untuk membaca materi lengkap</p>
                </div>
                
                <div style="position: relative; height: 500px; margin: 20px 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 30px; padding: 20px; background: rgba(27, 77, 62, 0.05); border-radius: 20px;">
                    <!-- NODE 1: APA ITU ZAKAT -->
                    <div class="node-materi" onclick="openMaterifrom('apaitu')" style="position: relative;">
                        <div class="node-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #f1f1f1, #ffffff); display: flex; align-items: center; justify-content: center; font-size: 50px; color: white; box-shadow: 0 5px 15px rgb(134, 121, 70); cursor: pointer; transition: all 0.3s ease; border: 3px solid white;">📚</div>
                        <div style="text-align: center; margin-top: 10px; font-weight: bold; color: var(--hijau-tua); font-size: 13px;">Apa itu Zakat</div>
                    </div>
                    
                    <!-- NODE 2: DALIL -->
                    <div class="node-materi" onclick="openMaterifrom('dalil')" style="position: relative;">
                        <div class="node-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #ffffff, #ffffff); display: flex; align-items: center; justify-content: center; font-size: 50px; color: white; box-shadow: 0 5px 15px rgb(134, 121, 70); cursor: pointer; transition: all 0.3s ease; border: 3px solid white;">📖</div>
                        <div style="text-align: center; margin-top: 10px; font-weight: bold; color: var(--hijau-tua); font-size: 13px;">Dalil Zakat</div>
                    </div>
                    
                    <!-- NODE 3: SYARAT -->
                    <div class="node-materi" onclick="openMaterifrom('syarat')" style="position: relative;">
                        <div class="node-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #ffffff, #ffffff); display: flex; align-items: center; justify-content: center; font-size: 50px; color: white; box-shadow: 0 5px 15px rgb(134, 121, 70); cursor: pointer; transition: all 0.3s ease; border: 3px solid white;">✅</div>
                        <div style="text-align: center; margin-top: 10px; font-weight: bold; color: var(--hijau-tua); font-size: 13px;">Syarat Zakat</div>
                    </div>
                    
                    <!-- NODE 4: JENIS ZAKAT -->
                    <div class="node-materi" onclick="openMaterifrom('jenis')" style="position: relative;">
                        <div class="node-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #ffffff, #ffffff); display: flex; align-items: center; justify-content: center; font-size: 50px; color: white; box-shadow: 0 5px 15px rgb(134, 121, 70); cursor: pointer; transition: all 0.3s ease; border: 3px solid white;">💰</div>
                        <div style="text-align: center; margin-top: 10px; font-weight: bold; color: var(--hijau-tua); font-size: 13px;">Jenis Zakat</div>
                    </div>
                    
                    <!-- NODE 5: PENERIMA ZAKAT -->
                    <div class="node-materi" onclick="openMaterifrom('penerima')" style="position: relative;">
                        <div class="node-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #ffffff, #ffffff); display: flex; align-items: center; justify-content: center; font-size: 50px; color: white; box-shadow: 0 5px 15px rgb(134, 121, 70); cursor: pointer; transition: all 0.3s ease; border: 3px solid white;">🤲</div>
                        <div style="text-align: center; margin-top: 10px; font-weight: bold; color: var(--hijau-tua); font-size: 13px;">Penerima Zakat</div>
                    </div>
                </div>
                
                <style>
                    .node-materi .node-circle:hover {
                        transform: scale(1.1) translateY(-10px);
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                    }
                    
                    .node-materi .node-circle:active {
                        transform: scale(0.95);
                    }
                </style>
                
                <div style="text-align: center; margin-top: 20px;">
                </div>
            `;
            break;

        case 'kalkulator':
            title = '🧮 KALKULATOR ZAKAT';
            content = `
        <div class="popup-section">
            <p style="text-align: center; margin-bottom: 20px;">Pilih jenis zakat yang ingin dihitung:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div class="submenu-card" onclick="showKalkulator('fitrah')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🍚</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Fitrah</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('emas')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">💎</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Emas & Perak</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('maal')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">💵</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Maal</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('perniagaan')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🏪</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Perniagaan</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('ternak')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🐄</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Ternak</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('pertanian')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🌾</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Pertanian</h4>
                </div>
                
                <div class="submenu-card" onclick="showKalkulator('rikaz')" style="background: var(--abu-muda); padding: 20px; border-radius: 15px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;">
                    <div style="font-size: 40px; margin-bottom: 10px;">⚱️</div>
                    <h4 style="color: var(--hijau-tua);">Zakat Rikaz</h4>
                </div>
            </div>
            
            <style>
                .submenu-card:hover {
                    border-color: var(--emas) !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
            </style>
            
            <div id="kalkulator-container" style="margin-top: 30px; padding-top: 20px; border-top: 2px solid var(--abu-tua);">
                <!-- Konten kalkulator akan muncul di sini -->
            </div>
        </div>
    `;
            break;

        case 'panduan':
            title = '📋 PANDUAN PENGGUNAAN';
            content = `
                <div class="popup-section">
                    <h3>Capaian Pembelajaran</h3>
                    <p>Memahami puasa sunah, zakat, infak, sedekah, hadiah, makanan dan minuman yang halal dan haram.</p>
                    
                    <h3 style="margin-top:25px;">Tujuan Pembelajaran</h3>
                    <ol style="text-align:justify; padding-left:25px; line-height:1.7;">
<li>Murid-murid mampu memahami konsep zakat, termasuk pengertian, jenis, syarat wajib, dan dalil zakat melalui website “Sultan Nyasar” dengan benar.</li>
<li>Murid-murid mampu mengidentifikasi golongan penerima zakat melalui fitur pada website “Sultan Nyasar” dengan benar.</li>
<li>Murid-murid mampu menghitung zakat menggunakan fitur kalkulator zakat pada website “Sultan Nyasar” dengan benar.</li>
<li>Murid-murid mampu menerapkan pemahaman tentang zakat dengan menjawab soal game dan mendiskusikan kasus melalui fitur Q&A pada website “Sultan Nyasar” dengan benar.</li></ol>
                    
                    <h3 style="margin-top:25px;">Cara Mengakses</h3>          
                    <p>1. Buka aplikasi melalui browser pada perangkat komputer atau laptop.<br>
                    2. Pastikan perangkat terhubung dengan internet.<br>
                    3. Setelah halaman terbuka, baca percakapan interaktif dengan Sultan.</p>
                    
                    <h3 style="margin-top:25px;">Langkah Penggunaan</h3>
                    <p>1. Klik "Lanjut Percakapan" untuk membaca dialog Sultan<br>
                    2. Setelah selesai, klik "Mulai Belajar"<br>
                    3. Pilih menu yang ingin dipelajari<br>
                    4. Klik menu untuk membaca penjelasan lengkap<br>
                    5. Gunakan fitur Q&A untuk konsultasi kasus zakat</p>
                    
                    <h3 style="margin-top:25px;">Manfaat Aplikasi</h3>
                    <p>✓ Memahami konsep zakat secara sistematis<br>
                    ✓ Mengetahui dasar hukum dan syarat zakat<br>
                    ✓ Mengidentifikasi jenis-jenis zakat<br>
                    ✓ Melakukan simulasi perhitungan zakat<br>
                    ✓ Mengembangkan kemampuan berpikir logis</p>

                    <h3 style="margin-top:25px;">Sumber Referensi</h3>
                    <p>✓ Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2022). Pendidikan Agama Islam dan Budi Pekerti untuk SD Kelas V. Pusat Perbukuan Kemendikbudristek.<br>
                    ✓ Badan Amil Zakat Nasional (BAZNAS). (2024, 15 Januari). Cara Menghitung Zakat Mal. BAZNAS. https://baznas.go.id/...</p>
                </div>
            `;
            break;

        case 'game':
            // Prioritaskan alur game yang terpusat melalui openGameMenu agar flow konsisten.
            openGameMenu();
            return; // Jangan lanjut render default popup game jadul

        case 'tim':
            title = '🪄 TIM PENGEMBANG';
            content = `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); text-align: center; margin-bottom: 30px;">Kenali Tim Pengembang</h3>
            
            <!-- DR. Ani Nur Aeni, M.Pd. -->
            <div style="background: linear-gradient(145deg, var(--putih), var(--abu-muda)); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 2px solid var(--emas);">
                <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                    <!-- Foto Dosen -->
                    <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--emas); box-shadow: 0 10px 25px rgba(0,0,0,0.2); background: linear-gradient(145deg, var(--hijau-tua), var(--biru-tua)); display: flex; align-items: center; justify-content: center;">
                        <img src="assets/images/dosen.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="DR. Ani Nur Aeni, M.Pd." 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size: 60px;\'>👩‍🏫</span>';">
                    </div>
                    <!-- Identitas -->
                    <div style="flex: 1;">
                        <h4 style="color: var(--emas); font-size: 20px; margin-bottom: 5px;">DR. Ani Nur Aeni, M.Pd.</h4>
                        <p style="font-size: 18px; font-weight: bold; color: var(--hijau-tua); margin-bottom: 5px;">NIP: 197608222005022002</p>
                    </div>
                </div>
            </div>
            
            <!-- INA -->
            <div style="background: linear-gradient(145deg, var(--putih), var(--abu-muda)); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 2px solid var(--emas);">
                <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                    <!-- Foto Ketua -->
                    <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--emas); box-shadow: 0 5px 15px rgba(0,0,0,0.2); background: linear-gradient(145deg, var(--hijau-tua), var(--biru-tua)); display: flex; align-items: center; justify-content: center;">
                        <img src="assets/images/Ina.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="Ina Ainun Nazma" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size: 60px;\'>👩‍🎓</span>';">
                    </div>
                    <!-- Identitas -->
                    <div style="flex: 1;">
                        <h4 style="color: var(--emas); font-size: 20px; margin-bottom: 5px;">Ina Ainun Nazma</h4>
                        <p style="font-size: 18px; font-weight: bold; color: var(--hijau-tua); margin-bottom: 5px;">NIM: 2401344</p>
                    </div>
                </div>
            </div>
            
            <!-- Syifa Aulia Nurhaniyah -->
            <div style="background: linear-gradient(145deg, var(--putih), var(--abu-muda)); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 2px solid var(--emas);">
                <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                    <!-- Foto Ketua -->
                    <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--emas); box-shadow: 0 5px 15px rgba(0,0,0,0.2); background: linear-gradient(145deg, var(--hijau-tua), var(--biru-tua)); display: flex; align-items: center; justify-content: center;">
                        <img src="assets/images/Syifa.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="Syifa Aulia Nurhaniyah" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size: 60px;\'>👩‍🎓</span>';">
                    </div>
                    <!-- Identitas -->
                    <div style="flex: 1;">
                        <h4 style="color: var(--emas); font-size: 20px; margin-bottom: 5px;">Syifa Aulia Nurhaniyah</h4>
                        <p style="font-size: 18px; font-weight: bold; color: var(--hijau-tua); margin-bottom: 5px;">NIM: 2406262</p>
                    </div>
                </div>
            </div>

            <!-- Zaskia Aulia -->
            <div style="background: linear-gradient(145deg, var(--putih), var(--abu-muda)); border-radius: 20px; padding: 25px; margin-bottom: 30px; border: 2px solid var(--emas);">
                <div style="display: flex; align-items: center; gap: 25px; flex-wrap: wrap;">
                    <!-- Foto Ketua -->
                    <div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid var(--emas); box-shadow: 0 5px 15px rgba(0,0,0,0.2); background: linear-gradient(145deg, var(--hijau-tua), var(--biru-tua)); display: flex; align-items: center; justify-content: center;">
                        <img src="assets/images/Zaskia.jpg" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="Zaskia Aulia" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size: 60px;\'>👩‍🎓</span>';">
                    </div>
                    <!-- Identitas -->
                    <div style="flex: 1;">
                        <h4 style="color: var(--emas); font-size: 20px; margin-bottom: 5px;">Zaskia Aulia</h4>
                        <p style="font-size: 18px; font-weight: bold; color: var(--hijau-tua); margin-bottom: 5px;">NIM: 2406843</p>
                    </div>
                </div>
            </div>
                
            
            <!-- FOOTER -->
            <div style="margin-top: 30px; padding: 20px; background: var(--abu-muda); border-radius: 15px; text-align: center;">
                <p style="color: var(--hijau-tua); font-style: italic;">"Bersama belajar zakat, bersama meraih berkah"</p>
                <p style="color: var(--emas); margin-top: 10px;">اَلْحَمْدُ للَّهِ رَبِّ الْعالَمِينَ </p>
                <p style="color: var(--emas); margin-top: 10px;">Alhamdulillahi rabbil 'alamin</p>
                <p style="color: var(--emas); margin-top: 10px;">"Segala puji bagi Allah, Tuhan semesta alam"</p>
            </div>
        </div>
    `;
            break;

        case 'qa':
            title = '👳🏻 AMILIN ZAKAT - ASISTEN PINTAR';  // <-- GANTI INI
            content = `
        <div class="popup-section" style="padding: 0; overflow: hidden;">
            <!-- HEADER AMILIN -->
            <div style="background: linear-gradient(145deg, var(--hijau-tua), var(--biru-tua)); padding: 25px; text-align: center; border-bottom: 3px solid var(--emas);">
                <div style="font-size: 80px; margin-bottom: 10px; animation: bounce 2s infinite;">👳🏻</div>  <!-- GANTI EMOJI JADI PEREMPUAN -->
                <h2 style="color: var(--emas); font-size: 28px; margin-bottom: 5px;">Amilin Zakat</h2>  <!-- <-- GANTI INI -->
                <p style="color: white; font-size: 16px;">Asisten Zakat Pintar - Siap Membantumu 24/7</p>
                <div style="margin-top: 10px; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; display: inline-block;">
                    <span style="color: var(--emas);">⚡ Konsultasi Zakat Online</span>
                </div>
            </div>
            
            <!-- CHAT AREA -->
            <div style="background: var(--abu-muda); padding: 20px; height: 350px; overflow-y: auto; display: flex; flex-direction: column;" id="chat-ai-area">
                <div id="chat-ai-messages">
                    <!-- Pesan sambutan -->
                </div>
                
                <!-- Loading indicator -->
                <div id="chat-ai-loading" style="display: none; align-items: center; gap: 10px; padding: 10px;">
                    <div style="width: 30px; height: 30px; border: 3px solid var(--abu-tua); border-top-color: var(--emas); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <span style="color: var(--abu-gelap);">Amilin sedang mengetik...</span>  <!-- <-- GANTI INI -->
                </div>
            </div>
            
            <!-- INPUT AREA -->
            <div style="background: var(--putih); padding: 20px; border-top: 2px solid var(--abu-tua); display: flex; gap: 10px;">
                <input type="text" id="ai-pertanyaan" style="flex: 1; padding: 15px; border: 2px solid var(--abu-tua); border-radius: 25px; font-size: 15px;" placeholder="Ketik pertanyaanmu untuk Amilin...">  <!-- <-- GANTI INI -->
                <button class="btn btn-primary" id="btn-kirim-ai" style="border-radius: 25px; padding: 15px 25px;">Kirim ke Amilin</button>  <!-- <-- GANTI INI -->
            </div>
            
            <!-- SUGGESTED QUESTIONS -->
            <div style="background: var(--abu-muda); padding: 15px; border-top: 1px solid var(--abu-tua);">
                <p style="font-size: 13px; color: var(--abu-gelap); margin-bottom: 10px;">Coba tanyakan ke Amilin:</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <span class="suggested-q" id="q-fitrah">🍚 Cara zakat fitrah</span>
                    <span class="suggested-q" id="q-maal">💵 Cara zakat maal</span>
                    <span class="suggested-q" id="q-emas">💎 Cara zakat emas</span>
                    <span class="suggested-q" id="q-rikaz">🏺 Cara zakat rikaz</span>
                    <span class="suggested-q" id="q-ternak">🐄 Cara zakat ternak</span>
                    <span class="suggested-q" id="q-pertanian">🌾 Cara zakat pertanian</span>
                    <span class="suggested-q" id="q-perniagaan">🏪 Cara zakat perniagaan</span>
            </div>
            
            <style>
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .suggested-q {
                    background: var(--putih);
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 13px;
                    border: 1px solid var(--abu-tua);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .suggested-q:hover {
                    background: var(--emas);
                    color: white;
                    border-color: var(--emas);
                }
            </style>
        </div>
    `;
            break;
    }
    // Di dalam fungsi showPopup, bagian case 'qa'
    // Setelah konten HTML, tambahkan ini:

    // Pastikan element sudah ada di DOM
    setTimeout(() => {
        console.log('⏳ Memasang event listener Amilin...');

        const kirimBtn = document.getElementById('btn-kirim-ai');
        const inputField = document.getElementById('ai-pertanyaan');

        console.log('🔍 Tombol:', kirimBtn);
        console.log('🔍 Input:', inputField);

        if (kirimBtn) {
            // Hapus semua event listener lama
            kirimBtn.onclick = null;

            // Pasang event listener baru
            kirimBtn.onclick = function (e) {
                e.preventDefault();
                console.log('👆 Tombol diklik!');
                kirimPertanyaan();
                return false;
            };

            console.log('✅ Event listener tombol terpasang');
        }

        if (inputField) {
            inputField.onkeypress = function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ Enter ditekan!');
                    kirimPertanyaan();
                }
            };
            console.log('✅ Event listener Enter terpasang');
        }

        // Pasang event listener untuk pertanyaan populer
        const fitrahBtn = document.getElementById('q-fitrah');
        if (fitrahBtn) {
            fitrahBtn.onclick = () => tanyaAmilin('cara hitung zakat fitrah');
        }

        const emasBtn = document.getElementById('q-emas');
        if (emasBtn) {
            emasBtn.onclick = () => tanyaAmilin('nisab emas berapa gram');
        }

        const maalBtn = document.getElementById('q-maal');
        if (maalBtn) {
            maalBtn.onclick = () => tanyaAmilin('zakat maal');
        }

        const syaratBtn = document.getElementById('q-syarat');
        if (syaratBtn) {
            syaratBtn.onclick = () => tanyaAmilin('syarat wajib zakat');
        }

        const rikazBtn = document.getElementById('q-rikaz');
        if (rikazBtn) {
            rikazBtn.onclick = () => tanyaAmilin('cara zakat rikaz');
        }

        const ternakBtn = document.getElementById('q-ternak');
        if (ternakBtn) {
            ternakBtn.onclick = () => tanyaAmilin('cara zakat ternak');
        }

        const pertanianBtn = document.getElementById('q-pertanian');
        if (pertanianBtn) {
            pertanianBtn.onclick = () => tanyaAmilin('cara zakat pertanian');
        }

        const perniagaanBtn = document.getElementById('q-perniagaan');
        if (perniagaanBtn) {
            perniagaanBtn.onclick = () => tanyaAmilin('cara zakat perniagaan');
        }

        // Tampilkan pesan sambutan
        setTimeout(() => {
            tampilkanPesanAmilin('Halo! Aku Amilin, Asisten Zakat. Ada yang bisa saya bantu? 👋');
        }, 500);

    }, 300);
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');

    if (popupTitle) {
        popupTitle.innerText = title;
        popupTitle.style.display = 'block';
        popupTitle.style.visibility = 'visible';
    }

    if (popupContent) {
        popupContent.innerHTML = content;
        popupContent.style.display = 'block';
        popupContent.style.visibility = 'visible';
    }

    // ===== HANDLE BACKSOUND UNTUK LAGU PENERIMA ZAKAT =====
    if (type === 'penerima') {
        // Tunggu sebentar agar DOM terbentuk
        setTimeout(() => {
            const audio = document.getElementById('lagu-penerima-zakat');
            if (audio) {
                console.log('✅ Audio lagu penerima zakat ditemukan');

                // Fungsi untuk mematikan backsound
                audio.addEventListener('play', function () {
                    if (backsound && !backsound.paused) {
                        backsound.pause();
                        isBacksoundPlaying = false;
                        backsoundPausedByLagu = true;
                        console.log('⏸️ Backsound di-pause oleh lagu');
                    }
                });

                // Fungsi untuk menghidupkan backsound kembali saat dijeda atau selesai
                audio.addEventListener('pause', function () {
                    if (backsound && backsoundPausedByLagu) {
                        backsound.play()
                            .then(() => {
                                isBacksoundPlaying = true;
                                backsoundPausedByLagu = false;
                                console.log('▶️ Backsound dilanjutkan (jeda)');
                            })
                            .catch(e => console.log('Gagal resume backsound:', e));
                    }
                });

                audio.addEventListener('ended', function () {
                    if (backsound && backsoundPausedByLagu) {
                        backsound.play()
                            .then(() => {
                                isBacksoundPlaying = true;
                                backsoundPausedByLagu = false;
                                console.log('▶️ Backsound dilanjutkan (selesai)');
                            })
                            .catch(e => console.log('Gagal resume backsound:', e));
                    }
                });
            } else {
                console.log('❌ Elemen audio lagu-penerima-zakat tidak ditemukan');
            }
        }, 300);
    }
    if (popupOverlay) {
        popupOverlay.style.display = 'block';
        popupOverlay.style.visibility = 'visible';
    }
    if (popupContainer) {
        popupContainer.style.display = 'block';
        popupContainer.style.visibility = 'visible';
    }
}

// ... (semua fungsi showPopup, nextChat, dll) ...

// ========== FUNGSI KALKULATOR ==========
// ... semua fungsi kalkulator ...
// ========== 🌟 AMILIN AI - ASISTEN ZAKAT PINTAR 🌟 ==========

// Konfigurasi backend (ganti dengan URL backend Anda nanti)
const BACKEND_URL = 'http://localhost:3000';

// Database percakapan Amilin (untuk pesan sambutan)
const amilinMessages = [
    "Halo! Aku Amilin, Asisten Zakat yang siap membantumu. 👋",
    "Aku akan membantu menjawab pertanyaan atau masalah yang berkaitan dengan zakat.",
    "Silakan tulis pertanyaanmu tentang zakat, dan aku akan menjawabnya! 😊"
];

// ========== VARIABEL GLOBAL AMILIN ==========
let chatHistory = [];
let amilinMessageIndex = 0;
let ttsAktif = true;
let synth = window.speechSynthesis;

// ========== // ========== 🎵 SISTEM SUARA LENGKAP ==========

// ========== VARIABEL AUDIO ==========
let backsound = null;
let isBacksoundPlaying = false;
let backsoundPausedByLagu = false; // flag untuk tahu apakah backsound dimatikan karena lagu
let suaraAktif = true;
// ... (variabel audio lain)

// ========== VARIABEL GAME ==========
let gameMusic = null;
let isGameMusicPlaying = false;

// Game states
let dragDropGame = {
    currentQuestion: 0,
    score: 0,
    questions: [],
    placedItems: []
};
let trueFalseGame = {
    currentQuestion: 0,
    score: 0,
    questions: [],
    timer: null,
    timeLeft: 10,
    answered: false
};

// ========== FUNGSI GAME MUSIK (didefinisikan ulang di bawah untuk dukungan audio element) ==========
// (fungsi bottom sudah dipakai sebagai override sehingga penggunaan audio element #game-music diprioritaskan)

// ========== FUNGSI LAINNYA ==========

// ========== FUNGSI UNTUK MEMUTAR AYAT (DENGAN BACKSOUND OTOMATIS) ==========

// Variabel untuk menyimpan audio ayat yang sedang diputar
let currentAyatAudio = null;

// Fungsi untuk memutar audio ayat dan pause backsound
function playAyatDenganBacksound(namaFile) {
    console.log('Memutar ayat:', namaFile);

    // Cek apakah ada audio sebelumnya, hentikan
    if (currentAyatAudio) {
        currentAyatAudio.pause();
        currentAyatAudio.currentTime = 0;
    }

    try {
        // Buat audio baru
        currentAyatAudio = new Audio(`assets/audio/${namaFile}.mp3`);
        currentAyatAudio.volume = 0.8;

        // PAUSE BACKSOUND jika sedang playing
        if (isBacksoundPlaying && backsound) {
            backsound.pause();
            console.log('⏸️ Backsound di-pause');
        }

        // Putar audio ayat
        currentAyatAudio.play()
            .then(() => {
                console.log(`🎵 Memutar audio ayat: ${namaFile}`);
            })
            .catch(error => {
                console.error('❌ Gagal memutar audio ayat:', error);
                alert('Audio tidak dapat diputar. Pastikan file audio tersedia.');
            });

        // Saat audio selesai, RESUME BACKSOUND
        currentAyatAudio.onended = function () {
            console.log('✅ Audio ayat selesai');

            // Resume backsound jika sebelumnya playing
            if (isBacksoundPlaying && backsound) {
                backsound.play()
                    .then(() => console.log('▶️ Backsound dilanjutkan'))
                    .catch(e => console.log('Backsound error:', e));
            }

            currentAyatAudio = null;
        };

    } catch (error) {
        console.error('❌ Error:', error);
        alert('File audio tidak ditemukan!');
    }
}

const menus = ['panduan', 'materi', 'kalkulator', 'game', 'qa', 'gerbang'];

function onMenuClick(index) {
    // Pastikan overlay lama ditutup sebelum buka menu baru
    resetAllOverlayState();
    const menuId = menus[index];
    if (menuId === 'gerbang') {
        showFinalGate();
        return;
    }
    if (menuId === 'materi') {
        showSubmenuPopup();
        return;
    }
    if (menuId === 'game') {
        openGameMenu();
        return;
    }
    if (menuId === 'panduan') showPopup('panduan');
    else if (menuId === 'kalkulator') showPopup('kalkulator');
    else if (menuId === 'qa') showPopup('qa');
    moveSultanToNode(index);
    updateActiveNode(index);
    updateProgress(index);
    currentIndex = index;
    showNotification(`✅ Kamu telah membuka menu "${menuId.toUpperCase()}"!`);
}

function showGameSubmenu() {
    const popup = document.getElementById('game-submenu-popup');
    if (popup) popup.style.display = 'block';

    // Attach event listeners ke game-submenu-node items
    const submenuNodes = document.querySelectorAll('.game-submenu-node');
    submenuNodes.forEach(node => {
        node.addEventListener('click', gameSubmenuHandler);
    });

    // Putar game music
    playGameMusic();
}


function selectGameModeFromPopup(gameType) {
    console.log('selectGameModeFromPopup dipanggil dengan:', gameType);
    playClickSound();

    // Reset modal apa pun, agar selalu dalam kondisi bersih
    resetAllOverlayState();
    closeGameSubmenu(false);

    // Tutup popup submenu bila terpanggil dari openGameMenu
    const submenuPopup = document.getElementById('game-submenu-popup');
    if (submenuPopup) {
        submenuPopup.style.display = 'none';
        console.log('✅ Popup submenu disembunyikan');
    }

    const popupOverlay = document.getElementById('popup-overlay');
    const popupContainer = document.getElementById('popup-container');
    const gameSection = document.getElementById('game-section');
    const gameContent = document.getElementById('game-content');
    const mainMenu = document.getElementById('main-menu-section');
    const gameWelcome = document.getElementById('game-welcome');
    const gameNav = document.getElementById('game-nav');

    // tampilkan game section, sembunyikan yang lain
    if (gameSection) gameSection.style.display = 'block';
    if (gameWelcome) gameWelcome.style.display = 'none';
    if (gameNav) gameNav.style.display = 'flex';
    if (popupOverlay) {
        popupOverlay.style.display = 'none';
        popupOverlay.style.visibility = 'hidden';
    }
    if (popupContainer) {
        popupContainer.style.display = 'none';
        popupContainer.style.visibility = 'hidden';
    }

    const renderTarget = gameContent || document.getElementById('popup-content');
    if (!renderTarget) {
        console.error('❌ Tidak ditemukan target render game');
        return;
    }

    renderTarget.innerHTML = '';
    renderTarget.style.display = 'block';
    renderTarget.style.visibility = 'visible';
    renderTarget.style.opacity = '1';
    renderTarget.style.background = 'white';
    renderTarget.style.color = '#1B4D3E';
    renderTarget.style.maxHeight = 'calc(80vh - 100px)';
    renderTarget.style.overflowY = 'auto';

    // Reset game state
    gameState = {
        mode: gameType,
        current: 0,
        score: 0,
        questions: [],
        answered: [],
        perQuestion: []
    };

    if (gameType === 'dragdrop') {
        gameState.questions = gameData.map(item => ({
            title: item.categoryName,
            description: `Seret item ke kategori "${item.categoryName}" atau "${item.decoyName}"`,
            correct: item.correctItems,
            wrong: item.wrongItems
        }));
        console.log('✅ Soal dragdrop dimuat:', gameState.questions.length, 'soal');
    } else if (gameType === 'truefalse') {
        const shuffled = [...trueFalseData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        gameState.questions = shuffled.slice(0, 10);
        console.log('✅ Soal true/false dimuat:', gameState.questions.length, 'soal');
    } else {
        console.error('❌ Mode tidak dikenal:', gameType);
        return;
    }

    console.log('📋 gameState sebelum render:', gameState);
    renderGameQuestion();
}

function gameSubmenuHandler(e) {
    // Cegah event bubbling
    e.stopPropagation();
    e.preventDefault();

    // Gunakan e.currentTarget untuk memastikan kita dapat elemen yang diklik
    const gameType = e.currentTarget.getAttribute('data-game');
    console.log('gameSubmenuHandler dipanggil, gameType:', gameType);

    if (gameType) {
        selectGameModeFromPopup(gameType);
    } else {
        console.error('data-game attribute tidak ditemukan!');
    }
}

function closeGameSubmenu() {
    const popup = document.getElementById('game-submenu-popup');
    if (popup) popup.style.display = 'none';
}

function selectGameFromPopup(gameType) {
    // alias untuk kompatibilitas HTML lama
    selectGameModeFromPopup(gameType);
}

const dragQuestions = [
    {
        categoryName: "Syarat Wajib Zakat",
        decoyName: "Bukan Syarat",
        correctItems: ["Merdeka", "Islam", "Baligh", "Kondisi Harta", "Nisab", "Haul"],
        wrongItems: ["Kaya raya", "Memiliki mobil", "Sudah menikah", "Tinggal di kota"]
    },
    {
        categoryName: "Jenis Zakat",
        decoyName: "Bukan Jenis Zakat",
        correctItems: ["Zakat Fitrah", "Zakat Emas", "Zakat Maal", "Zakat Perniagaan", "Zakat Ternak", "Zakat Pertanian", "Zakat Rikaz"],
        wrongItems: ["Zakat Pendidikan", "Zakat Internet", "Zakat Rumah", "Zakat Kendaraan"]
    },
    {
        categoryName: "Penerima Zakat",
        decoyName: "Bukan Penerima",
        correctItems: ["Fakir", "Miskin", "Amil", "Mualaf", "Gharim", "Ibnu Sabil"],
        wrongItems: ["Orang kaya", "Pejabat", "Pengusaha sukses", "Artis terkenal"]
    },
    {
        categoryName: "Fungsi Zakat",
        decoyName: "Bukan Fungsi",
        correctItems: ["Menyucikan harta dan jiwa", "Meningkatkan kepedulian sosial", "Mengurangi kesenjangan ekonomi", "Membangun masyarakat adil", "Mendekatkan diri kepada Allah"],
        wrongItems: ["Menambah kekayaan pribadi", "Membuat sombong", "Pamer kekayaan", "Mencari popularitas"]
    },
    {
        categoryName: "Dalil Zakat",
        decoyName: "Bukan Dalil",
        correctItems: ["QS. At-Taubah: 103", "QS. At-Taubah: 60", "QS Al-Baqarah: 43", "QS An-Nur: 56", "QS Ar-Rum: 39"],
        wrongItems: ["QS. Al-Insyirah: 6", "QS. Ar-Rahman: 33", "QS. Al-Kafirun: 6", "QS. Al-Ma'idah: 2"]
    }
];

let currentDragQuestion = 0;
let dragScore = 0;
let dragItemsRemaining = [];

function startDragDropGame() {
    // Reset state
    currentDragQuestion = 0;
    dragScore = 0;
    showDragDropQuestion();
}

function showDragDropQuestion() {
    const q = dragQuestions[currentDragQuestion];
    const container = document.getElementById('popup-content');
    const title = document.getElementById('popup-title');
    title.innerText = `Game Drag and Drop - Soal ${currentDragQuestion + 1} dari ${dragQuestions.length}`;

    // Gabungkan semua item (correct + wrong) lalu acak
    let allItems = [...q.correctItems, ...q.wrongItems];
    allItems = shuffleArray(allItems);

    // Buat HTML
    let html = `
        <div class="drag-game-container">
            <div class="score-board">Skor: ${dragScore} / ${(currentDragQuestion) * 20}</div>
            <div class="drag-question">
                <h3>Seret pernyataan ke kategori yang benar!</h3>
            </div>
            <div class="drag-categories">
                <div class="drop-zone" data-category="correct">
                    <h4>✅ ${q.categoryName}</h4>
                    <div class="dropped-items" id="correct-zone"></div>
                </div>
                <div class="drop-zone" data-category="wrong">
                    <h4>❌ ${q.decoyName}</h4>
                    <div class="dropped-items" id="wrong-zone"></div>
                </div>
            </div>
            <div class="drag-items" id="drag-items-container">
                ${allItems.map(item => `<div class="drag-item" draggable="true" data-item="${item}">${item}</div>`).join('')}
            </div>
            <div id="feedback" class="feedback"></div>
            <div class="game-controls">
                ${currentDragQuestion > 0 ? '<button class="btn btn-secondary" id="prev-drag">◀ Sebelumnya</button>' : ''}
                <button class="btn btn-primary" id="next-drag">Selanjutnya ▶</button>
            </div>
        </div>
    `;

    document.getElementById('popup-content').innerHTML = html;
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.add('game-overlay');
    overlay.style.display = 'block';
    const popupContainer = document.getElementById('popup-container');
    popupContainer.classList.add('game-popup');
    popupContainer.style.display = 'block';

    // Setup drag and drop
    setupDragAndDrop(q);

    // Tombol navigasi
    const nextBtn = document.getElementById('next-drag');
    if (nextBtn) {
        nextBtn.onclick = () => {
            // Validasi apakah semua item sudah ditempatkan
            const remaining = document.querySelectorAll('#drag-items-container .drag-item').length;
            if (remaining > 0) {
                showFeedback("Yuk selesaikan semua item dulu! 😊", false);
                return;
            }
            // Hitung skor
            const correctZone = document.getElementById('correct-zone');
            const correctItems = correctZone ? Array.from(correctZone.querySelectorAll('.drag-item')).map(el => el.getAttribute('data-item')) : [];
            // Hitung jumlah yang benar
            const correctCount = correctItems.filter(item => q.correctItems.includes(item)).length;
            const wrongCount = correctItems.filter(item => q.wrongItems.includes(item)).length;
            if (wrongCount > 0) {
                showFeedback(`Ada item yang salah tempat! Coba perbaiki. 😊`, false);
                return;
            }
            // Jika semua benar
            dragScore += 20;
            showFeedback("MasyaAllah, hebat! 🎉", true);
            if (currentDragQuestion + 1 < dragQuestions.length) {
                currentDragQuestion++;
                setTimeout(() => showDragDropQuestion(), 1500);
            } else {
                // Akhir game
                showDragDropResult();
            }
        };
    }

    const prevBtn = document.getElementById('prev-drag');
    if (prevBtn) {
        prevBtn.onclick = () => {
            if (currentDragQuestion > 0) {
                currentDragQuestion--;
                showDragDropQuestion();
            }
        };
    }
}

function setupDragAndDrop(question) {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    e.dataTransfer.setData('text/plain', this.getAttribute('data-item'));
    this.classList.add('dragging');
}

function handleDragEnd(e) {
    if (draggedItem) draggedItem.classList.remove('dragging');
    draggedItem = null;
    document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    const itemText = e.dataTransfer.getData('text/plain');
    if (!draggedItem) return;

    // Cari apakah item sudah dipindahkan sebelumnya
    if (draggedItem.parentElement !== document.getElementById('drag-items-container')) {
        // Item sudah berada di drop zone, tidak boleh dipindah lagi
        showFeedback("Item sudah ditempatkan, tidak bisa dipindah lagi! 😊", false);
        return;
    }

    // Pindahkan item ke drop zone
    const targetZone = this.querySelector('.dropped-items');
    const newItem = draggedItem.cloneNode(true);
    newItem.draggable = false;
    newItem.classList.remove('dragging');
    targetZone.appendChild(newItem);
    draggedItem.remove();

    // Cek apakah item sesuai kategori
    const category = this.getAttribute('data-category');
    const isCorrect = (category === 'correct' && question.correctItems.includes(itemText)) ||
        (category === 'wrong' && question.wrongItems.includes(itemText));
    if (!isCorrect) {
        showFeedback("Item ini tidak sesuai kategori! Coba seret ke tempat lain. 😊", false);
        // Kembalikan ke asal
        const container = document.getElementById('drag-items-container');
        const oldItem = draggedItem.cloneNode(true);
        oldItem.draggable = true;
        oldItem.addEventListener('dragstart', handleDragStart);
        oldItem.addEventListener('dragend', handleDragEnd);
        container.appendChild(oldItem);
        targetZone.removeChild(newItem);
    }
}

function showFeedback(msg, isCorrect) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerText = msg;
    feedbackDiv.style.color = isCorrect ? '#28a745' : '#dc3545';
    if (isCorrect) {
        // Konfeti sederhana
        createConfetti();
    } else {
        // Efek shake pada container
        const container = document.querySelector('.drag-game-container');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
    setTimeout(() => feedbackDiv.innerText = '', 1500);
}

function createConfetti() {
    const confettiDiv = document.createElement('div');
    confettiDiv.className = 'confetti';
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.width = '5px';
        piece.style.height = '10px';
        piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        piece.style.left = Math.random() * window.innerWidth + 'px';
        piece.style.top = '-20px';
        piece.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        piece.style.opacity = Math.random();
        confettiDiv.appendChild(piece);
    }
    document.body.appendChild(confettiDiv);
    setTimeout(() => confettiDiv.remove(), 2000);
}

function showDragDropResult() {
    // Tambahkan skor ke global score
    updateGlobalScore(dragScore);

    const resultMessage = dragScore >= 80 ? "🕌 Sultan Dermawan" : dragScore >= 60 ? "📘 Paham Zakat" : "🔁 Yuk belajar lagi!";
    const html = `
        <div class="drag-game-container" style="text-align:center;">
            <h2>🏆 Hasil Drag and Drop 🏆</h2>
            <p style="font-size:24px;">Nilai kamu: ${dragScore} / 100</p>
            <p style="font-size:20px;">${resultMessage}</p>
            <button class="btn btn-primary" onclick="closePopup(); showGameSubmenu();">Kembali ke Game Menu</button>
        </div>
    `;
    document.getElementById('popup-content').innerHTML = html;
}

function startTrueFalseGame() {
    // Random 10 soal dari bank
    const shuffled = shuffleArray([...trueFalseData]);
    trueFalseGame.questions = shuffled.slice(0, 10);
    trueFalseGame.currentQuestion = 0;
    trueFalseGame.score = 0;
    trueFalseGame.answered = false;
    showTrueFalseQuestion();
}

function showTrueFalseQuestion() {
    const q = trueFalseGame.questions[trueFalseGame.currentQuestion];
    const popupContent = document.getElementById('popup-content');
    const title = document.getElementById('popup-title');
    title.innerText = `Game True or False - Soal ${trueFalseGame.currentQuestion + 1} dari ${trueFalseGame.questions.length}`;

    let html = `
        <div class="truefalse-game">
            <div class="score-board">Skor: ${trueFalseGame.score} / ${(trueFalseGame.currentQuestion) * 10}</div>
            <div class="tf-timer" id="tf-timer">⏱️ 10 detik</div>
            <div class="tf-question">
                <p>${q.text}</p>
            </div>
            <div class="tf-options">
                <button class="tf-btn true" data-answer="true" id="btn-true">✅ Benar</button>
                <button class="tf-btn false" data-answer="false" id="btn-false">❌ Salah</button>
            </div>
            <div id="tf-feedback" class="feedback"></div>
            <div class="game-controls">
                <button class="btn btn-primary" id="next-tf" disabled>Selanjutnya ▶</button>
            </div>
        </div>
    `;

    document.getElementById('popup-content').innerHTML = html;
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.add('game-overlay');
    overlay.style.display = 'block';
    const popupContainer = document.getElementById('popup-container');
    popupContainer.classList.add('game-popup');
    popupContainer.style.display = 'block';
    trueFalseGame.timeLeft = 10;
    trueFalseGame.answered = false;
    const timerEl = document.getElementById('tf-timer');
    const nextBtn = document.getElementById('next-tf');
    const btnTrue = document.getElementById('btn-true');
    const btnFalse = document.getElementById('btn-false');

    function updateTimer() {
        if (trueFalseGame.answered) return;
        timerEl.innerText = `⏱️ ${trueFalseGame.timeLeft} detik`;
        if (trueFalseGame.timeLeft <= 0) {
            clearInterval(trueFalseGame.timer);
            handleAnswer(null, false); // timeout, dianggap salah
        }
        trueFalseGame.timeLeft--;
    }

    trueFalseGame.timer = setInterval(updateTimer, 1000);

    // Event listener tombol Benar/Salah
    function handleButtonClick(userAnswer) {
        if (trueFalseGame.answered) return; // Prevent re-answering
        handleAnswer(userAnswer, true);
    }

    btnTrue.addEventListener('click', () => handleButtonClick(true));
    btnFalse.addEventListener('click', () => handleButtonClick(false));

    function handleAnswer(userAnswer, isUserAction) {
        if (trueFalseGame.answered) return;
        trueFalseGame.answered = true;
        clearInterval(trueFalseGame.timer);

        // Disable buttons immediately
        btnTrue.disabled = true;
        btnFalse.disabled = true;
        btnTrue.style.opacity = '0.5';
        btnFalse.style.opacity = '0.5';

        const isCorrect = (userAnswer === q.answer);
        if (isCorrect) {
            trueFalseGame.score += 10;
            showTFFeedback("🎉 Benar! +10 poin", true);
        } else {
            showTFFeedback("😊 Salah! Jawaban yang benar: " + (q.answer ? "Benar" : "Salah"), false);
        }
        nextBtn.disabled = false;
    }

    nextBtn.onclick = () => {
        if (!trueFalseGame.answered) {
            showTFFeedback("Jawab dulu ya!", false);
            return;
        }
        if (trueFalseGame.currentQuestion + 1 < trueFalseGame.questions.length) {
            trueFalseGame.currentQuestion++;
            clearInterval(trueFalseGame.timer);
            showTrueFalseQuestion();
        } else {
            // Akhir game
            clearInterval(trueFalseGame.timer);
            showTrueFalseResult();
        }
    };
}

function showTFFeedback(msg, isCorrect) {
    const feedbackDiv = document.getElementById('tf-feedback');
    feedbackDiv.innerText = msg;
    feedbackDiv.style.color = isCorrect ? '#28a745' : '#dc3545';
    if (isCorrect) createConfetti();
    setTimeout(() => feedbackDiv.innerText = '', 1500);
}

function showTrueFalseResult() {
    // Tambahkan skor ke global score
    updateGlobalScore(trueFalseGame.score);

    let resultMessage = "";
    if (trueFalseGame.score >= 80) resultMessage = "🎉 Kamu Hebat!";
    else if (trueFalseGame.score >= 60) resultMessage = "👍 Sudah bagus!";
    else resultMessage = "🔁 Coba lagi ya!";

    const html = `
        <div class="truefalse-game" style="text-align:center;">
            <h2>🏆 Hasil True or False 🏆</h2>
            <p style="font-size:24px;">Skor kamu: ${trueFalseGame.score} / 100</p>
            <p style="font-size:20px;">${resultMessage}</p>
            <button class="btn btn-primary" onclick="closePopup(); showGameSubmenu();">Kembali ke Game Menu</button>
        </div>
    `;
    document.getElementById('popup-content').innerHTML = html;
}

// Preload suara efek
const soundEffects = {
    klikMenu: new Audio('assets/audio/klik-menu.mp3'),
    notifAi: new Audio('assets/audio/notif-ai.mp3'),
    click: new Audio('audio/click.mp3')   // <-- tambahkan baris ini
};

// Atur volume
soundEffects.klikMenu.volume = 0.3;
soundEffects.notifAi.volume = 0.4;
soundEffects.click.volume = 0.9; // <-- tambahkan baris ini

// Tambahkan event listener untuk cek error
soundEffects.klikMenu.addEventListener('error', (e) => {
    console.error('Error loading klik-menu.mp3:', e);
});

// ========== FUNGSI DASAR SUARA ==========

// Main fungsi untuk memutar suara
function playSound(soundName) {
    console.log('playSound dipanggil untuk:', soundName); // <-- TAMBAHKAN INI

    if (!suaraAktif) {
        console.log('Suara tidak aktif');
        return;
    }

    const sound = soundEffects[soundName];
    if (!sound) {
        console.log('Suara tidak ditemukan:', soundName);
        return;
    }

    console.log('Memutar suara:', soundName);
    sound.pause();
    sound.currentTime = 0;
    sound.play()
        .then(() => console.log('Suara berhasil diputar'))
        .catch(e => console.log('Gagal memutar suara:', e));
}

// ========== BACKSOUND (OTOMATIS SAAT TRANSISI) ==========

// Inisialisasi backsound
function initBacksound() {
    backsound = document.getElementById('backsound');
    if (backsound) {
        backsound.volume = 0.2; // Backsound pelan
        backsound.loop = true;
    }
}

// Fungsi untuk memulai backsound (dipanggil saat transisi)
function playBacksound() {
    if (!backsound) {
        backsound = document.getElementById('backsound');
        if (!backsound) return;
    }

    if (!isBacksoundPlaying && suaraAktif) {
        backsound.play()
            .then(() => {
                isBacksoundPlaying = true;
                console.log('Backsound dimulai');
            })
            .catch(e => console.log('Backsound error:', e));
    }
}

// Fungsi untuk menghentikan backsound
function stopBacksound() {
    if (backsound && isBacksoundPlaying) {
        backsound.pause();
        backsound.currentTime = 0;
        isBacksoundPlaying = false;
    }
}

// Toggle backsound manual (via tombol)
function toggleBacksound() {
    if (!backsound) {
        backsound = document.getElementById('backsound');
        if (!backsound) return;
    }

    const icon = document.getElementById('audio-icon');

    if (isBacksoundPlaying) {
        backsound.pause();
        icon.innerText = '🔇';
        isBacksoundPlaying = false;
    } else if (suaraAktif) {
        backsound.play()
            .then(() => {
                icon.innerText = '🔊';
                isBacksoundPlaying = true;
            })
            .catch(e => console.log('Backsound error:', e));
    }
}

// ========== AUDIO TOGGLE FUNCTION ==========
function toggleAudio() {
    suaraAktif = !suaraAktif;
    const audioIcon = document.getElementById('audio-icon');

    if (suaraAktif) {
        audioIcon.innerText = '🔊';
        // Resume backsound if it was playing
        if (backsound && !backsoundPausedByLagu) {
            backsound.play().catch(e => console.log('Error resuming backsound:', e));
        }
        // Resume game music if playing
        if (gameMusic && isGameMusicPlaying) {
            gameMusic.play().catch(e => console.log('Error resuming game music:', e));
        }
    } else {
        audioIcon.innerText = '🔇';
        // Pause all audio
        if (backsound) backsound.pause();
        if (gameMusic) gameMusic.pause();
    }

    console.log('Audio toggled:', suaraAktif ? 'ON' : 'OFF');
}

// ========== SUARA KLIK MENU (HANYA UNTUK 8 MENU) ==========

// Fungsi untuk menambah efek klik ke menu-menu tertentu
function addClickSoundToMenus() {
    // Klik pada titik peta (menu-node)
    const menuNodes = document.querySelectorAll('.menu-node');
    menuNodes.forEach(node => {
        node.addEventListener('click', () => playSound('click'));
    });

    // Klik pada menu card (jika masih ada menu grid lama)
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', () => playSound('click'));
    });

    // Klik pada tombol di dalam popup (fitur menu)
    const popupButtons = document.querySelectorAll('.popup-content button, .popup-content .btn');
    popupButtons.forEach(btn => {
        btn.addEventListener('click', () => playSound('click'));
    });

    // Klik pada submenu kalkulator (submenu-card)
    const submenuCards = document.querySelectorAll('.submenu-card');
    submenuCards.forEach(card => {
        card.addEventListener('click', () => playSound('click'));
    });

    // Klik pada pertanyaan populer di Q&A
    const suggestedQ = document.querySelectorAll('.suggested-q');
    suggestedQ.forEach(item => {
        item.addEventListener('click', () => playSound('click'));
    });
}

// ========== NOTIF AI (HANYA UNTUK OPENING CHAT) ==========

// Simpan fungsi addMessage asli dengan nama berbeda
const originalAddMessageFunction = window.addMessage;

// Override fungsi addMessage untuk opening chat
window.addMessage = function (speaker, text) {
    // Panggil fungsi asli
    if (originalAddMessageFunction) {
        originalAddMessageFunction(speaker, text);
    }

    // Putar notif hanya jika speaker = ai
    if (speaker === 'ai') {
        playSound('notifAi');
    }
};

// ========== INTEGRASI DENGAN TRANSISI ==========

// Simpan fungsi startTransition asli
const originalStartTransition = window.startTransition;

// Override startTransition untuk memulai backsound
window.startTransition = function () {
    // Panggil fungsi asli
    if (originalStartTransition) {
        originalStartTransition();
    }

    // Mulai backsound setelah transisi ke menu utama
    setTimeout(() => {
        playBacksound();
    }, 3500); // Sama dengan durasi transisi
};

// ========== INISIALISASI ==========

// Panggil saat halaman dimuat
window.addEventListener('load', function () {
    initBacksound();

    // Tunggu DOM siap
    setTimeout(() => {
        addClickSoundToMenus();
    }, 1000);
});

// Override showPopup untuk menambah suara klik saat buka popup
const originalShowPopupFunction = window.showPopup;
window.showPopup = function (type) {
    // Suara klik saat membuka popup
    playSound('click');

    // Panggil fungsi asli
    if (originalShowPopupFunction) {
        originalShowPopupFunction(type);
    }

    // Tunggu popup terbuka, lalu tambahkan event listener ke elemen di dalamnya
    setTimeout(() => {
        const popupContent = document.getElementById('popup-content');
        if (popupContent) {
            const buttons = popupContent.querySelectorAll('button, .btn, .submenu-card, .suggested-q');
            buttons.forEach(btn => {
                // Hapus listener lama biar tidak dobel
                btn.removeEventListener('click', window.klikHandler);
                const handler = () => playSound('click');
                btn.addEventListener('click', handler);
                // Simpan untuk referensi
                window.klikHandler = handler;
            });
        }
    }, 200);
};

// Ekspor fungsi ke global
window.toggleBacksound = toggleBacksound;
window.playSound = playSound;
window.playBacksound = playBacksound;
window.stopBacksound = stopBacksound;

// ========== FUNGSI DASAR ==========

// Main fungsi untuk memutar suara (dengan pengecekan)
function playSound(soundName) {
    if (!suaraAktif) return; // Jika suara dimatikan secara global

    const sound = soundEffects[soundName];
    if (!sound) {
        console.log('Suara tidak ditemukan:', soundName);
        return;
    }

    // Reset dan putar ulang
    sound.pause();
    sound.currentTime = 0;
    sound.play().catch(e => {
        console.log(`Gagal memutar suara ${soundName}:`, e);
    });
}

// Toggle backsound
function toggleBacksound() {
    if (!backsound) {
        backsound = document.getElementById('backsound');
        if (!backsound) return;
    }

    const icon = document.getElementById('audio-icon');

    if (isBacksoundPlaying) {
        backsound.pause();
        icon.innerText = '🔇';
        isBacksoundPlaying = false;
    } else {
        backsound.play()
            .then(() => {
                icon.innerText = '🔊';
                isBacksoundPlaying = true;
            })
            .catch(e => {
                console.log('Backsound error:', e);
                icon.innerText = '🔇';
            });
    }
}

// Toggle semua suara (global)
function toggleSuara() {
    suaraAktif = !suaraAktif;
    console.log('Suara', suaraAktif ? 'diaktifkan' : 'dimatikan');

    // Update ikon atau tampilkan pesan
    if (!suaraAktif && isBacksoundPlaying) {
        toggleBacksound(); // Matikan backsound juga
    }
}

// ========== SUARA UNTUK CHAT OPENING ==========

// Override fungsi addMessage yang sudah ada
const originalAddMessage = addMessage;
addMessage = function (speaker, text) {
    // Panggil fungsi asli
    originalAddMessage(speaker, text);

    // Tambah suara notif jika AI
    if (speaker === 'ai') {
        playSound('notifAi');
    }
};

// ========== SUARA UNTUK KLIK MENU ==========

// Fungsi untuk menambah efek klik ke semua menu
function addClickSoundToMenus() {
    // Semua menu card
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound('click');
        });
    });

    // Semua tombol
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound('click');
        });
    });
}

// ========== SUARA UNTUK AMILIN ==========

// Override fungsi tampilkanPesanAmilin
const originalTampilkanPesanAmilin = tampilkanPesanAmilin;
tampilkanPesanAmilin = function (teks) {
    // Panggil fungsi asli
    originalTampilkanPesanAmilin(teks);

    // Tambah suara notif Amilin
    playSound('notifAmilin');
};

// ========== INISIALISASI ==========

// Panggil saat halaman dimuat
window.addEventListener('load', function () {
    initBacksound();

    // Tunggu sebentar agar DOM siap
    setTimeout(() => {
        addClickSoundToMenus();
    }, 1000);
});

// Override showPopup untuk menambah suara klik
window.showPopup = function (type) {
    // Suara klik saat membuka popup
    playSound('click');

    // Panggil fungsi asli
    if (originalShowPopupFunction) {
        originalShowPopupFunction(type);
    }
};

// Ekspor fungsi ke global
window.toggleBacksound = toggleBacksound;
window.toggleSuara = toggleSuara;
window.playSound = playSound;

// Fungsi untuk memulai percakapan Amilin
function mulaiAmilin() {
    const messagesContainer = document.getElementById('chat-ai-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';
    amilinMessageIndex = 0;

    // Tampilkan pesan pertama
    setTimeout(() => {
        if (amilinMessageIndex < amilinMessages.length) {
            tampilkanPesanAmilin(amilinMessages[amilinMessageIndex]);
            amilinMessageIndex++;

            setTimeout(() => {
                if (amilinMessageIndex < amilinMessages.length) {
                    tampilkanPesanAmilin(amilinMessages[amilinMessageIndex]);
                    amilinMessageIndex++;

                    setTimeout(() => {
                        if (amilinMessageIndex < amilinMessages.length) {
                            tampilkanPesanAmilin(amilinMessages[amilinMessageIndex]);
                            amilinMessageIndex++;
                        }
                    }, 1500);
                }
            }, 1500);
        }
    }, 500);
}

// Database jawaban lokal (cadangan jika backend offline)
function cariJawabanLokal(pertanyaan) {
    const q = pertanyaan.toLowerCase();

    if (q.includes('fitrah') || q.includes('ramadhan') || q.includes('lebaran') || q.includes('beras')) {
        return `🍚 Zakat fitrah adalah 2,5 kg beras per jiwa. Contoh: keluarga 4 orang = 10 kg beras (≈ Rp 150.000).`;
    }
    if (q.includes('emas') || q.includes('perak') || q.includes('logam') || q.includes('perhiasan')) {
        return `💎 Zakat emas: nisab 85 gram, kadar 2,5%. Contoh: emas 100 gram, zakat = 2,5 gram (≈ Rp 2.500.000).`;
    }
    if (q.includes('maal') || q.includes('gaji') || q.includes('pendapatan')) {
        return `💵 Zakat maal: 2,5% dari harta. Contoh: harta Rp 1.000.000, zakat = Rp 25.000.`;
    }
    if (q.includes('syarat') || q.includes('wajib')) {
        return `✅ Syarat wajib zakat: Islam, Merdeka, Baligh, Harta berkembang, Mencapai nisab, Haul 1 tahun.`;
    }
    if (q.includes('penerima') || q.includes('mustahik') || q.includes('asnaf')) {
        return `🤲 8 penerima zakat: Fakir, Miskin, Amil, Mualaf, Riqab, Gharim, Fi sabilillah, Ibnu sabil.`;
    }
    if (q.includes('nisab')) {
        return `📊 Nisab zakat: Emas 85 gram, Perak 595 gram, Pertanian 815 kg beras, Kambing 40 ekor, Sapi 30 ekor.`;
    }
    if (q.includes('haul')) {
        return `⏰ Haul adalah batas waktu 1 tahun hijriyah. Zakat mal mensyaratkan haul, kecuali zakat pertanian dan rikaz.`;
    }
    if (q.includes('tabungan') || q.includes('uang') || q.includes('bank') || q.includes('rekening')) {
        return `💰 Tabungan wajib dizakati jika mencapai nisab (setara 85 gram emas) dan haul 1 tahun. Kadar zakat 2,5%.`;
    }

    return `Maaf, Amilin belum memiliki jawaban untuk pertanyaan itu. Coba tanyakan dengan kata kunci lain! 😊`;
}

// Fungsi untuk pertanyaan populer (didefinisikan sekali di akhir)

// Override showPopup untuk memulai Amilin saat menu QA dibuka
const originalShowPopup = window.showPopup;

window.showPopup = function (type) {
    // Panggil fungsi asli terlebih dahulu
    originalShowPopup(type);

    // Jika menu QA, setup Amilin
    if (type === 'qa') {
        setTimeout(() => {
            mulaiAmilin();

            // ===== SETUP ELEMENT AMILIN =====
            const kirimBtn = document.getElementById('btn-kirim-ai');
            const inputField = document.getElementById('ai-pertanyaan');

            console.log('🔍 CEK ELEMENT DI AMILIN:');
            console.log('   - Tombol kirim (btn-kirim-ai):', kirimBtn);
            console.log('   - Input field (ai-pertanyaan):', inputField);

            // Setup tombol kirim
            if (kirimBtn) {
                kirimBtn.onclick = function (e) {
                    e.preventDefault();
                    console.log('👆 Tombol diklik!');
                    kirimPertanyaan();
                };
                console.log('✅ Tombol ditemukan, event listener terpasang');
            } else {
                console.error('❌ ERROR: Tombol tidak ditemukan! Periksa ID di HTML');
            }

            // Setup input field (enter)
            if (inputField) {
                inputField.onkeypress = function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        console.log('⌨️ Enter ditekan!');
                        kirimPertanyaan();
                    }
                };
                console.log('✅ Input ditemukan, event listener Enter terpasang');
            } else {
                console.error('❌ ERROR: Input tidak ditemukan! Periksa ID di HTML');
            }

            // Setup pertanyaan populer
            const fitrahBtn = document.getElementById('q-fitrah');
            if (fitrahBtn) {
                fitrahBtn.onclick = () => tanyaAmilin('cara hitung zakat fitrah');
            }

            const emasBtn = document.getElementById('q-emas');
            if (emasBtn) {
                emasBtn.onclick = () => tanyaAmilin('nisab emas berapa gram');
            }

            const maalBtn = document.getElementById('q-maal');
            if (maalBtn) {
                maalBtn.onclick = () => tanyaAmilin('zakat maal');
            }

            const syaratBtn = document.getElementById('q-syarat');
            if (syaratBtn) {
                syaratBtn.onclick = () => tanyaAmilin('syarat wajib zakat');
            }

        }, 300);
    }
};
// Fungsi untuk menangani klik pertanyaan populer
function tanyaAmilin(pertanyaan) {
    const input = document.getElementById('ai-pertanyaan');
    if (input) {
        input.value = pertanyaan;
        kirimPertanyaan();
    }
}

// ========== FUNGSI-FUNGSI AMILIN AI ==========

// Fungsi untuk mengaktifkan/nonaktifkan suara
function aktifkanSuara() {
    suaraAktif = !suaraAktif;
    const btn = event.currentTarget;
    btn.innerHTML = suaraAktif ? '🔊' : '🔇';

    // Beri feedback
    if (suaraAktif) {
        amilinBicara("Suara diaktifkan");
    }
}

// Fungsi untuk membuat Amilin berbicara
function amilinBicara(teks) {
    if (!suaraAktif) return;

    // Hentikan suara yang sedang berlangsung
    if (synth.speaking) {
        synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(teks);

    // Atur suara (cari suara Indonesia jika ada)
    const voices = synth.getVoices();
    const suaraIndonesia = voices.find(voice => voice.lang.includes('id'));

    if (suaraIndonesia) {
        utterance.voice = suaraIndonesia;
    }

    utterance.lang = 'id-ID';
    utterance.rate = 0.9; // Kecepatan bicara
    utterance.pitch = 1.1; // Nada suara

    synth.speak(utterance);
}

// Fungsi untuk menampilkan pesan Amilin
function tampilkanPesanAmilin(teks) {
    console.log('Menampilkan pesan Amilin:', teks);

    const container = document.getElementById('chat-ai-messages');
    if (!container) {
        console.error('Container chat-ai-messages tidak ditemukan!');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai';
    messageDiv.style.marginBottom = '15px';

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');

    messageDiv.innerHTML = `
        <div class="message-avatar" style="background: var(--hijau-tua);">🧕</div>
        <div class="message-bubble" style="background: white; border: 2px solid var(--hijau-tua);">
            <strong style="color: var(--hijau-tua); display: block; margin-bottom: 5px;">Amilin</strong>
            ${teks}
            <div class="message-time" style="margin-top: 5px;">${timeStr}</div>
        </div>
    `;

    container.appendChild(messageDiv);

    // Scroll ke bawah
    const chatArea = document.getElementById('chat-ai-area');
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
}

// Fungsi untuk menampilkan pesan user
function tampilkanPesanUser(teks) {
    const messagesContainer = document.getElementById('chat-ai-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message sultan';
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    messageDiv.style.transition = 'all 0.5s ease';

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');

    messageDiv.innerHTML = `
        <div class="message-bubble" style="background: var(--hijau-tua); color: white;">
            ${teks}
            <div class="message-time" style="color: rgba(255,255,255,0.7);">${timeStr}</div>
        </div>
        <div class="message-avatar" style="background: var(--emas);">👤</div>
    `;

    messagesContainer.appendChild(messageDiv);

    // Animasi muncul
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);

    // Scroll ke bawah
    const chatArea = document.getElementById('chat-ai-area');
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
}

// Fungsi untuk mengirim pertanyaan ke Amilin
async function kirimPertanyaan() {
    console.log('🚀 FUNGSI KIRIM PERTANYAAN DIPANGGIL');

    const input = document.getElementById('ai-pertanyaan');
    if (!input) {
        alert('Error: Input tidak ditemukan!');
        return;
    }

    const pertanyaan = input.value.trim();
    if (pertanyaan === '') {
        alert('Silakan masukkan pertanyaan terlebih dahulu!');
        return;
    }

    // Tampilkan pesan user
    tampilkanPesanUser(pertanyaan);
    input.value = '';

    const loading = document.getElementById('chat-ai-loading');
    if (loading) loading.style.display = 'flex';

    const chatArea = document.getElementById('chat-ai-area');
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;

    try {
        const response = await fetch(AMILIN_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: pertanyaan,
                history: chatHistory || []
            })
        });

        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        const data = await response.json();
        console.log('📥 Response dari server:', data);

        if (loading) loading.style.display = 'none';

        if (data.success && data.answer) {
            if (!chatHistory) chatHistory = [];
            chatHistory.push(
                { role: 'user', content: pertanyaan },
                { role: 'assistant', content: data.answer }
            );
            tampilkanPesanAmilin(data.answer);
        } else {
            const jawaban = cariJawabanAmilin(pertanyaan);
            tampilkanPesanAmilin(jawaban + ' (fallback lokal)');
        }
    } catch (error) {
        console.error('❌ Error koneksi ke server:', error);
        if (loading) loading.style.display = 'none';
        const jawaban = cariJawabanAmilin(pertanyaan);
        tampilkanPesanAmilin(jawaban + ' (fallback lokal - server AI tidak terhubung)');
    }
}

// Fungsi untuk menangani klik pertanyaan populer
function amilinTanya(pertanyaan) {
    const input = document.getElementById('ai-pertanyaan');
    if (input) {
        input.value = pertanyaan;
        kirimPertanyaan();
    }
}

// Database jawaban Amilin
function cariJawabanAmilin(pertanyaan) {
    const q = pertanyaan.toLowerCase();

    // Zakat Fitrah
    if (q.includes('fitrah') || q.includes('fitri') || q.includes('ramadhan') || q.includes('beras') || q.includes('lebaran')) {
        return `Zakat fitrah adalah zakat wajib yang dikeluarkan setiap Muslim pada bulan Ramadan sebagai penyucian diri setelah berpuasa. Wajib bagi setiap jiwa (anak & dewasa yang mampu). Waktu pembayaran dimulai sejak awal Ramadan dan paling utama sebelum salat Idulfitri. Besarnya 1 sha’ (sekitar 2,5–3 kg makanan pokok seperti beras). Diberikan kepada fakir dan miskin, bisa langsung atau melalui amil zakat.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِي فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātal-fiṭri ‘an nafsī fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat fitrah untuk diri saya karena Allah Ta‘ala.`;
    }

    // Zakat Maal
    if (q.includes('maal') || q.includes('harta') || q.includes('aset')) {
        return `Zakat maal adalah zakat atas harta yang dimiliki (uang, emas, tabungan, investasi). Wajib jika harta mencapai nisab (±85 gram emas) dan sudah dimiliki 1 tahun (haul). Cara menghitung 2,5% dari total harta bersih (setelah dikurangi utang jatuh tempo). Diberikan kepada 8 golongan asnaf (fakir, miskin, amil, mualaf, riqab, gharim, fi sabilillah, ibnu sabil).\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ مَالِي فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakāta mālī fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat harta saya karena Allah Ta‘ala.`;
    }

    // Zakat Perhiasan / Emas
    if (q.includes('emas') || q.includes('perak') || q.includes('logam mulia') || q.includes('perhiasan')) {
        return `Zakat perhiasan (emas/perak) wajib jika mencapai nisab (±85 gram emas). Jika hanya dipakai wajar, sebagian ulama berpendapat tidak wajib; jika disimpan/berlebihan, wajib dizakati. Nisab ±85 gram emas, haul 1 tahun. Besar zakat 2,5% dari nilai perhiasan.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْحُلِيِّ فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātal-ḥuliyyi fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat perhiasan karena Allah Ta‘ala.`;
    }

    // Zakat Perniagaan
    if (q.includes('perniagaan') || q.includes('dagang') || q.includes('usaha') || q.includes('toko') || q.includes('bisnis')) {
        return `Zakat perniagaan adalah zakat atas harta usaha/perdagangan (modal, keuntungan, stok dagangan) dikurangi utang. Wajib jika mencapai nisab (±85 gram emas) dan haul 1 tahun. Besar zakat 2,5% dari total harta bersih usaha.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ التِّجَارَةِ فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātat-tijārah fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat perniagaan karena Allah Ta‘ala.`;
    }

    // Zakat Ternak
    if (q.includes('ternak') || q.includes('kambing') || q.includes('domba') || q.includes('sapi') || q.includes('kerbau') || q.includes('unta')) {
        return `Zakat ternak untuk hewan seperti kambing, sapi, unta. Syarat: mencapai nisab tertentu (misal kambing minimal 40 ekor), dipelihara 1 tahun (haul), digembalakan. Zakat bukan persen, melainkan berdasarkan jumlah hewan. Contoh: 40-120 kambing zakat 1 ekor kambing.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْأَنْعَامِ فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātal-an‘ām fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat ternak karena Allah Ta‘ala.`;
    }

    // Zakat Pertanian
    if (q.includes('pertanian') || q.includes('panen') || q.includes('padi') || q.includes('sawah') || q.includes('tanaman')) {
        return `Zakat pertanian dikeluarkan dari hasil panen (padi, gandum, hasil bumi). Tidak mensyaratkan haul, cukup nisab (±653 kg gabah). Besar zakat: 10% untuk pengairan alami (hujan/sungai), 5% untuk irigasi berbayar/perawatan khusus.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الزُّرُوعِ فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātaz-zurū‘ fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat pertanian karena Allah Ta‘ala.`;
    }

    // Zakat Rikaz
    if (q.includes('rikaz') || q.includes('harta karun') || q.includes('barang tambang') || q.includes('temuan')) {
        return `Zakat rikaz adalah zakat atas harta temuan (harta karun) yang ditemukan dan tidak diketahui pemiliknya. Tidak memerlukan nisab/haul. Saat ditemukan, langsung dikeluarkan zakat 20% (1/5), sisanya menjadi milik penemu.\n\nNiat:\nنَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الرِّكَازِ فَرْضًا لِلَّهِ تَعَالَى\nNawaitu an ukhrija zakātar-rikāz fardhan lillāhi ta‘ālā\nArtinya: Saya niat mengeluarkan zakat rikaz karena Allah Ta‘ala.`;
    }

    // Syarat Zakat
    if (q.includes('syarat') || q.includes('wajib') || q.includes('ketentuan') || q.includes('kewajiban')) {
        return `Syarat wajib zakat ada 6: 
        1. Islam - zakat hanya wajib bagi muslim
        2. Merdeka - bukan budak/hamba sahaya
        3. Baligh & berakal - telah dewasa dan sehat akal
        4. Harta berkembang - harta yang dimiliki berpotensi berkembang
        5. Mencapai nisab - harta mencapai batas minimal
        6. Mencapai haul (1 tahun) - kecuali zakat pertanian dan rikaz`;
    }

    // Penerima Zakat
    if (q.includes('penerima') || q.includes('mustahik') || q.includes('asnaf') || q.includes('fakir') || q.includes('miskin')) {
        return `8 golongan penerima zakat (asnaf) berdasarkan QS. At-Taubah: 60:
        1. Fakir - tidak punya penghasilan
        2. Miskin - penghasilan tidak cukup
        3. Amil - petugas zakat
        4. Mualaf - baru masuk Islam
        5. Riqab - memerdekakan budak
        6. Gharim - orang berhutang
        7. Fi sabilillah - pejuang di jalan Allah
        8. Ibnu sabil - musafir kehabisan bekal`;
    }

    // Nisab
    if (q.includes('nisab') || q.includes('batas minimal')) {
        return `Nisab adalah batas minimal harta wajib zakat:
        • Emas: 85 gram
        • Perak: 595 gram
        • Tabungan/uang: setara 85 gram emas
        • Pertanian: 815 kg beras / 1.631 kg padi
        • Kambing: 40 ekor
        • Sapi: 30 ekor
        • Unta: 5 ekor
        
        Jika harta belum mencapai nisab, maka tidak wajib zakat.`;
    }

    // Haul
    if (q.includes('haul') || q.includes('tahun') || q.includes('waktu') || q.includes('masa')) {
        return `Haul adalah batas waktu kepemilikan harta selama 1 tahun hijriyah. Zakat mal seperti emas, tabungan, perniagaan, ternak mensyaratkan haul. Zakat fitrah, pertanian, dan rikaz tidak mensyaratkan haul. Dalil: "Tidak ada kewajiban zakat pada harta sampai genap satu tahun." (HR. Abu Dawud)`;
    }

    // Tabungan/Uang
    if (q.includes('tabungan') || q.includes('uang') || q.includes('simpanan') || q.includes('bank') || q.includes('rekening')) {
        return `Tabungan wajib dizakati jika mencapai nisab (setara 85 gram emas) dan telah disimpan 1 tahun. Kadar zakat 2,5%. Contoh: tabungan Rp 100.000.000, jika harga emas Rp 1.000.000/gram, nisab Rp 85.000.000, maka zakatnya Rp 2.500.000.`;
    }

    // Contoh kasus
    if (q.includes('contoh') || q.includes('kasus') || q.includes('perhitungan')) {
        return `Berikut contoh perhitungan zakat:
        
        👪 Zakat Fitrah: 4 orang × 2,5 kg = 10 kg beras (≈ Rp 150.000)
        
        💎 Zakat Emas: 100 gram × 2,5% = 2,5 gram (≈ Rp 2.500.000)
        
        💵 Zakat Penghasilan: Rp 8.000.000 × 2,5% = Rp 200.000/bulan
        
        🏪 Zakat Perniagaan: (Rp 100.000.000 - Rp 20.000.000) × 2,5% = Rp 2.000.000
        
        🌾 Zakat Pertanian: 1.000 kg × 5% = 50 kg beras`;
    }

    // Default
    return `Maaf, aku belum memiliki jawaban untuk pertanyaan itu. Coba tanyakan dengan kata kunci yang lebih spesifik, seperti:
    
    • Zakat fitrah
    • Zakat emas
    • Zakat maal
    • Syarat zakat
    • Penerima zakat
    • Nisab
    • Haul
    • Tabungan
    • Contoh perhitungan
    
    Atau kamu bisa pilih pertanyaan populer di atas! 😊`;
}

// ========== FUNGSI GLOBAL ==========
window.nextChat = nextChat;
window.showPopup = showPopup;
window.closePopup = closePopup;
window.showKalkulator = showKalkulator;
window.playAyatDenganBacksound = playAyatDenganBacksound;
// ========== FUNGSI GLOBAL AMILIN ==========
window.kirimPertanyaan = kirimPertanyaan;
window.tanyaAmilin = tanyaAmilin;
window.tampilkanPesanAmilin = tampilkanPesanAmilin;
window.tampilkanPesanUser = tampilkanPesanUser;
// ... semua fungsi global ...
// TIDAK BOLEH ADA KODE LAIN SETELAH INI
// ========== script.js - SULTAN NYASAR ==========
// VERSI FINAL DENGAN 7 KALKULATOR LENGKAP

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    const container = document.getElementById('popup-container');
    const content = document.getElementById('popup-content');
    const title = document.getElementById('popup-title');

    if (overlay) {
        overlay.style.display = 'none';
        overlay.style.visibility = 'hidden';
        overlay.className = 'popup-overlay';
        console.log('✅ Popup overlay ditutup');
    }

    if (container) {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.className = 'popup-container';
        console.log('✅ Popup container ditutup');
    }

    if (title) {
        title.textContent = '';
        title.style.display = '';
        title.style.visibility = '';
    }

    if (content) {
        content.innerHTML = '';
        content.style.display = '';
        content.style.visibility = '';
        console.log('✅ Popup content dibersihkan');
    }
}

// ========== 🧮 KALKULATOR ZAKAT LENGKAP ==========

// Fungsi untuk menampilkan kalkulator berdasarkan pilihan
function showKalkulator(jenis) {
    const container = document.getElementById('kalkulator-container');
    if (!container) return;

    let html = '';

    switch (jenis) {
        case 'fitrah':
            html = getKalkulatorFitrah();
            break;
        case 'emas':
            html = getKalkulatorEmas();
            break;
        case 'maal':
            html = getKalkulatorMaal();
            break;
        case 'perniagaan':
            html = getKalkulatorPerniagaan();
            break;
        case 'ternak':
            html = getKalkulatorTernak();
            break;
        case 'pertanian':
            html = getKalkulatorPertanian();
            break;
        case 'rikaz':
            html = getKalkulatorRikaz();
            break;
    }

    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== 1. KALKULATOR ZAKAT FITRAH ==========
function getKalkulatorFitrah() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">🍚</span> ZAKAT FITRAH
            </h3>
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Ketentuan:</strong> 2,5 kg beras per jiwa. Bisa dibayar dengan uang senilai beras.</p>
            </div>
            
            <div class="form-group">
                <label>Jumlah Jiwa:</label>
                <input type="number" id="fitrahJiwa" class="kalkulator-input" placeholder="Contoh: 4">
            </div>
            <div class="form-group">
                <label>Harga Beras per Kg (Rp):</label>
                <input type="number" id="fitrahHarga" class="kalkulator-input" placeholder="Contoh: 15000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungFitrah()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearFitrah()">Clear</button>
            </div>
            
            <div id="hasilFitrah" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungFitrah() {
    const jiwa = document.getElementById('fitrahJiwa')?.value;
    const harga = document.getElementById('fitrahHarga')?.value;

    if (!jiwa || !harga) {
        alert('Harap isi semua field');
        return;
    }

    const totalBeras = parseFloat(jiwa) * 2.5;
    const totalUang = totalBeras * parseFloat(harga);

    document.getElementById('hasilFitrah').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Fitrah</h4>
            <div class="hasil-row">
                <span class="hasil-label">Total Beras:</span>
                <span class="hasil-value">${totalBeras.toFixed(1)} Kg</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Total Uang:</span>
                <span class="hasil-value">Rp ${totalUang.toLocaleString()}</span>
            </div>
            <p style="margin-top: 10px; font-style: italic;">Zakat fitrah untuk ${jiwa} jiwa wajib dikeluarkan sebelum shalat Idul Fitri.</p>
        </div>
    `;
}

function clearFitrah() {
    document.getElementById('fitrahJiwa').value = '';
    document.getElementById('fitrahHarga').value = '';
    document.getElementById('hasilFitrah').innerHTML = '';
}

// ========== 2. KALKULATOR ZAKAT EMAS & PERAK ==========
let jenisLogam = 'emas';

function toggleLogam(jenis) {
    jenisLogam = jenis;
    const label = document.getElementById('labelBerat');
    if (label) {
        label.innerText = jenis === 'emas' ? 'Berat Emas (gram):' : 'Berat Perak (gram):';
    }
}

function getKalkulatorEmas() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">💎</span> ZAKAT EMAS & PERAK
            </h3>
            
            <div style="display: flex; gap: 20px; margin-bottom: 15px;">
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="radio" name="jenisLogam" value="emas" checked onclick="toggleLogam('emas')"> Emas
                </label>
                <label style="display: flex; align-items: center; gap: 5px;">
                    <input type="radio" name="jenisLogam" value="perak" onclick="toggleLogam('perak')"> Perak
                </label>
            </div>
            
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Nisab Emas:</strong> 85 gram | <strong>Nisab Perak:</strong> 595 gram</p>
                <p><strong>Kadar Zakat:</strong> 2,5% | <strong>Haul:</strong> 1 tahun</p>
            </div>
            
            <div class="form-group">
                <label id="labelBerat">Berat Emas (gram):</label>
                <input type="number" id="logamBerat" class="kalkulator-input" placeholder="Contoh: 100">
            </div>
            <div class="form-group">
                <label>Harga per Gram (Rp):</label>
                <input type="number" id="logamHarga" class="kalkulator-input" placeholder="Contoh: 1000000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungLogam()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearLogam()">Clear</button>
                <button class="btn btn-info" onclick="showInfoLogam()">Info</button>
            </div>
            
            <div id="hasilLogam" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungLogam() {
    const berat = document.getElementById('logamBerat')?.value;
    const harga = document.getElementById('logamHarga')?.value;

    if (!berat || !harga) {
        alert('Harap isi semua field');
        return;
    }

    const beratNum = parseFloat(berat);
    const hargaNum = parseFloat(harga);
    const nisab = jenisLogam === 'emas' ? 85 : 595;

    if (beratNum < nisab) {
        document.getElementById('hasilLogam').innerHTML = `
            <div class="hasil-card" style="border-left-color: #E67E22;">
                <p>${jenisLogam === 'emas' ? 'Emas' : 'Perak'} Anda ${beratNum} gram belum mencapai nisab (${nisab} gram).</p>
            </div>
        `;
        return;
    }

    const zakatGram = beratNum * 0.025;
    const zakatRupiah = zakatGram * hargaNum;

    document.getElementById('hasilLogam').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat ${jenisLogam === 'emas' ? 'Emas' : 'Perak'}</h4>
            <div class="hasil-row">
                <span class="hasil-label">Zakat (berat):</span>
                <span class="hasil-value">${zakatGram.toFixed(2)} gram</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Zakat (uang):</span>
                <span class="hasil-value">Rp ${zakatRupiah.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function clearLogam() {
    document.getElementById('logamBerat').value = '';
    document.getElementById('logamHarga').value = '';
    document.getElementById('hasilLogam').innerHTML = '';
}

function showInfoLogam() {
    alert('📌 INFORMASI ZAKAT LOGAM MULIA\n\nNisab Emas: 85 gram\nNisab Perak: 595 gram\nKadar Zakat: 2,5%\nHaul: 1 tahun\n\nZakat dihitung dari total kepemilikan selama 1 tahun.');
}

// ========== 3. KALKULATOR ZAKAT MAAL ==========
function getKalkulatorMaal() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">💵</span> ZAKAT MAAL
            </h3>
            
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Nisab:</strong> 85 gram emas per tahun | <strong>Kadar:</strong> 2,5%</p>
                <p>Bisa dibayar bulanan jika mencapai nisab bulanan (1/12 dari 85 gram).</p>
            </div>
            
            <div class="form-group">
                <label>Penghasilan per Bulan (Rp):</label>
                <input type="number" id="penghasilanPokok" class="kalkulator-input" placeholder="Contoh: 8000000">
            </div>
            <div class="form-group">
                <label>Penghasilan Tambahan (opsional):</label>
                <input type="number" id="penghasilanTambahan" class="kalkulator-input" placeholder="Contoh: 2000000">
            </div>
            <div class="form-group">
                <label>Harga Emas per Gram (Rp):</label>
                <input type="number" id="penghasilanEmas" class="kalkulator-input" placeholder="Contoh: 1000000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungPenghasilan()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearPenghasilan()">Clear</button>
            </div>
            
            <div id="hasilPenghasilan" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungPenghasilan() {
    const pokok = document.getElementById('penghasilanPokok')?.value;
    const tambahan = document.getElementById('penghasilanTambahan')?.value || 0;
    const hargaEmas = document.getElementById('penghasilanEmas')?.value;

    if (!pokok || !hargaEmas) {
        alert('Harap isi penghasilan pokok dan harga emas');
        return;
    }

    const totalPenghasilan = parseFloat(pokok) + parseFloat(tambahan);
    const nisabBulanan = (85 * parseFloat(hargaEmas)) / 12;

    if (totalPenghasilan < nisabBulanan) {
        document.getElementById('hasilPenghasilan').innerHTML = `
            <div class="hasil-card" style="border-left-color: #E67E22;">
                <p>Penghasilan Rp ${totalPenghasilan.toLocaleString()} belum mencapai nisab bulanan (Rp ${nisabBulanan.toLocaleString()}).</p>
                <p style="margin-top: 10px;">Disarankan untuk mengumpulkan penghasilan selama 1 tahun.</p>
            </div>
        `;
        return;
    }

    const zakat = totalPenghasilan * 0.025;

    document.getElementById('hasilPenghasilan').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Maal(Bulanan)</h4>
            <div class="hasil-row">
                <span class="hasil-label">Penghasilan:</span>
                <span class="hasil-value">Rp ${totalPenghasilan.toLocaleString()}</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Nisab Bulanan:</span>
                <span class="hasil-value">Rp ${nisabBulanan.toLocaleString()}</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Zakat:</span>
                <span class="hasil-value">Rp ${zakat.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function clearPenghasilan() {
    document.getElementById('penghasilanPokok').value = '';
    document.getElementById('penghasilanTambahan').value = '';
    document.getElementById('penghasilanEmas').value = '';
    document.getElementById('hasilPenghasilan').innerHTML = '';
}

// ========== 4. KALKULATOR ZAKAT PERNIAGAAN ==========
function getKalkulatorPerniagaan() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">🏪</span> ZAKAT PERNIAGAAN
            </h3>
            
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Rumus:</strong> 2,5% × (Aset Lancar - Hutang Jangka Pendek)</p>
                <p><strong>Nisab:</strong> 85 gram emas | <strong>Haul:</strong> 1 tahun</p>
            </div>
            
            <div class="form-group">
                <label>Harga Emas per Gram (Rp):</label>
                <input type="number" id="perniagaanEmas" class="kalkulator-input" placeholder="Contoh: 1000000">
            </div>
            <div class="form-group">
                <label>Nilai Aset Lancar/Usaha (Rp):</label>
                <input type="number" id="perniagaanAset" class="kalkulator-input" placeholder="Contoh: 100000000">
            </div>
            <div class="form-group">
                <label>Utang Jangka Pendek (Rp):</label>
                <input type="number" id="perniagaanUtang" class="kalkulator-input" placeholder="Contoh: 20000000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungPerniagaan()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearPerniagaan()">Clear</button>
            </div>
            
            <div id="hasilPerniagaan" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungPerniagaan() {
    const hargaEmas = document.getElementById('perniagaanEmas')?.value;
    const aset = document.getElementById('perniagaanAset')?.value;
    const utang = document.getElementById('perniagaanUtang')?.value || 0;

    if (!hargaEmas || !aset) {
        alert('Harap isi harga emas dan nilai aset');
        return;
    }

    const asetBersih = parseFloat(aset) - parseFloat(utang);
    const nisab = 85 * parseFloat(hargaEmas);

    if (asetBersih < nisab) {
        document.getElementById('hasilPerniagaan').innerHTML = `
            <div class="hasil-card" style="border-left-color: #E67E22;">
                <p>Aset bersih Rp ${asetBersih.toLocaleString()} belum mencapai nisab (Rp ${nisab.toLocaleString()}).</p>
            </div>
        `;
        return;
    }

    const zakat = asetBersih * 0.025;

    document.getElementById('hasilPerniagaan').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Perniagaan</h4>
            <div class="hasil-row">
                <span class="hasil-label">Aset Bersih:</span>
                <span class="hasil-value">Rp ${asetBersih.toLocaleString()}</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Nisab:</span>
                <span class="hasil-value">Rp ${nisab.toLocaleString()}</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Zakat:</span>
                <span class="hasil-value">Rp ${zakat.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function clearPerniagaan() {
    document.getElementById('perniagaanEmas').value = '';
    document.getElementById('perniagaanAset').value = '';
    document.getElementById('perniagaanUtang').value = '';
    document.getElementById('hasilPerniagaan').innerHTML = '';
}

// ========== 5. KALKULATOR ZAKAT TERNAK ==========
let jenisTernak = 'kambing';

function showTernak(jenis) {
    jenisTernak = jenis;
    const container = document.getElementById('ternakContainer');
    if (!container) return;

    if (jenis === 'kambing') container.innerHTML = getFormTernakKambing();
    else if (jenis === 'sapi') container.innerHTML = getFormTernakSapi();
    else if (jenis === 'unta') container.innerHTML = getFormTernakUnta();
}

function getKalkulatorTernak() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">🐄</span> ZAKAT TERNAK
            </h3>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                <button class="btn btn-secondary" onclick="showTernak('kambing')">Kambing/Domba</button>
                <button class="btn btn-secondary" onclick="showTernak('sapi')">Sapi/Kerbau</button>
                <button class="btn btn-secondary" onclick="showTernak('unta')">Unta</button>
            </div>
            
            <div id="ternakContainer">
                ${getFormTernakKambing()}
            </div>
        </div>
    `;
}

function getFormTernakKambing() {
    return `
        <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p><strong>Nisab Kambing/Domba:</strong></p>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>40-120 ekor → zakat 1 ekor (umur 2 tahun)</li>
                <li>121-200 ekor → zakat 2 ekor</li>
                <li>201-300 ekor → zakat 3 ekor</li>
                <li>>301 ekor → setiap kelipatan 100, +1 ekor</li>
            </ul>
        </div>
        
        <div class="form-group">
            <label>Jumlah Kambing/Domba (ekor):</label>
            <input type="number" id="ternakJumlah" class="kalkulator-input" placeholder="Contoh: 50">
        </div>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" onclick="hitungTernak()">Hitung Zakat</button>
            <button class="btn btn-secondary" onclick="clearTernak()">Clear</button>
            <button class="btn btn-info" onclick="showInfoTernak()">Info</button>
        </div>
        
        <div id="hasilTernak" style="margin-top: 20px;"></div>
    `;
}

function getFormTernakSapi() {
    return `
        <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p><strong>Nisab Sapi/Kerbau:</strong></p>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>30-39 ekor → zakat 1 ekor (umur 1 tahun)</li>
                <li>40-59 ekor → zakat 1 ekor (umur 2 tahun)</li>
                <li>60-69 ekor → zakat 2 ekor (umur 1 tahun)</li>
                <li>70-79 ekor → zakat 2 ekor (1+2 tahun)</li>
                <li>>120 ekor → setiap 30: 1 ekor umur 1 th, setiap 40: 1 ekor umur 2 th</li>
            </ul>
        </div>
        
        <div class="form-group">
            <label>Jumlah Sapi/Kerbau (ekor):</label>
            <input type="number" id="ternakJumlah" class="kalkulator-input" placeholder="Contoh: 35">
        </div>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" onclick="hitungTernak()">Hitung Zakat</button>
            <button class="btn btn-secondary" onclick="clearTernak()">Clear</button>
            <button class="btn btn-info" onclick="showInfoTernak()">Info</button>
        </div>
        
        <div id="hasilTernak" style="margin-top: 20px;"></div>
    `;
}

function getFormTernakUnta() {
    return `
        <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p><strong>Nisab Unta:</strong></p>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>5-9 ekor → zakat 1 ekor kambing</li>
                <li>10-14 ekor → zakat 2 ekor kambing</li>
                <li>15-19 ekor → zakat 3 ekor kambing</li>
                <li>20-24 ekor → zakat 4 ekor kambing</li>
                <li>25-35 ekor → zakat 1 ekor unta betina umur 1 tahun</li>
            </ul>
        </div>
        
        <div class="form-group">
            <label>Jumlah Unta (ekor):</label>
            <input type="number" id="ternakJumlah" class="kalkulator-input" placeholder="Contoh: 10">
        </div>
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" onclick="hitungTernak()">Hitung Zakat</button>
            <button class="btn btn-secondary" onclick="clearTernak()">Clear</button>
            <button class="btn btn-info" onclick="showInfoTernak()">Info</button>
        </div>
        
        <div id="hasilTernak" style="margin-top: 20px;"></div>
    `;
}

function hitungTernak() {
    const jumlah = document.getElementById('ternakJumlah')?.value;

    if (!jumlah) {
        alert('Harap isi jumlah ternak');
        return;
    }

    const jml = parseInt(jumlah);
    let hasil = '';

    if (jenisTernak === 'kambing') {
        if (jml < 40) hasil = 'Belum mencapai nisab (minimal 40 ekor)';
        else if (jml <= 120) hasil = 'Zakat: 1 ekor kambing umur 2 tahun';
        else if (jml <= 200) hasil = 'Zakat: 2 ekor kambing';
        else if (jml <= 300) hasil = 'Zakat: 3 ekor kambing';
        else {
            const tambahan = Math.floor((jml - 300) / 100);
            hasil = `Zakat: ${3 + tambahan} ekor kambing`;
        }
    }
    else if (jenisTernak === 'sapi') {
        if (jml < 30) hasil = 'Belum mencapai nisab (minimal 30 ekor)';
        else if (jml <= 39) hasil = 'Zakat: 1 ekor sapi umur 1 tahun';
        else if (jml <= 59) hasil = 'Zakat: 1 ekor sapi umur 2 tahun';
        else if (jml <= 69) hasil = 'Zakat: 2 ekor sapi umur 1 tahun';
        else if (jml <= 79) hasil = 'Zakat: 2 ekor sapi (1 umur 1 th + 1 umur 2 th)';
        else if (jml <= 89) hasil = 'Zakat: 2 ekor sapi umur 2 tahun';
        else if (jml <= 99) hasil = 'Zakat: 3 ekor sapi umur 1 tahun';
        else if (jml <= 109) hasil = 'Zakat: 3 ekor sapi (1 umur 1 th + 2 umur 2 th)';
        else if (jml <= 119) hasil = 'Zakat: 3 ekor sapi (2 umur 1 th + 1 umur 2 th)';
        else {
            hasil = 'Zakat: setiap 30 ekor: 1 ekor umur 1 th, setiap 40 ekor: 1 ekor umur 2 th';
        }
    }
    else if (jenisTernak === 'unta') {
        if (jml < 5) hasil = 'Belum mencapai nisab (minimal 5 ekor)';
        else if (jml <= 9) hasil = 'Zakat: 1 ekor kambing';
        else if (jml <= 14) hasil = 'Zakat: 2 ekor kambing';
        else if (jml <= 19) hasil = 'Zakat: 3 ekor kambing';
        else if (jml <= 24) hasil = 'Zakat: 4 ekor kambing';
        else if (jml <= 35) hasil = 'Zakat: 1 ekor unta betina umur 1 tahun';
        else if (jml <= 45) hasil = 'Zakat: 1 ekor unta betina umur 2 tahun';
        else if (jml <= 60) hasil = 'Zakat: 1 ekor unta betina umur 3 tahun';
        else if (jml <= 75) hasil = 'Zakat: 1 ekor unta betina umur 4 tahun';
        else if (jml <= 90) hasil = 'Zakat: 2 ekor unta betina umur 2 tahun';
        else if (jml <= 120) hasil = 'Zakat: 2 ekor unta betina umur 3 tahun';
        else {
            hasil = 'Zakat: setiap kelipatan 40: 1 ekor unta umur 2 th, setiap kelipatan 50: 1 ekor unta umur 3 th';
        }
    }

    document.getElementById('hasilTernak').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Ternak</h4>
            <p>${hasil}</p>
        </div>
    `;
}

function clearTernak() {
    document.getElementById('ternakJumlah').value = '';
    document.getElementById('hasilTernak').innerHTML = '';
}

function showInfoTernak() {
    alert('📌 INFORMASI ZAKAT TERNAK\n\nKAMBING/DOMBA:\n40-120 ekor = 1 ekor\n121-200 ekor = 2 ekor\n201-300 ekor = 3 ekor\n>301 ekor = setiap +100 ekor, +1 ekor\n\nSAPI/KERBAU:\n30-39 ekor = 1 ekor (umur 1 th)\n40-59 ekor = 1 ekor (umur 2 th)\n\nUNTA:\n5-9 ekor = 1 ekor kambing\n10-14 ekor = 2 ekor kambing');
}

// ========== 6. KALKULATOR ZAKAT PERTANIAN ==========
function getKalkulatorPertanian() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">🌾</span> ZAKAT PERTANIAN
            </h3>
            
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Nisab:</strong> 815 kg beras | <strong>Kadar:</strong> 5% (irigasi) atau 10% (tadah hujan)</p>
            </div>
            
            <div class="form-group">
                <label>Jenis Tanaman:</label>
                <select id="pertanianJenis" class="kalkulator-input">
                    <option value="beras">Beras Putih</option>
                    <option value="kacang-hijau">Kacang Hijau</option>
                    <option value="kacang-tunggak">Kacang Tunggak</option>
                    <option value="padi-gabah">Padi Gabah Kering</option>
                    <option value="padi-kretek">Padi Kretek Gabah Kering</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Sistem Irigasi:</label>
                <select id="pertanianIrigasi" class="kalkulator-input">
                    <option value="berbayar">Irigasi Berbayar (5%)</option>
                    <option value="tadah-hujan">Tadah Hujan (10%)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Jumlah Hasil Panen (Kg):</label>
                <input type="number" id="pertanianJumlah" class="kalkulator-input" placeholder="Contoh: 1000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungPertanian()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearPertanian()">Clear</button>
                <button class="btn btn-info" onclick="showInfoPertanian()">Info</button>
            </div>
            
            <div id="hasilPertanian" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungPertanian() {
    const jenis = document.getElementById('pertanianJenis')?.value;
    const irigasi = document.getElementById('pertanianIrigasi')?.value;
    const jumlah = document.getElementById('pertanianJumlah')?.value;

    if (!jumlah) {
        alert('Harap isi jumlah hasil panen');
        return;
    }

    const jml = parseFloat(jumlah);
    let nisab = 0;

    switch (jenis) {
        case 'beras': nisab = 815.758; break;
        case 'kacang-hijau': nisab = 780.036; break;
        case 'kacang-tunggak': nisab = 756.697; break;
        case 'padi-gabah': nisab = 1631.516; break;
        case 'padi-kretek': nisab = 1323.132; break;
    }

    if (jml < nisab) {
        document.getElementById('hasilPertanian').innerHTML = `
            <div class="hasil-card" style="border-left-color: #E67E22;">
                <p>Hasil panen ${jml} kg belum mencapai nisab (${nisab.toFixed(3)} kg).</p>
            </div>
        `;
        return;
    }

    const kadar = irigasi === 'berbayar' ? 0.05 : 0.10;
    const zakat = jml * kadar;

    document.getElementById('hasilPertanian').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Pertanian</h4>
            <div class="hasil-row">
                <span class="hasil-label">Hasil Panen:</span>
                <span class="hasil-value">${jml.toFixed(2)} kg</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Nisab:</span>
                <span class="hasil-value">${nisab.toFixed(2)} kg</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Zakat:</span>
                <span class="hasil-value">${zakat.toFixed(2)} kg</span>
            </div>
            <p style="margin-top: 10px; font-style: italic;">Zakat pertanian sebesar ${irigasi === 'berbayar' ? '5%' : '10%'} dari hasil panen.</p>
        </div>
    `;
}

function clearPertanian() {
    document.getElementById('pertanianJenis').value = 'beras';
    document.getElementById('pertanianIrigasi').value = 'berbayar';
    document.getElementById('pertanianJumlah').value = '';
    document.getElementById('hasilPertanian').innerHTML = '';
}

function showInfoPertanian() {
    alert('📌 INFORMASI ZAKAT PERTANIAN\n\nNISAB:\n- Beras putih: 815,758 kg\n- Kacang hijau: 780,036 kg\n- Kacang tunggak: 756,697 kg\n- Padi gabah kering: 1.631,516 kg\n- Padi kretek: 1.323,132 kg\n\nKADAR ZAKAT:\n- Irigasi berbayar: 5%\n- Tadah hujan: 10%');
}

// ========== 7. KALKULATOR ZAKAT RIKAZ ==========
function getKalkulatorRikaz() {
    return `
        <div class="popup-section">
            <h3 style="color: var(--hijau-tua); display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 30px;">⚱️</span> ZAKAT RIKAZ (HARTA KARUN)
            </h3>
            
            <div style="background: var(--abu-muda); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p><strong>Ketentuan:</strong> Zakat rikaz adalah 20% dari nilai harta karun yang ditemukan.</p>
                <p><strong>Dalil:</strong> HR. Abu Hurairah - "Barang tambang tidak dikenakan ganti rugi, dan pada harta rikaz wajib dikeluarkan seperlima (20%)."</p>
                <p><strong>Catatan:</strong> Tidak ada nisab dan haul, langsung dikeluarkan saat menemukan.</p>
            </div>
            
            <div class="form-group">
                <label>Nilai Harta Karun (Rp):</label>
                <input type="number" id="rikazNilai" class="kalkulator-input" placeholder="Contoh: 100000000">
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="hitungRikaz()">Hitung Zakat</button>
                <button class="btn btn-secondary" onclick="clearRikaz()">Clear</button>
            </div>
            
            <div id="hasilRikaz" style="margin-top: 20px;"></div>
        </div>
    `;
}

function hitungRikaz() {
    const nilai = document.getElementById('rikazNilai')?.value;

    if (!nilai) {
        alert('Harap isi nilai harta karun');
        return;
    }

    const zakat = parseFloat(nilai) * 0.20; // 20%

    document.getElementById('hasilRikaz').innerHTML = `
        <div class="hasil-card">
            <h4 style="color: var(--hijau-tua); margin-bottom: 10px;">📊 Hasil Zakat Rikaz</h4>
            <div class="hasil-row">
                <span class="hasil-label">Nilai Harta:</span>
                <span class="hasil-value">Rp ${parseFloat(nilai).toLocaleString()}</span>
            </div>
            <div class="hasil-row">
                <span class="hasil-label">Zakat (20%):</span>
                <span class="hasil-value">Rp ${zakat.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function clearRikaz() {
    document.getElementById('rikazNilai').value = '';
    document.getElementById('hasilRikaz').innerHTML = '';
}

// ========== FUNGSI UNTUK AUDIO PENERIMA ZAKAT ==========
function restartAudioZakat() {
    const audio = document.getElementById('audio-penerima-zakat');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.log('Error:', e);
            document.getElementById('audio-status').style.display = 'block';
            document.getElementById('audio-status').innerHTML = '❌ File audio tidak ditemukan!';
        });
    }
}

// Cek status audio saat halaman dimuat
window.addEventListener('load', function () {
    // Cek apakah audio ada
    setTimeout(() => {
        const audio = document.getElementById('audio-penerima-zakat');
        if (audio) {
            audio.addEventListener('error', function () {
                const status = document.getElementById('audio-status');
                if (status) {
                    status.style.display = 'block';
                    status.innerHTML = '⚠️ File audio tidak ditemukan. Pastikan file "8-penerima-zakat.mp3" ada di folder audio/';
                }
            });
        }
    }, 1000);
});
// ========== BIODATA DENGAN MODAL ==========
function showBiodataPopup() {
    // Cek apakah biodata sudah ada
    const biodata = localStorage.getItem('sultanBiodata');
    if (biodata) {
        // Biodata sudah ada, langsung tampilkan main menu
        const mainMenu = document.getElementById('main-menu-section');
        if (mainMenu) {
            mainMenu.style.display = 'block';
        }
        // Update greeting dan header
        updateGreetingMessage();
        updateHeaderDisplay();
        return;
    }

    // Biodata belum ada, tampilkan modal
    const modal = document.getElementById('biodata-modal');
    if (modal) modal.style.display = 'block';
}

function closeBiodataModal() {
    const modal = document.getElementById('biodata-modal');
    if (modal) modal.style.display = 'none';
    // Bersihkan input untuk penggunaan berikutnya
    document.getElementById('biodata-name').value = '';
    document.getElementById('biodata-class').value = '';
    document.getElementById('biodata-number').value = '';
}

// Fungsi untuk menampilkan tombol hapus data (opsional)
function showResetButton() {
    // Cek apakah tombol sudah ada, jika belum buat
    let resetBtn = document.getElementById('reset-data-btn');
    if (!resetBtn) {
        resetBtn = document.createElement('button');
        resetBtn.id = 'reset-data-btn';
        resetBtn.innerText = '🗑️ Hapus Data Saya';
        resetBtn.className = 'btn btn-secondary';
        resetBtn.style.position = 'fixed';
        resetBtn.style.bottom = '80px';
        resetBtn.style.right = '20px';
        resetBtn.style.zIndex = '9999';
        resetBtn.style.padding = '8px 15px';
        resetBtn.style.borderRadius = '25px';
        resetBtn.onclick = function () {
            if (confirm('Yakin ingin menghapus data? Aplikasi akan memulai ulang.')) {
                localStorage.removeItem('sultan_biodata');
                location.reload(); // reload untuk memulai ulang proses biodata
            }
        };
        document.body.appendChild(resetBtn);
    }
}

// Pastikan saat peta ditampilkan, tombol reset juga muncul jika data ada
function showMap() {
    document.getElementById('main-menu-section').style.display = 'block';
    moveSultanToNode(0);
    document.querySelectorAll('.menu-node').forEach((node, idx) => {
        if (idx === 0) node.classList.add('active');
        else node.classList.remove('active');
    });
    // Jika sudah ada biodata, tampilkan tombol reset
    if (localStorage.getItem('sultan_biodata')) {
        showResetButton();
    }
}
// ========== INISIALISASI ==========
window.onload = function () {
    console.log('🚀 Aplikasi Sultan Nyasar dimulai');

    // Reset chat
    chatIndex = 0;

    // Bersihkan chat messages
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }

    // Reset progress bar
    const progressBar = document.getElementById('chat-progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }

    // ===== PASANG EVENT LISTENER KE TOMBOL CHAT =====
    const nextBtn = document.getElementById('next-chat-btn');
    console.log('🔍 Tombol chat:', nextBtn);

    if (nextBtn) {
        // Hapus semua event listener lama
        nextBtn.onclick = null;

        // Pasang event listener baru
        nextBtn.onclick = function (e) {
            e.preventDefault();
            console.log('👆 Tombol chat diklik!');
            nextChat();
            return false;
        };

        console.log('✅ Event listener tombol chat terpasang');
    } else {
        console.error('❌ Tombol dengan ID "next-chat-btn" tidak ditemukan!');
    }

    // Mulai chat pertama setelah 1 detik
    setTimeout(() => {
        console.log('⏳ Memulai chat pertama...');
        if (typeof nextChat === 'function') {
            nextChat();
        } else {
            console.error('❌ Fungsi nextChat tidak ditemukan!');
        }
    }, 1000);
};


// ========== FUNGSI GLOBAL ==========
window.nextChat = nextChat;
window.showPopup = showPopup;
window.closePopup = closePopup;
window.showKalkulator = showKalkulator;
window.hitungFitrah = hitungFitrah;
window.clearFitrah = clearFitrah;
window.toggleLogam = toggleLogam;
window.hitungLogam = hitungLogam;
window.clearLogam = clearLogam;
window.showInfoLogam = showInfoLogam;
window.hitungPenghasilan = hitungPenghasilan;
window.clearPenghasilan = clearPenghasilan;
window.hitungPerniagaan = hitungPerniagaan;
window.clearPerniagaan = clearPerniagaan;
window.showTernak = showTernak;
window.hitungTernak = hitungTernak;
window.clearTernak = clearTernak;
window.showInfoTernak = showInfoTernak;
window.hitungPertanian = hitungPertanian;
window.clearPertanian = clearPertanian;
window.showInfoPertanian = showInfoPertanian;
window.hitungRikaz = hitungRikaz;
window.clearRikaz = clearRikaz;
localStorage.removeItem('sultan_biodata');
window.openGameMenu = openGameMenu;
window.backToMainMenu = backToMainMenu;
window.showGameMode = showGameMode;
window.selectGameModeFromPopup = selectGameModeFromPopup;
window.gameSubmenuHandler = gameSubmenuHandler;
window.closeGameSubmenu = closeGameSubmenu;
window.gameNextQuestion = gameNextQuestion;
window.gamePrevQuestion = gamePrevQuestion;
window.pickTrueFalse = pickTrueFalse;
window.playClickSound = playClickSound;
window.playGameMusic = playGameMusic;
window.stopGameMusic = stopGameMusic;

function playClickSound() {
    const audio = document.getElementById('click-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('click sound error', e));
    } else {
        playSound('click'); // fallback ke sistem audio lama
    }
}

function playGameMusic() {
    if (!gameMusic) {
        gameMusic = document.getElementById('game-music');
    }
    if (gameMusic && !isGameMusicPlaying && suaraAktif) {
        if (isBacksoundPlaying) {
            stopBacksound();
        }
        gameMusic.volume = 0.4;
        gameMusic.loop = true;
        gameMusic.play()
            .then(() => {
                isGameMusicPlaying = true;
                console.log('Game music dimulai');
            })
            .catch(e => console.log('Game music error:', e));
    }
}

function stopGameMusic() {
    if (!gameMusic) {
        gameMusic = document.getElementById('game-music');
    }
    if (gameMusic && isGameMusicPlaying) {
        gameMusic.pause();
        gameMusic.currentTime = 0;
        isGameMusicPlaying = false;
        console.log('Game music dihentikan');
    }
}

function openGameMenu() {
    playClickSound();
    stopBacksound();           // matikan backsound utama

    // Reset semua overlay/popup
    resetAllOverlayState();
    closeGameSubmenu(false);

    // Reset tampilan game state
    const mainMenu = document.getElementById('main-menu-section');
    if (mainMenu) mainMenu.style.display = 'none';

    const gameSection = document.getElementById('game-section');
    if (gameSection) gameSection.style.display = 'block';

    const gameWelcome = document.getElementById('game-welcome');
    if (gameWelcome) gameWelcome.style.display = 'block';

    const gameNav = document.getElementById('game-nav');
    if (gameNav) gameNav.style.display = 'none';

    const gameContent = document.getElementById('game-content');
    if (gameContent) gameContent.innerHTML = '';

    showGameSubmenu();         // tampilkan popup submenu game
}

function backToMainMenu() {
    playClickSound();
    stopGameMusic();
    playBacksound(); // hidupkan backsound utama

    // Tutup semua modal/popup
    closePopup();
    closeGameSubmenu(false);

    // Sembunyikan game section, tampilkan main menu
    const gameSection = document.getElementById('game-section');
    if (gameSection) gameSection.style.display = 'none';
    const mainMenu = document.getElementById('main-menu-section');
    if (mainMenu) mainMenu.style.display = 'block';

    // Tutup popup jika masih terbuka
    const popup = document.getElementById('game-submenu-popup');
    if (popup) popup.style.display = 'none';
}

function showGameSubmenu() {
    const popup = document.getElementById('game-submenu-popup');

    if (popup) popup.style.display = 'block';

    // Pasang event listener ke submenu nodes (jaga agar tidak dobel)
    const nodes = document.querySelectorAll('.game-submenu-node');
    nodes.forEach(node => {
        node.removeEventListener('click', gameSubmenuHandler);
        node.addEventListener('click', gameSubmenuHandler);
    });

    // Pastikan musik game dimulai
    playGameMusic();
}

function closeGameSubmenu(showMain = true) {
    const popup = document.getElementById('game-submenu-popup');
    if (popup) popup.style.display = 'none';

    const popupOverlay = document.getElementById('popup-overlay');
    const popupContainer = document.getElementById('popup-container');
    if (popupOverlay) {
        popupOverlay.style.display = 'none';
        popupOverlay.style.visibility = 'hidden';
    }
    if (popupContainer) {
        popupContainer.style.display = 'none';
        popupContainer.style.visibility = 'hidden';
    }

    if (showMain) {
        const mainMenu = document.getElementById('main-menu-section');
        if (mainMenu) mainMenu.style.display = 'block';
        stopGameMusic();
        playBacksound();
    }
}

function updateScoreDisplay() {
    let scoreDisplay = document.getElementById('game-score-display');
    if (!scoreDisplay) {
        scoreDisplay = document.querySelector('#popup-content #game-score-display');
    }
    if (scoreDisplay) {
        scoreDisplay.innerText = `Skor: ${gameState.score}`;
        scoreDisplay.style.animation = 'none';
        setTimeout(() => {
            scoreDisplay.style.animation = 'scoreUpdate 0.3s ease';
        }, 10);
    }
}

function showGameMode(mode) {
    console.log('🎮 showGameMode dipanggil dengan mode:', mode);
    selectGameModeFromPopup(mode);
}

function renderGameQuestion() {
    console.log('🎮 renderGameQuestion dipanggil, mode:', gameState.mode, 'current:', gameState.current);
    console.log('📋 gameState:', gameState);

    const gameContent = document.getElementById('game-content');
    const popupContent = document.getElementById('popup-content');
    const target = gameContent || popupContent;
    if (!target) {
        console.error('❌ Element konten game tidak ditemukan!');
        return;
    }

    // ===== VALIDASI STATE GAME =====
    if (!gameState.mode || !gameState.mode.trim()) {
        console.error('❌ Mode game tidak didefinisikan atau kosong');
        target.innerHTML = '<p style="color:red; text-align:center; padding:20px;">Error: Mode game tidak valid.</p>';
        return;
    }
    if (!gameState.questions || gameState.questions.length === 0) {
        console.error('❌ Tidak ada soal untuk mode:', gameState.mode);
        console.log('Questions array:', gameState.questions);
        target.innerHTML = '<p style="color:red; text-align:center; padding:20px;">Error: Tidak ada soal yang dimuat.</p>';
        return;
    }
    if (gameState.current < 0 || gameState.current >= gameState.questions.length) {
        console.error('❌ Indeks soal di luar batas. Current:', gameState.current, 'Total:', gameState.questions.length);
        target.innerHTML = '<p style="color:red; text-align:center; padding:20px;">Error: Indeks soal tidak valid.</p>';
        return;
    }

    const q = gameState.questions[gameState.current];
    if (!q) {
        console.error('❌ Soal current tidak ditemukan pada indeks:', gameState.current);
        target.innerHTML = '<p style="color:red; text-align:center; padding:20px;">Error: Soal tidak ditemukan.</p>';
        return;
    }
    console.log('✅ Soal aktif (indeks ' + gameState.current + '):', q);

    // ===== ENSURE GAME SECTION OR POPUP FULLY VISIBLE =====
    const popupContainer = document.getElementById('popup-container');
    const popupOverlay = document.getElementById('popup-overlay');

    if (gameContent) {
        // We are using game section, no generic popup overlay needed
        if (popupContainer) {
            popupContainer.style.display = 'none';
            popupContainer.style.visibility = 'hidden';
        }
        if (popupOverlay) {
            popupOverlay.style.display = 'none';
            popupOverlay.style.visibility = 'hidden';
        }
    } else {
        // Legacy popup flow path
        if (popupContainer) {
            popupContainer.style.display = 'block';
            popupContainer.style.visibility = 'visible';
            popupContainer.style.opacity = '1';
            popupContainer.style.zIndex = '3001';
        }
        if (popupOverlay) {
            popupOverlay.style.display = 'block';
            popupOverlay.style.visibility = 'visible';
            popupOverlay.style.opacity = '1';
            popupOverlay.style.zIndex = '3000';
        }
    }

    // Pastikan area target terlihat dan bersih dengan CSS yang tepat
    target.style.display = 'block';
    target.style.visibility = 'visible';
    target.style.opacity = '1';
    target.style.background = 'white';
    target.style.color = '#1B4D3E';
    target.style.maxHeight = 'calc(80vh - 100px)'; // Leave room for header
    target.style.overflowY = 'auto';

    if (gameState.mode === 'dragdrop') {
        console.log('🎯 Rendering DragDrop, question:', q);
        // Gabungkan semua item dan acak
        const allItems = [...q.correct, ...q.wrong];
        const shuffled = shuffleArray(allItems);

        target.innerHTML = `
            <div id="question-wrapper" style="opacity: 1 !important; visibility: visible !important; display: block !important; background: white !important; color: #1B4D3E !important;">
                <div id="game-score-display" style="font-size: 18px; font-weight: bold; color: #1B4D3E; margin-bottom: 10px;">Skor: ${gameState.score}</div>
                <h3 style="color: #1B4D3E !important; background: white !important;">${q.title} (${gameState.current + 1}/${gameState.questions.length})</h3>
                <p style="color: #1B4D3E !important; background: white !important;">${q.description}</p>
                <div style="display:flex; gap:20px; flex-wrap:wrap; margin:20px 0;">
                    <div class="drop-zone" data-zone="yes" style="flex:1; min-width:200px; background:#f9f9f9; border:2px dashed #1B4D3E; border-radius:15px; padding:15px;">
                        <h4 style="margin-bottom:10px;">✅ ${q.title}</h4>
                        <div class="dropped-items" id="yes-zone-items"></div>
                    </div>
                    <div class="drop-zone" data-zone="no" style="flex:1; min-width:200px; background:#f9f9f9; border:2px dashed #1B4D3E; border-radius:15px; padding:15px;">
                        <h4 style="margin-bottom:10px;">❌ Bukan ${q.title}</h4>
                        <div class="dropped-items" id="no-zone-items"></div>
                    </div>
                </div>
                <div id="drag-items" style="display:flex; flex-wrap:wrap; gap:8px; padding:10px; background:#fff; border-radius:12px; margin-bottom:15px;">
                    ${shuffled.map(item => `<div class="drag-item" draggable="true" data-correct="${q.correct.includes(item)}" data-item="${item}">${item}</div>`).join('')}
                </div>
                <div id="drag-feedback" class="feedback"></div>
                <div style="margin-top:12px; font-size:14px;">Seret item ke kolom yang sesuai, lalu klik Next.</div>
                <div style="display:flex; gap:10px; justify-content:center; margin-top:20px;">
                    <button class="btn btn-secondary" onclick="playClickSound(); gamePrevQuestion()">Previous</button>
                    <button class="btn btn-primary" id="game-next-btn" onclick="playClickSound(); gameNextQuestion()">Next</button>
                </div>
            </div>
        `;

        // Reset next button - harus disabled sampai semua item dipindahkan
        setTimeout(() => {
            const nextBtn = document.getElementById('game-next-btn');
            if (nextBtn) {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.6';
            }
        }, 10);

        // Pasang event listener drag & drop
        attachDragDropListeners();
    }
    else if (gameState.mode === 'truefalse') {
        console.log('🎯 Rendering True/False, question:', q);
        target.innerHTML = `
            <div id="question-wrapper" style="opacity: 1 !important; visibility: visible !important; display: block !important; background: white !important; color: #1B4D3E !important;">
                <div id="game-score-display" style="font-size: 18px; font-weight: bold; color: #1B4D3E; margin-bottom: 10px;">Skor: ${gameState.score}</div>
                <h3 style="color: #1B4D3E !important; background: white !important;">True or False (${gameState.current + 1}/${gameState.questions.length})</h3>
                <p style="font-size:20px; margin:25px 0; color: #1B4D3E !important; background: white !important;">${q.text}</p>
                <div style="display:flex; gap:15px; justify-content:center;">
                    <button class="btn btn-primary" id="tf-true-btn">✅ Benar</button>
                    <button class="btn btn-secondary" id="tf-false-btn">❌ Salah</button>
                </div>
                <div id="tf-feedback" style="margin-top:20px; font-weight:bold;"></div>
                <div style="display:flex; gap:10px; justify-content:center; margin-top:20px;">
                    <button class="btn btn-secondary" onclick="playClickSound(); gamePrevQuestion()">Previous</button>
                    <button class="btn btn-primary" id="game-next-btn" onclick="playClickSound(); gameNextQuestion()" disabled style="opacity:0.6;">Next</button>
                </div>
            </div>
        `;

        // Pasang event listener tombol dengan delay untuk memastikan DOM sudah siap
        setTimeout(() => {
            const trueBtn = document.getElementById('tf-true-btn');
            const falseBtn = document.getElementById('tf-false-btn');

            if (trueBtn) {
                trueBtn.onclick = null;
                trueBtn.onclick = function () { pickTrueFalse(true); };
                console.log('✅ Event listener untuk tombol Benar terpasang');
            } else {
                console.error('❌ Tombol Benar tidak ditemukan');
            }

            if (falseBtn) {
                falseBtn.onclick = null;
                falseBtn.onclick = function () { pickTrueFalse(false); };
                console.log('✅ Event listener untuk tombol Salah terpasang');
            } else {
                console.error('❌ Tombol Salah tidak ditemukan');
            }
        }, 10);
    }

    // Optional: scroll ke konten agar terlihat
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log('✅ Rendering selesai, soal ditampilkan dengan HTML:', target.innerHTML.substring(0, 200) + '...');
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    draggedItem = ev.target;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const targetZone = ev.target.closest('.drop-zone');
    if (targetZone) {
        const dropArea = targetZone.querySelector('.dropped-items');
        dropArea.appendChild(draggedItem);
    }
}


function attachDragDropListeners() {
    console.log('🔗 Memasang drag-drop listeners...');
    const dragItems = document.querySelectorAll('#drag-items .drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');

    if (dragItems.length === 0) {
        console.warn('⚠️ Tidak ada drag items ditemukan');
    }
    if (dropZones.length === 0) {
        console.warn('⚠️ Tidak ada drop zones ditemukan');
    }

    dragItems.forEach(item => {
        // Hapus listener lama
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        // Pasang listener baru
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
        // Hapus listener lama
        zone.removeEventListener('dragover', handleDragOver);
        zone.removeEventListener('dragleave', handleDragLeave);
        zone.removeEventListener('drop', handleDrop);
        // Pasang listener baru
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    console.log('✅ Drag-drop listeners dipasang untuk', dragItems.length, 'items dan', dropZones.length, 'zones');
}

let draggedItem = null;

function handleDragStart(e) {
    draggedItem = this;
    e.dataTransfer.setData('text/plain', this.getAttribute('data-item'));
    this.classList.add('dragging');
}

function handleDragEnd(e) {
    if (draggedItem) draggedItem.classList.remove('dragging');
    draggedItem = null;
    document.querySelectorAll('.drop-zone').forEach(zone => zone.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    const itemText = e.dataTransfer.getData('text/plain');
    if (!draggedItem) return;

    if (draggedItem.parentElement.id !== 'drag-items') {
        showDragFeedback("Item sudah ditempatkan, tidak bisa dipindah lagi!", false);
        return;
    }

    // Tentukan zona tujuan (yes atau no)
    const targetZone = this.querySelector('.dropped-items');
    const newItem = draggedItem.cloneNode(true);
    newItem.draggable = false;
    newItem.classList.remove('dragging');
    targetZone.appendChild(newItem);
    draggedItem.remove();

    const category = this.getAttribute('data-zone');
    const isCorrect = (category === 'yes' && newItem.getAttribute('data-correct') === 'true') ||
        (category === 'no' && newItem.getAttribute('data-correct') === 'false');

    if (!isCorrect) {
        showDragFeedback("Item ini tidak sesuai kategori! Coba seret ke tempat lain. 😊", false);
        const container = document.getElementById('drag-items');
        const oldItem = draggedItem.cloneNode(true);
        oldItem.draggable = true;
        oldItem.addEventListener('dragstart', handleDragStart);
        oldItem.addEventListener('dragend', handleDragEnd);
        container.appendChild(oldItem);
        targetZone.removeChild(newItem);
    } else {
        newItem.style.backgroundColor = '#e0f7e0';
        showDragFeedback("Benar! 👍", true);
    }

    const remaining = document.querySelectorAll('#drag-items .drag-item').length;
    const nextBtn = document.getElementById('game-next-btn');
    if (remaining === 0) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

function showDragFeedback(msg, isCorrect) {
    const feedbackDiv = document.getElementById('drag-feedback');
    feedbackDiv.innerText = msg;
    feedbackDiv.style.color = isCorrect ? '#28a745' : '#dc3545';
    if (isCorrect) createConfetti();
    else {
        const container = document.querySelector('#game-content');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
    setTimeout(() => feedbackDiv.innerText = '', 1500);
}

function gameNextQuestion() {
    if (gameState.mode === 'dragdrop') {
        // Evaluasi jawaban drag-drop
        const q = gameState.questions[gameState.current];

        // Hitung item yang benar
        const yesZone = document.getElementById('yes-zone-items');
        const noZone = document.getElementById('no-zone-items');

        const itemsInYes = yesZone ? Array.from(yesZone.querySelectorAll('.drag-item')).map(el => el.getAttribute('data-item')) : [];
        const itemsInNo = noZone ? Array.from(noZone.querySelectorAll('.drag-item')).map(el => el.getAttribute('data-item')) : [];

        // Validasi jawaban
        let correctCount = 0;

        // Check items di "YES" zone
        itemsInYes.forEach(item => {
            if (q.correct.includes(item)) {
                correctCount++;
            }
        });

        // Check items di "NO" zone
        itemsInNo.forEach(item => {
            if (q.wrong.includes(item)) {
                correctCount++;
            }
        });

        const totalExpected = q.correct.length + q.wrong.length;
        const scoreThis = (correctCount === totalExpected && itemsInYes.length === q.correct.length) ? 20 : 0;

        gameState.perQuestion[gameState.current] = scoreThis;
        gameState.score = gameState.perQuestion.reduce((a, b) => a + (b || 0), 0);
        updateScoreDisplay();

        if (gameState.current + 1 < gameState.questions.length) {
            gameState.current++;
            renderGameQuestion();
        } else {
            endGame();
        }
    }
    else if (gameState.mode === 'truefalse') {
        // Pastikan sudah dijawab
        if (!gameState.answered[gameState.current]) {
            alert('Jawab dulu ya!');
            return;
        }
        if (gameState.current + 1 < gameState.questions.length) {
            gameState.current++;
            renderGameQuestion();
        } else {
            endGame();
        }
    }
}

function gamePrevQuestion() {
    if (gameState.current > 0) {
        gameState.current--;
        renderGameQuestion();
    }
}

function endGame() {
    const content = document.getElementById('popup-content');
    let message = '';
    if (gameState.mode === 'dragdrop') {
        const maxScore = gameState.questions.length * 20;
        message = `
            <div style="text-align:center;">
                <h2>🏆 Hasil Drag and Drop 🏆</h2>
                <p style="font-size:24px;">Skor kamu: ${gameState.score} / ${maxScore}</p>
                <p>${gameState.score >= 80 ? '🎉 Luar biasa!' : (gameState.score >= 60 ? '👍 Bagus! Terus belajar.' : '📚 Yuk belajar lagi!')}</p>
                <button class="btn btn-primary" onclick="backToMainMenu()">Kembali ke Menu Utama</button>
            </div>
        `;
    } else if (gameState.mode === 'truefalse') {
        const maxScore = gameState.questions.length * 20;
        message = `
            <div style="text-align:center;">
                <h2>🏆 Hasil True or False 🏆</h2>
                <p style="font-size:24px;">Skor kamu: ${gameState.score} / ${maxScore}</p>
                <p>${gameState.score >= 80 ? '🎉 Hebat!' : (gameState.score >= 60 ? '👍 Sudah bagus!' : '📚 Ayo belajar lebih giat!')}</p>
                <button class="btn btn-primary" onclick="backToMainMenu()">Kembali ke Menu Utama</button>
            </div>
        `;
    }
    content.innerHTML = message;
    const navEl = document.getElementById('game-nav');
    if (navEl) navEl.style.display = 'none';

    // Tambahkan skor ke global
    updateGlobalScore(gameState.score);

    // Bersihkan state untuk permainan berikutnya
    gameState = {
        mode: '',
        current: 0,
        score: 0,
        questions: [],
        answered: [],
        perQuestion: []
    };
}

function pickTrueFalse(value) {
    if (gameState.answered[gameState.current]) return; // sudah dijawab

    const q = gameState.questions[gameState.current];
    const isCorrect = (value === q.answer);
    const feedbackDiv = document.getElementById('tf-feedback');

    if (isCorrect) {
        feedbackDiv.innerText = '🎉 Benar! +20 poin';
        feedbackDiv.style.color = '#28a745';
        gameState.score += 20;
        updateScoreDisplay();
        createConfetti();
    } else {
        feedbackDiv.innerText = '😓 Salah! Jawaban yang benar: ' + (q.answer ? 'Benar' : 'Salah');
        feedbackDiv.style.color = '#dc3545';
        const wrapper = document.getElementById('question-wrapper');
        wrapper.classList.add('shake');
        setTimeout(() => wrapper.classList.remove('shake'), 400);
    }

    gameState.answered[gameState.current] = true;

    // Enable tombol next
    const nextBtn = document.getElementById('game-next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.textContent = '🎉';
        piece.style.position = 'absolute';
        piece.style.fontSize = `${12 + Math.floor(Math.random() * 16)}px`;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = '-10%';
        piece.style.opacity = 0.8;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.transition = 'all 1.2s ease-out';
        confetti.appendChild(piece);
        setTimeout(() => {
            piece.style.top = `${80 + Math.random() * 20}%`;
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.opacity = '0';
        }, 10);
    }
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1500);
}

