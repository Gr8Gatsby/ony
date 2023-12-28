import { createElement } from "../utils/utils.js"; // Replace with the actual path

export function createAuthorsSpan(authors) {
  // Create the authorsSpan element
  const authorsSpan = createElement("span", {
    id: "authorsSpan",
    textContent: formatAuthorsList(authors),
  });
  return authorsSpan;
}

export function createAuthorsInput(authors) {
  // Create the authorsInput element
  const authorsInput = createElement("input", {
    type: "text",
    id: "authorsInput",
    className: "inline-input",
    value: authors.join(", "),
    style: "display: none",
  });
  return authorsInput;
}

export function setupAuthorsEventListeners(authorsSpan, authorsInput, authors) {
  authorsInput.addEventListener("blur", () => {
    handleAuthorsInputBlur(authorsInput, authorsSpan, authors);
  });

  authorsInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAuthorsInputBlur(authorsInput, authorsSpan, authors);
    }
  });

  authorsSpan.addEventListener("dblclick", () => {
    toggleAuthorsEditMode(authorsSpan, authorsInput);
  });
}

function formatAuthorsList(authors) {
  if (authors.length === 2) {
    return authors.join(" and ");
  } else if (authors.length > 2) {
    return (
      authors.slice(0, -1).join(", ") + ", and " + authors[authors.length - 1]
    );
  } else {
    return authors.join("");
  }
}

function handleAuthorsInputBlur(authorsInput, authorsSpan, authors) {
  const inputAuthors = authorsInput.value.split(",").map((author) => {
    return author.trim();
  });

  authors.length = 0;
  Array.prototype.push.apply(authors, inputAuthors);
  quip.apps.getRootRecord().set("authors", authors);

  authorsSpan.textContent = formatAuthorsList(authors);
  authorsInput.style.display = "none";
  authorsSpan.style.display = "inline";
}

export function toggleAuthorsEditMode(authorsSpan, authorsInput) {
  authorsSpan = document.getElementById("authorsSpan");
  authorsInput = document.getElementById("authorsInput");

  authorsInput.style.display = "inline";
  authorsSpan.style.display = "none";
  authorsInput.focus();
}
