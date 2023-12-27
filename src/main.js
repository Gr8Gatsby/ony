// Main Application File
import {
  createAuthorsSpan,
  createAuthorsInput,
  setupAuthorsEventListeners,
  toggleAuthorsEditMode,
} from "./components/AuthorList.js";
import { createDateSpan } from "./components/DateStamp.js";
import {
  createInputElements,
  initializeValues,
  setupInputEventListeners,
  toggleEditMode,
} from "./components/WhyComponent.js";

quip.apps.initialize({
  initializationCallback: function (root, params) {
    // Retrieve or initialize authors list
    var storedAuthors = quip.apps.getRootRecord().get("authors");
    var authors =
      storedAuthors && storedAuthors.length > 0
        ? storedAuthors
        : [quip.apps.getViewingUser().getName()];

    // Create the instruction panel
    var instructionPanel = document.createElement("div");
    instructionPanel.id = "instructionPanel";
    instructionPanel.style.display = "none"; // Initially hidden
    instructionPanel.innerHTML = `<h3>Who, When, Why (ONY)</h3>
    Double click on the Authors names to edit the author's list. Input must be comma separated names e.g. <strong>Kevin Hill, Ian Varley</strong> <br/> <br/>
    Double click the <strong>bold</strong> text to edit the Why you created the document <br/>`;

    // Listen for the FOCUS event
    quip.apps.addEventListener(quip.apps.EventType.FOCUS, function () {
      instructionPanel.style.display = "block"; // Show instruction panel
    });

    // Listen for the BLUR event
    quip.apps.addEventListener(quip.apps.EventType.BLUR, function () {
      instructionPanel.style.display = "none"; // Hide instruction panel
    });

    // Initialize elements
    var { readOnlySpan, inputBox } = createInputElements();
    var authorsSpan = createAuthorsSpan(authors);
    var authorsInput = createAuthorsInput(authors);

    // Set up and display initial values
    initializeValues(readOnlySpan, inputBox);

    // Append elements to the root
    root.appendChild(authorsSpan);
    root.appendChild(authorsInput);
    root.appendChild(createDateSpan());
    root.appendChild(readOnlySpan);
    root.appendChild(inputBox);
    root.appendChild(instructionPanel);

    // Register menu command for editing
    registerMenuCommand();

    // Add event listeners
    setupInputEventListeners(inputBox, readOnlySpan);
    setupAuthorsEventListeners(authorsSpan, authorsInput, authors);

    // Listen for the DOCUMENT_MEMBERS_LOADED event
    quip.apps.addEventListener(
      quip.apps.EventType.DOCUMENT_MEMBERS_LOADED,
      function () {
        processDocumentMembers(authors, root);
      }
    );
  },
});

// Helper functions that are still used in the main file, such as registerMenuCommand and processDocumentMembers
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

function processDocumentMembers(authors, root) {
  console.log("Members loaded");
  const allMembers = quip.apps.getDocumentMembers();

  allMembers.forEach((member) => {
    console.log(member.getName());
    if (authors.includes(member.getName())) {
      // Create an image element for matched members
      var img = document.createElement("quip.apps.ui.ProfilePicture");
      img.setAttribute("user", member.getId()); // User's name as alt text
      img.setAttribute("size", 16); // A CSS class for styling
      img.setAttribute("round", true);

      // Append the image to the root or a specific container
      root.appendChild(img);
    }
  });
}
