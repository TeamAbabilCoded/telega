let pointBalance = 0;

document.getElementById("claimBtn").addEventListener("click", () => {
  pointBalance += 100;
  updatePoints();
  alert("Kamu berhasil klaim 100 poin!");
});

document.getElementById("watchAdBtn").addEventListener("click", () => {
  telegaAds.showRewardedAd().then(() => {
    pointBalance += 50;
    updatePoints();
    alert("Terima kasih! Kamu dapat 50 poin dari iklan.");
  }).catch(() => {
    alert("Iklan gagal dimuat, coba lagi nanti.");
  });
});

function updatePoints() {
  document.getElementById("pointBalance").innerText = pointBalance;
}
