const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user?.id;
const username = tg.initDataUnsafe.user?.username;

document.getElementById("claimBtn").addEventListener("click", async () => {
  if (!userId) return alert("Gagal ambil ID user.");

  const res = await fetch("https://your-vps-or-domain.com/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, username: username || "" })
  });

  const result = await res.json();
  alert(result.message);
});
