import App from "./App.svelte";

function onLoad() {
  new App({
    target: document.getElementById("app"),
  });
}

window.addEventListener("load", onLoad);
