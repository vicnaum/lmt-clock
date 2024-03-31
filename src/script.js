// ... rest of your code
import "./styles.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js", { scope: "/" })
      .then((registration) => {
        registration.update(); // Force the service worker to update
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

function updateClock() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const now = new Date();
      const solarNoonOffset = (lon / 15) * 3600000; // offset in milliseconds
      const lmt = new Date(now.getTime() + solarNoonOffset);

      // Formatting the time to HH:MM:SS
      const hours = String(lmt.getUTCHours()).padStart(2, "0");
      const minutes = String(lmt.getUTCMinutes()).padStart(2, "0");
      const seconds = String(lmt.getUTCSeconds()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      document.getElementById("clock").textContent = formattedTime;
      document.getElementById("coordinates").textContent = `@ ${lat.toFixed(
        4
      )}, ${lon.toFixed(4)}`;
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

setInterval(updateClock, 1000);
