// Inisialisasi SDK Telega.io
const ads = window.TelegaIn.AdsController.create_miniapp({
  token: '3d14398b-01ba-440c-8e93-4ae51c17eed6'
});

// Tampilkan iklan banner saat halaman dimuat
ads.ad_show({
  adBlockUuid: "da7bce4b-12c8-4e6f-82d3-2367fd05cb2a"
});

// Ambil user ID dari URL (dikirim dari bot via ?id=USER_ID)
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

// Dapatkan elemen tombol dan progress bar
const rewardBtn = document.getElementById("rewardBtn");
const progressContainer = document.getElementById("progressBarContainer");
const progressBar = document.getElementById("progressBar");

// Fungsi animasi progress bar
function startProgress(duration = 15) {
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";
  let progress = 0;

  const interval = setInterval(() => {
    progress += 100 / duration;
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) clearInterval(interval);
  }, 1000);
}

// Fungsi klaim poin setelah iklan selesai
async function kirimPoin() {
  try {
    const res = await fetch("http://159.89.195.47:8000/add_poin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        amount: 50
      })
    });

    const json = await res.json();
    alert(json.message || "🎉 Kamu mendapat 50 poin!");
  } catch (err) {
    console.error("❌ Gagal mengirim poin:", err);
    alert("❌ Gagal menghubungi server.");
  }
}

// Event klik tombol reward
rewardBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!userId) {
    alert("❌ Gagal membaca ID pengguna.");
    return;
  }

  rewardBtn.disabled = true;
  rewardBtn.textContent = "🎬 Menayangkan iklan...";
  startProgress(15); // durasi estimasi iklan

  // Tampilkan iklan video reward
  ads.show_rewarded_ad({
    on_success: async () => {
      progressBar.style.width = "100%";
      await kirimPoin();
      rewardBtn.disabled = false;
      rewardBtn.textContent = "Tonton Iklan Video";
      progressContainer.style.display = "none";
    },
    on_error: () => {
      alert("❌ Iklan gagal atau dibatalkan.");
      rewardBtn.disabled = false;
      rewardBtn.textContent = "Tonton Iklan Video";
      progressContainer.style.display = "none";
    }
  });
});
