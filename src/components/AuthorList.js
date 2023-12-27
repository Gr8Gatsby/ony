// AuthorList.js
export function createAuthorsSpan(authors) {
  var authorsSpan = document.createElement("span");
  authorsSpan.id = "authorsSpan";
  authorsSpan.textContent = formatAuthorsList(authors);
  return authorsSpan;
}

export function createAuthorsInput(authors) {
  var authorsInput = document.createElement("input");
  authorsInput.type = "text";
  authorsInput.id = "authorsInput";
  authorsInput.className = "inline-input";
  authorsInput.value = authors.join(", ");
  authorsInput.style.display = "none";
  return authorsInput;
}

export function setupAuthorsEventListeners(authorsSpan, authorsInput, authors) {
  authorsInput.addEventListener("blur", function () {
    handleAuthorsInputBlur(authorsInput, authorsSpan, authors);
  });

  authorsInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleAuthorsInputBlur(authorsInput, authorsSpan, authors);
    }
  });

  authorsSpan.addEventListener("dblclick", function () {
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
  var inputAuthors = authorsInput.value.split(",").map(function (author) {
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
