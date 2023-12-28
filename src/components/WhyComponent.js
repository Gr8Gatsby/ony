import { createElement } from "../utils/utils.js"; // Replace with the actual path

export function createInputElements() {
  // Create the readOnlySpan and inputBox elements
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

  if (storedValue) {
    inputBox.style.display = "none";
    readOnlySpan.style.display = "inline";
  } else {
    inputBox.style.display = "inline";
    readOnlySpan.style.display = "none";
  }
}

export function setupInputEventListeners(inputBox, readOnlySpan) {
  inputBox.addEventListener("blur", () => {
    handleInputBlur(inputBox, readOnlySpan);
  });

  inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleInputBlur(inputBox, readOnlySpan);
    }
  });

  readOnlySpan.addEventListener("dblclick", () => {
    toggleEditMode();
  });
}

function handleInputBlur(inputBox, readOnlySpan) {
  const value = inputBox.value.trim();
  quip.apps.getRootRecord().set("inputValue", value);
  readOnlySpan.textContent = value;

  if (value.length > 0) {
    // If value is more than a blank string, hide inputBox and show readOnlySpan
    inputBox.style.display = "none";
    readOnlySpan.style.display = "inline";
  } else {
    // If value is a blank string, keep inputBox visible and hide readOnlySpan
    inputBox.style.display = "inline";
    readOnlySpan.style.display = "none";
  }
}

export function toggleEditMode() {
  const inputBox = document.getElementById("inputBox");
  const readOnlySpan = document.getElementById("readOnlySpan");

  inputBox.style.display = "inline";
  readOnlySpan.style.display = "none";
  inputBox.focus();
}
