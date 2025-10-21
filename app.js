const display = document.getElementById("display");
const keys = document.querySelector(".calc__keys");

// allow only safe characters: digits, operators, parentheses, dot, spaces
const SAFE = /^[0-9+\-*/().\s]+$/;

keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const k = btn.dataset.key;

  switch (k) {
    case "C":
      display.value = "";
      break;
    case "DEL":
      display.value = display.value.slice(0, -1);
      break;
    case "=":
      compute();
      break;
    default:
      display.value += k;
  }
});

document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (k === "Enter") return compute();
  if (k === "Backspace") return (display.value = display.value.slice(0, -1));
  if (k.toLowerCase() === "c" && (e.ctrlKey || e.metaKey)) return (display.value = "");
  if (/^[0-9+\-*/().]$/.test(k)) display.value += k;
});

function compute() {
  const expr = display.value.trim();
  if (!expr) return;
  if (!SAFE.test(expr)) {
    alert("Invalid characters in expression.");
    return;
  }
  try {
    // Evaluate safely by building a Function; still only after SAFE regex passes
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${expr})`)();
    display.value = Number.isFinite(val) ? String(val) : "Error";
  } catch {
    display.value = "Error";
  }
}
