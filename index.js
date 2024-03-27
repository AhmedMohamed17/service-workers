if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("cachman.js")
    .then((reg) => console.log("Service Worker : Registered"))
    .catch((err) => console.log("err ===", err));
}
