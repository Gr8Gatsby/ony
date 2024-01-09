import { createElement } from "../utils/utils.js";

document.addEventListener('authorImagesLoaded', () => {
  // Call the function to update the authors list UI
  console.log('authorImagesLoaded');
  reRenderAuthorsList();
});

function reRenderAuthorsList() {
  // Assuming you have a way to access the container for the authors list
  const authorsListContainer = document.getElementById("authorsSpan");

  // Check if there are authors to update
  if (updatedAuthors && updatedAuthors.length > 0) {
    // Clear existing content only if there are new authors to display
    while (authorsListContainer.firstChild) {
      authorsListContainer.removeChild(authorsListContainer.firstChild);
    }

    // Re-create the authors list with updated data
    const updatedAuthorsSpan = createAuthorsSpan(updatedAuthors);
    authorsListContainer.appendChild(updatedAuthorsSpan);
  } else {
    // Re-create the authors list with updated data
    const updatedAuthors = quip.apps.getRootRecord().get("authors");
    const updatedAuthorsSpan = createAuthorsSpan(updatedAuthors);
    authorsListContainer.appendChild(updatedAuthorsSpan);
  }

}

export function createAuthorsSpan(authors) {
  const authorsSpan = createElement("span", { id: "authorsSpan", className: "authors-span" });

  authors.forEach((author, index) => {
    const authorImage = quip.apps.getRootRecord().get("authorImages")?.find(img => img.name === author);
    const imageUrl = authorImage ? authorImage.url : null;

    if (imageUrl === null) {
      const warningEmoji = document.createElement("span");
      // warningEmoji.textContent = `⚠ ${author}`;
      warningEmoji.textContent = `${author}`;
      warningEmoji.classList.add('warning-emoji');
      // warningEmoji.style.fontStyle = 'italic';
      // warningEmoji.style.color = 'gray';
      authorsSpan.appendChild(warningEmoji);
    } else {
      const authorComponent = createAuthorComponent(author, imageUrl);
      authorsSpan.appendChild(authorComponent);
    }

    // Add commas or 'and' appropriately, including the Oxford comma
    if (index < authors.length - 1) {
      if (index === authors.length - 2) {
        authorsSpan.appendChild(document.createTextNode(authors.length > 2 ? ", and " : " and "));
      } else {
        authorsSpan.appendChild(document.createTextNode(", "));
      }
    }
  });

  return authorsSpan;
};


function createAuthorComponent(author, imageUrl) {
  const authorComponent = document.createElement("span");
  authorComponent.className = "author-component";

  if (imageUrl != null) {
    const img = document.createElement("img");
    img.src = imageUrl || null;
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
  authorsInput.addEventListener("blur", () => handleAuthorsInputBlur(authorsInput, authorsSpan, authors));
  authorsInput.addEventListener("keydown", (event) => { if (event.key === "Enter") handleAuthorsInputBlur(authorsInput, authorsSpan, authors); });
  authorsSpan.addEventListener("dblclick", () => toggleAuthorsEditMode(authorsSpan, authorsInput));
}

function handleAuthorsInputBlur(authorsInput, authorsSpan, authors) {
  const inputAuthors = authorsInput.value.split(",").map((author) => author.trim());
  authors.length = 0;
  Array.prototype.push.apply(authors, inputAuthors);
  quip.apps.getRootRecord().set("authors", authors);

  while (authorsSpan.firstChild) authorsSpan.removeChild(authorsSpan.firstChild);
  const updatedAuthorsSpan = createAuthorsSpan(authors);
  authorsSpan.appendChild(updatedAuthorsSpan);

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

