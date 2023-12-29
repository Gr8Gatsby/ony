import './styles.css';
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

import { createInstructionPanel } from "./components/Instructions.js";

quip.apps.initialize({
  initializationCallback: function (root, params) {
    // Retrieve or initialize authors list
    var storedAuthors = quip.apps.getRootRecord().get("authors");
    var authors =
      storedAuthors && storedAuthors.length > 0
        ? storedAuthors
        : [quip.apps.getViewingUser().getName()];

    // Create and append the instruction panel
    const instructionPanel = createInstructionPanel();

    // Listen for the FOCUS event
    quip.apps.addEventListener(quip.apps.EventType.FOCUS, function () {
      instructionPanel.style.display = "block"; // Show instruction panel
    });

    // Listen for the BLUR event
    quip.apps.addEventListener(quip.apps.EventType.BLUR, function () {
      instructionPanel.style.display = "none"; // Hide instruction panel
    });

    // Add an event listener for DOCUMENT_THEME_UPDATE event
    quip.apps.addEventListener(quip.apps.EventType.DOCUMENT_THEME_UPDATE, function (event) {
      // Handle DOCUMENT_THEME_UPDATE event here
      console.log("DOCUMENT_THEME_UPDATE event received", event);
      // Add your custom code to respond to the event
    });

    // Add an event listener for DOCUMENT_TEMPLATE_SETTINGS_CHANGED event
    quip.apps.addEventListener(quip.apps.EventType.DOCUMENT_TEMPLATE_SETTINGS_CHANGED, function (event) {
      // Handle DOCUMENT_TEMPLATE_SETTINGS_CHANGED event here
      console.log("DOCUMENT_TEMPLATE_SETTINGS_CHANGED event received", event);
      // Add your custom code to respond to the event
    });

    // Add an event listener for DOCUMENT_TEMPLATE_SETTINGS_CHANGED event
    quip.apps.addEventListener(quip.apps.EventType.USER_PREFERENCES_UPDATED, function (event) {
      // Handle DOCUMENT_TEMPLATE_SETTINGS_CHANGED event here
      console.log("USER_PREFERENCES_UPDATED event received", event);
      // Add your custom code to respond to the event
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

  var authorImages = [];

  allMembers.forEach((member) => {
    if (authors.includes(member.getName())) {
      authorImages.push({url:member.aD[0].url, name:member.getName()});
    }
  });

  quip.apps.getRootRecord().set("authorImages", authorImages);
}