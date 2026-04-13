document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.getElementById("settings-btn");
  const popup = document.getElementById("settings-popup");
  const closeBtn = document.getElementById("close-btn");

  settingsBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});