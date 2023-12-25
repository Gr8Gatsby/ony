quip.apps.initialize({
  initializationCallback: function (root, params) {
    
    // Create the instruction panel
    var instructionPanel = document.createElement('div');
    instructionPanel.id = 'instructionPanel';
    instructionPanel.style.display = 'none'; // Initially hidden
    instructionPanel.innerHTML = 
    `<h3>Who, When, Why (ONY)</h3>
    Double click on the Authors names to edit the author's list. Input must be comma seperated names e.g. <strong>Kevin Hill, Ian Varley</strong> <br/> <br/>
    Double click the <strong>bold</strong> text to edit the Why you created the document <br/>
    `; // Placeholder text


    // Listen for the FOCUS event
    quip.apps.addEventListener(quip.apps.EventType.FOCUS, function() {
        instructionPanel.style.display = 'block'; // Show instruction panel
    });

    // Listen for the BLUR event
    quip.apps.addEventListener(quip.apps.EventType.BLUR, function() {
        instructionPanel.style.display = 'none'; // Hide instruction panel
    });
    // Retrieve or initialize authors list
    var storedAuthors = quip.apps.getRootRecord().get("authors");
    var authors =
      storedAuthors && storedAuthors.length > 0
        ? storedAuthors
        : [quip.apps.getViewingUser().getName()];

    // Listen for the DOCUMENT_MEMBERS_LOADED event
    quip.apps.addEventListener(
      quip.apps.EventType.DOCUMENT_MEMBERS_LOADED,
      function () {
        processDocumentMembers(authors, root);
      }
    );
    // Initialize elements
    var { readOnlySpan, inputBox } = createInputElements();
    var authorsSpan = createAuthorsSpan(authors);
    var authorsInput = createAuthorsInput(authors);

    // Set up and display initial values
    initializeValues(readOnlySpan, inputBox);

    // Append elements to the root
    appendElementsToRoot(
      root,
      authorsSpan,
      authorsInput,
      readOnlySpan,
      inputBox,
      instructionPanel
    );

    // Register menu command for editing
    registerMenuCommand();

    // Add event listeners
    setupEventListeners(
      inputBox,
      readOnlySpan,
      authorsSpan,
      authorsInput,
      authors,
    );
  },
});

// Helper functions
function processDocumentMembers(authors, root) {
  console.log("Members loaded");
  const allMembers = quip.apps.getDocumentMembers();

  allMembers.forEach((member) => {
    console.log(member.getName());
    if (authors.includes(member.getName())) {
      // Create an image element for matched members
      var img = document.createElement("quip.apps.ui.ProfilePicture");
      img.setAttribute("user",member.getId()) // User's name as alt text
      img.setAttribute("size",16); // A CSS class for styling
      img.setAttribute("round",true);

      // Append the image to the root or a specific container
      root.appendChild(img);
    }
  });
}
function createInputElements() {
  var readOnlySpan = document.createElement("span");
  readOnlySpan.id = "readOnlySpan";

  var inputBox = document.createElement("textarea");
  inputBox.id = "inputBox";
  inputBox.className = "inline-input";
  inputBox.placeholder = "Why did you write this document?";
  inputBox.rows = 2;

  return { readOnlySpan, inputBox };
}

function initializeValues(readOnlySpan, inputBox) {
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

function createDateSpan() {
  var dateSpan = document.createElement("span");
  var storedDate = quip.apps.getRootRecord().get("date");

  if (!storedDate) {
    storedDate = getCurrentMonthYear();
    quip.apps.getRootRecord().set("date", storedDate);
  }

  dateSpan.textContent = " wrote this document in " + storedDate + ", ";
  return dateSpan;
}

function getCurrentMonthYear() {
  var now = new Date();
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[now.getMonth()] + " " + now.getFullYear();
}

function registerMenuCommand() {
  quip.apps.updateToolbar({
    menuCommands: [
      {
        id: "toggleEdit",
        label: "Change Why",
        handler: toggleEditMode,
      },
      {
        id: "toggleAuthorEdit",
        label: "Edit Authors",
        handler: toggleAuthorsEditMode,
      },
    ],
    toolbarCommandIds: ["toggleAuthorEdit", "toggleEdit"],
    highlightedCommandIds: ["toggleEdit"],
  });
}

function toggleEditMode() {
  var inputBox = document.getElementById("inputBox");
  var readOnlySpan = document.getElementById("readOnlySpan");

  inputBox.style.display = "inline";
  readOnlySpan.style.display = "none";
  inputBox.focus();
}

function handleInputBlur(inputBox, readOnlySpan) {
  var value = inputBox.value.trim();
  quip.apps.getRootRecord().set("inputValue", value);
  readOnlySpan.textContent = value;

  inputBox.style.display = "none";
  readOnlySpan.style.display = "inline";
}

function setupInputEventListeners(inputBox, readOnlySpan) {
  inputBox.addEventListener("blur", function () {
    handleInputBlur(inputBox, readOnlySpan);
  });

  inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleInputBlur(inputBox, readOnlySpan);
    }
  });
  // Add double click event listener to readOnlySpan
  readOnlySpan.addEventListener("dblclick", function () {
    toggleEditMode();
  });
}

function createAuthorsSpan(authors) {
  var authorsSpan = document.createElement("span");
  authorsSpan.id = "authorsSpan";
  authorsSpan.textContent = formatAuthorsList(authors);
  return authorsSpan;
}

function createAuthorsInput(authors) {
  var authorsInput = document.createElement("input");
  authorsInput.type = "text";
  authorsInput.id = "authorsInput";
  authorsInput.className = "inline-input";
  authorsInput.value = authors.join(", ");
  authorsInput.style.display = "none";
  return authorsInput;
}

function setupAuthorsEventListeners(authorsSpan, authorsInput, authors) {
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

function toggleAuthorsEditMode(authorsSpan, authorsInput) {
  authorsInput.style.display = "inline";
  authorsSpan.style.display = "none";
  authorsInput.focus();
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

function appendElementsToRoot(
  root,
  authorsSpan,
  authorsInput,
  readOnlySpan,
  inputBox,
  instructionPanel
) {
  root.appendChild(authorsSpan);
  root.appendChild(authorsInput);
  root.appendChild(createDateSpan());
  root.appendChild(readOnlySpan);
  root.appendChild(inputBox);
  root.appendChild(instructionPanel);
}

function setupEventListeners(
  inputBox,
  readOnlySpan,
  authorsSpan,
  authorsInput,
  authors
) {
  setupInputEventListeners(inputBox, readOnlySpan);
  setupAuthorsEventListeners(authorsSpan, authorsInput, authors);
}
