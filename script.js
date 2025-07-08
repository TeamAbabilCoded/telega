const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user?.id;
const username = tg.initDataUnsafe.user?.username;

document.getElementById("claimBtn").addEventListener("click", async (e) => {
  e.preventDefault(); // Cegah default form submit

  if (!userId) return alert("Gagal ambil ID user.");

  try {
    const res = await fetch("http://159.89.195.47:8000/add_poin/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, username: username || "" })
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error("Gagal kirim poin:", err);
    alert("❌ Gagal kirim poin ke server.");
  }
});
