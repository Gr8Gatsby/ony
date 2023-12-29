import { createElement } from "../utils/utils.js";

export function createInputElements() {
  const readOnlySpan = createElement("span", { id: "readOnlySpan" });
  const inputBox = createElement("textarea", {
    id: "inputBox",
    className: "inline-input",
    placeholder: "Why did you write this document?",
    rows: 2,
  });

  return { readOnlySpan, inputBox };
}

export function initializeValues(readOnlySpan, inputBox) {
  const storedValue = quip.apps.getRootRecord().get("inputValue") || "";
  readOnlySpan.textContent = storedValue;
  inputBox.value = storedValue;
  inputBox.style.display = storedValue ? "none" : "inline";
  readOnlySpan.style.display = storedValue ? "inline" : "none";
}

export function setupInputEventListeners(inputBox, readOnlySpan) {
  inputBox.addEventListener("blur", () => handleInputBlur(inputBox, readOnlySpan));
  inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleInputBlur(inputBox, readOnlySpan);
    }
  });
  readOnlySpan.addEventListener("dblclick", toggleEditMode);
}

function handleInputBlur(inputBox, readOnlySpan) {
  const value = inputBox.value.trim();
  quip.apps.getRootRecord().set("inputValue", value);
  readOnlySpan.textContent = value;
  inputBox.style.display = value.length > 0 ? "none" : "inline";
  readOnlySpan.style.display = value.length > 0 ? "inline" : "none";
}

export function toggleEditMode() {
  const inputBox = document.getElementById("inputBox");
  const readOnlySpan = document.getElementById("readOnlySpan");
  inputBox.style.display = "inline";
  readOnlySpan.style.display = "none";
  inputBox.focus();
}
