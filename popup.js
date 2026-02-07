const toggle = document.getElementById("toggle");
const statusText = document.getElementById("status");

toggle.addEventListener("change", () => {
  const isOn = toggle.checked;
  statusText.textContent = isOn ? "ON" : "OFF";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: setDarkMode,
      args: [isOn]
    });
  });
});

function setDarkMode(enable) {
  let style = document.getElementById("dark-mode-style");

  if (enable && !style) {
    style = document.createElement("style");
    style.id = "dark-mode-style";
    style.innerHTML = `
      html {
        filter: invert(1) hue-rotate(180deg);
      }
      img, video {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
    document.head.appendChild(style);
  }

  if (!enable && style) {
    style.remove();
  }
}
