// WhyComponent.js
export function createInputElements() {
    var readOnlySpan = document.createElement("span");
    readOnlySpan.id = "readOnlySpan";
  
    var inputBox = document.createElement("textarea");
    inputBox.id = "inputBox";
    inputBox.className = "inline-input";
    inputBox.placeholder = "Why did you write this document?";
    inputBox.rows = 2;
  
    return { readOnlySpan, inputBox };
  }
  
  export function initializeValues(readOnlySpan, inputBox) {
    var storedValue = quip.apps.getRootRecord().get("inputValue") || "";
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
    inputBox.addEventListener("blur", function () {
      handleInputBlur(inputBox, readOnlySpan);
    });
  
    inputBox.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        handleInputBlur(inputBox, readOnlySpan);
      }
    });
  
    readOnlySpan.addEventListener("dblclick", function () {
      toggleEditMode();
    });
  }
  
  // Other related functions (handleInputBlur, toggleEditMode) go here
  function handleInputBlur(inputBox, readOnlySpan) {
    var value = inputBox.value.trim();
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
    var inputBox = document.getElementById("inputBox");
    var readOnlySpan = document.getElementById("readOnlySpan");
  
    inputBox.style.display = "inline";
    readOnlySpan.style.display = "none";
    inputBox.focus();
  }
