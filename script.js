const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe?.user?.id;
const username = tg.initDataUnsafe?.user?.username || "";
const initData = tg.initData; // jika ingin validasi lebih lanjut (opsional)

const claimBtn = document.getElementById("claimBtn");

claimBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Hindari reload halaman atau form default

  if (!userId) {
    alert("❌ Gagal membaca ID Telegram.");
    return;
  }

  // Tampilkan status loading
  claimBtn.disabled = true;
  claimBtn.textContent = "⏳ Sedang memproses...";

  try {
    const res = await fetch("http://159.89.195.47:8000/add_poin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        username: username,
        initData: initData  // opsional
      })
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message || "✅ Poin berhasil ditambahkan!");
    } else {
      alert(result.message || "❌ Gagal klaim poin.");
    }
  } catch (err) {
    console.error("Gagal kirim poin ke server:", err);
    alert("🚫 Tidak bisa terhubung ke server.");
  }

  // Aktifkan kembali tombol
  claimBtn.disabled = false;
  claimBtn.textContent = "🎁 Klaim Poin";
});
