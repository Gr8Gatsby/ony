import { createElement } from "../utils/utils.js"; // Replace with the actual path

export function createAuthorsSpan(authors) {
  const authorsSpan = createElement("span", {
    id: "authorsSpan",
    className: "authors-span",
  });

  authors.forEach((author, index) => {
    const authorImage = quip.apps
      .getRootRecord()
      .get("authorImages")
      ?.find((img) => img.name === author);
    const imageUrl = authorImage ? authorImage.url : null;
    const authorComponent = createAuthorComponent(author, imageUrl);
    authorsSpan.appendChild(authorComponent);

    // Add separators
    if (index < authors.length - 2) {
      authorsSpan.appendChild(document.createTextNode(", "));
    } else if (index === authors.length - 2) {
      authorsSpan.appendChild(
        document.createTextNode(authors.length > 2 ? ", and " : " and ")
      );
    }
  });

  return authorsSpan;
}

function createAuthorComponent(author, imageUrl) {
  const authorComponent = document.createElement("span");
  authorComponent.className = "author-component";

  if (imageUrl != null) {
    const img = document.createElement("img");
    img.src = imageUrl || null; // Path to a default image
    img.alt = `${author}'s profile photo`;
    img.className = "author-image";
    authorComponent.appendChild(img);
  }
  const nameSpan = document.createElement("span");
  nameSpan.textContent = author;
  authorComponent.appendChild(nameSpan);

  return authorComponent;
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

function handleAuthorsInputBlur(authorsInput, authorsSpan, authors) {
  const inputAuthors = authorsInput.value
    .split(",")
    .map((author) => author.trim());

  // Update the authors array
  authors.length = 0;
  Array.prototype.push.apply(authors, inputAuthors);
  quip.apps.getRootRecord().set("authors", authors);

  // Clear the existing authorsSpan and append the new content
  while (authorsSpan.firstChild) {
    authorsSpan.removeChild(authorsSpan.firstChild);
  }
  const updatedAuthorsSpan = createAuthorsSpan(authors);
  authorsSpan.appendChild(updatedAuthorsSpan);

  // Toggle visibility
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
