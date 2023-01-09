const head = document.getElementsByTagName("head")[0];

const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/gh/Srivatsav-K/robox-embed-test/build/robox.js";
script.defer = true;

const style = document.createElement("link");
style.rel = "stylesheet";
style.href =
  "https://cdn.jsdelivr.net/gh/Srivatsav-K/robox-embed-test/build/robox.css";

head.appendChild(script);
head.appendChild(style);
