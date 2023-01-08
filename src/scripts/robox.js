import "../styles/robox.css";

import { createMachine, interpret } from "@xstate/fsm";

// HTML NODES
let sidebar = null;

// STATE
const switchMachine = createMachine({
  initial: "inactive",
  states: {
    inactive: { on: { SWITCH_ON: "active" } },
    active: { on: { SWITCH_OFF: "inactive" } },
  },
});

const switchService = interpret(switchMachine).start();

switchService.subscribe((state) => {
  if (sidebar && state.value === "active") {
    sidebar.style.display = "block";
  } else if (sidebar && state.value === "inactive") {
    sidebar.style.display = "none";
  }
});

function closeRoboxModal() {
  const iframeSrc = `about:blank`;
  document.getElementById("roboxIframe").src = iframeSrc;
  switchService.send("SWITCH_OFF");
}

function openRoboxModal(src) {
  console.log(src);
  const iframeSrc = src;
  document.getElementById("roboxIframe").src = iframeSrc;
  switchService.send("SWITCH_ON");
}

function initialize() {
  var divNode = document.createElement("div");
  document.body.appendChild(divNode);
  const html = `
  <div class="sidebar robox-modal" style="display: none;">
    <div class="robox-modal__content">
      <div class="robox-modal__content-item">
        <button class="sidebar-close modal__close"></button>
        <iframe
          id="roboxIframe"
          src="about:blank"
          title="robox"
          frameborder="3"
          class="iframe"
        ></iframe>
      </div>
    </div>
  </div>
  `;

  divNode.insertAdjacentHTML("afterend", html);

  sidebar = document.querySelector(".sidebar");
  const sideBarClose = document.querySelector(".sidebar-close");

  sideBarClose.onclick = () => {
    closeRoboxModal();
    sidebar.style.display = "none";
  };
}

window.onload = initialize;

export default {
  openRoboxModal,
  closeRoboxModal,
};
