import './app.css'
import App from './App.svelte'

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const targetElement = document.getElementById("app");

const app = new App({
  target: targetElement ? targetElement : document.body,
});

export default app
