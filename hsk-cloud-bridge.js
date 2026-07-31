/*
  HSK Online cloud score bridge.
  Put this file beside index.html and all lesson1-x.html files.
*/
(() => {
  "use strict";

  if (window.__HSK_CLOUD_BRIDGE_INSTALLED__) return;
  window.__HSK_CLOUD_BRIDGE_INSTALLED__ = true;

  function getScoreElement() {
    return document.getElementById("globalScore");
  }

  function readScore() {
    const value = Number(getScoreElement()?.textContent);
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  function writeScore(total) {
    const safeTotal = Math.max(0, Math.floor(Number(total) || 0));
    const element = getScoreElement();
    if (element) element.textContent = String(safeTotal);
  }

  window.addScore = function addScore(amount) {
    const safeAmount = Math.floor(Number(amount) || 0);
    if (safeAmount <= 0) return readScore();

    const newTotal = readScore() + safeAmount;
    writeScore(newTotal);

    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "HSK_ADD_STARS",
          amount: safeAmount
        },
        window.location.origin
      );
    }

    return newTotal;
  };

  window.addEventListener("message", event => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== "HSK_SET_TOTAL_STARS") return;
    writeScore(event.data.stars);
  });

  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "HSK_LESSON_READY" },
      window.location.origin
    );
  }
})();
